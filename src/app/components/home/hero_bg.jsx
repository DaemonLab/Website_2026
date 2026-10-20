"use client";

import React, { useEffect, useRef } from "react";

// Module-level cache so the three.js script tag is only ever injected once,
// no matter how many times this component mounts (React 18 StrictMode
// intentionally mounts every component twice in development).
let threeLoadPromise = null;
function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  if (threeLoadPromise) return threeLoadPromise;

  threeLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-three-cdn]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.THREE));
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.dataset.threeCdn = "true";
    script.onload = () => resolve(window.THREE);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return threeLoadPromise;
}

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Flipped to true in the cleanup function. Checked after the async
    // script load resolves so a scene never gets built for a component
    // instance that has already been torn down (this is what was causing
    // the double render under StrictMode).
    let cancelled = false;
    let animationFrameId;
    let renderer;
    let handleMouseMove;
    let handleResize;

    loadThree().then((THREE) => {
      if (cancelled || !mountRef.current) return;

      // Defensive: remove any canvas left behind by a prior instance before
      // adding a new one.
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // Central wireframe hologram
      const coreGroup = new THREE.Group();

      const sphereGeo = new THREE.IcosahedronGeometry(10, 2);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
      coreGroup.add(coreSphere);

      const innerGeo = new THREE.OctahedronGeometry(6, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const innerCore = new THREE.Mesh(innerGeo, innerMat);
      coreGroup.add(innerCore);

      scene.add(coreGroup);

      // Particle cloud
      const particleCount = 700;
      const particlesGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorBlue = new THREE.Color(0x60a5fa);
      const colorPurple = new THREE.Color(0xc084fc);
      const colorCyan = new THREE.Color(0x38bdf8);

      for (let i = 0; i < particleCount; i++) {
        const radius = 15 + Math.random() * 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const mixColor =
          Math.random() > 0.5 ? colorBlue : Math.random() > 0.5 ? colorPurple : colorCyan;
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particlesMat = new THREE.PointsMaterial({
        size: 0.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });

      const particleSystem = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particleSystem);

      let mouseX = 0;
      let mouseY = 0;

      handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", handleMouseMove);

      handleResize = () => {
        if (!mountRef.current) return;
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        coreSphere.rotation.x += 0.003;
        coreSphere.rotation.y += 0.005;

        innerCore.rotation.x -= 0.006;
        innerCore.rotation.y -= 0.008;

        particleSystem.rotation.y += 0.0015;

        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      // Stash disposables on the ref so cleanup (which runs in a separate
      // closure) can reach them.
      mountRef.current._cleanupThree = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        sphereGeo.dispose();
        sphereMat.dispose();
        innerGeo.dispose();
        innerMat.dispose();
        particlesGeo.dispose();
        particlesMat.dispose();
        renderer.dispose();
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelled = true;
      if (mountRef.current && mountRef.current._cleanupThree) {
        mountRef.current._cleanupThree();
        delete mountRef.current._cleanupThree;
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}