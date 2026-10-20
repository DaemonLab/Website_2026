"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import StrokeTextHeading from "./StrokeTextHeading";

export default function CPDomainHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let scene, camera, renderer;
    let rootGroup, codeGroup, discGroup, ringGroup, particles, beam;
    const clock = new THREE.Clock();
    let frameId;

    let introPieces = [];
    let spinAngle = 0;
    let lastT = 0;

    const INTRO_DUR = 1.4;
    const INTRO_END = 0.5 + INTRO_DUR;

    function makeGlowSprite(radius, color, opacity) {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Sprite();

      const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      const c = new THREE.Color(color);
      const rgb = `${Math.floor(c.r * 255)},${Math.floor(c.g * 255)},${Math.floor(c.b * 255)}`;
      grd.addColorStop(0, `rgba(${rgb},${opacity})`);
      grd.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 256, 256);

      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(radius * 2, radius * 2, 1);
      return sprite;
    }

    function buildPlatform() {
      discGroup = new THREE.Group();

      const baseGeo = new THREE.CylinderGeometry(4.6, 4.8, 0.35, 70);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x081326,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x0f2a66,
        emissiveIntensity: 0.55,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      discGroup.add(base);

      const baseTopGeo = new THREE.CircleGeometry(4.55, 80);
      const baseTopMat = new THREE.MeshStandardMaterial({
        color: 0x0f2248,
        metalness: 1,
        roughness: 0.08,
        emissive: 0x1c4bb8,
        emissiveIntensity: 0.4,
      });
      const baseTop = new THREE.Mesh(baseTopGeo, baseTopMat);
      baseTop.rotation.x = -Math.PI / 2;
      baseTop.position.y = 0.176;
      discGroup.add(baseTop);

      const rimSegments = 80;
      const rimGeo = new THREE.TorusGeometry(4.7, 0.06, 12, rimSegments);
      const rimPositions = rimGeo.attributes.position;
      const rimColors = [];
      const purple = new THREE.Color(0x3d7bff);
      const blue = new THREE.Color(0x8fd3ff);
      for (let i = 0; i < rimPositions.count; i++) {
        const angle = (i / rimPositions.count) * Math.PI * 2;
        const mix = (Math.sin(angle) + 1) / 2;
        const c = purple.clone().lerp(blue, mix);
        rimColors.push(c.r, c.g, c.b);
      }
      rimGeo.setAttribute("color", new THREE.Float32BufferAttribute(rimColors, 3));
      const rimMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.02;
      discGroup.add(rim);

      const midGeo = new THREE.CylinderGeometry(3.15, 3.3, 0.3, 72);
      const midMat = new THREE.MeshStandardMaterial({
        color: 0x1a1030,
        metalness: 0.9,
        roughness: 0.22,
        emissive: 0x3c1878,
        emissiveIntensity: 0.6,
      });
      const mid = new THREE.Mesh(midGeo, midMat);
      mid.position.y = 0.5;
      discGroup.add(mid);

      const midTopGeo = new THREE.CircleGeometry(3.1, 72);
      const midTopMat = new THREE.MeshStandardMaterial({
        color: 0x122a5a,
        metalness: 1,
        roughness: 0.05,
        emissive: 0x2a5fd6,
        emissiveIntensity: 0.6,
      });
      const midTop = new THREE.Mesh(midTopGeo, midTopMat);
      midTop.rotation.x = -Math.PI / 2;
      midTop.position.y = 0.655;
      discGroup.add(midTop);

      const midRimGeo = new THREE.TorusGeometry(3.2, 0.045, 12, rimSegments);
      const midRimMat = new THREE.MeshBasicMaterial({
        color: 0x8ad9ff,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const midRim = new THREE.Mesh(midRimGeo, midRimMat);
      midRim.rotation.x = Math.PI / 2;
      midRim.position.y = 0.5;
      discGroup.add(midRim);

      const discGlow = makeGlowSprite(5.2, 0x9b4dff, 0.9);
      discGlow.position.y = 0.4;
      discGroup.add(discGlow);

      const discGlowBlue = makeGlowSprite(3.6, 0x8fd3ff, 0.7);
      discGlowBlue.position.y = 0.7;
      discGroup.add(discGlowBlue);

      discGroup.position.y = -1.9;
      rootGroup.add(discGroup);

      const discLightPurple = new THREE.PointLight(0x2f6bff, 4, 10);
      discLightPurple.position.set(-2, -1.4, 2.5);
      rootGroup.add(discLightPurple);

      const discLightBlue = new THREE.PointLight(0x8fd3ff, 4, 10);
      discLightBlue.position.set(2, -1.4, 2.5);
      rootGroup.add(discLightBlue);

      ringGroup = new THREE.Group();
      const ringColors = [0x2f6bff, 0x8fd3ff, 0x2f6bff, 0x8fd3ff, 0x2f6bff];
      const radii = [5.2, 6.0, 6.8];
      radii.forEach((r, i) => {
        const coreGeo = new THREE.RingGeometry(r - 0.02, r, 128);
        const coreMat = new THREE.MeshBasicMaterial({
          color: ringColors[i % ringColors.length],
          transparent: true,
          opacity: 0.85 - i * 0.08,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const coreRing = new THREE.Mesh(coreGeo, coreMat);
        coreRing.rotation.x = -Math.PI / 2;
        coreRing.position.y = -2.15;
        ringGroup.add(coreRing);

        const haloGeo = new THREE.RingGeometry(r - 0.22, r + 0.22, 128);
        const haloMat = new THREE.MeshBasicMaterial({
          color: ringColors[i % ringColors.length],
          transparent: true,
          opacity: 0.18 - i * 0.02,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const haloRing = new THREE.Mesh(haloGeo, haloMat);
        haloRing.rotation.x = -Math.PI / 2;
        haloRing.position.y = -2.14;
        ringGroup.add(haloRing);
      });

      const glowGeo = new THREE.CircleGeometry(7.8, 64);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x1a4fc4,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.rotation.x = -Math.PI / 2;
      glow.position.y = -2.2;
      ringGroup.add(glow);

      rootGroup.add(ringGroup);
    }

    function easeOutBack(x) {
      const c1 = 1.2;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }

    function buildCodeIcon() {
      codeGroup = new THREE.Group();

      const purpleMat = new THREE.MeshStandardMaterial({
        color: 0x1c4fb8,
        metalness: 0.55,
        roughness: 0.12,
        emissive: 0x1f5ce6,
        emissiveIntensity: 1.6,
      });
      const blueMat = new THREE.MeshStandardMaterial({
        color: 0x6ec6ff,
        metalness: 0.6,
        roughness: 0.15,
        emissive: 0x1590c9,
        emissiveIntensity: 0.9,
      });

      const leftGroup = new THREE.Group();
      const armGeo = new THREE.BoxGeometry(3.12, 0.5, 0.6);
      const armTop = new THREE.Mesh(armGeo, purpleMat);
      armTop.position.set(0.9, 0.9, 0);
      armTop.rotation.z = Math.PI / 4.2;
      leftGroup.add(armTop);
      const armBot = new THREE.Mesh(armGeo, purpleMat);
      armBot.position.set(0.9, -0.9, 0);
      armBot.rotation.z = -Math.PI / 4.2;
      leftGroup.add(armBot);
      leftGroup.position.x = -3.2;
      codeGroup.add(leftGroup);

      const rightGroup = new THREE.Group();
      const armTop2 = new THREE.Mesh(armGeo, blueMat);
      armTop2.position.set(-0.9, 0.9, 0);
      armTop2.rotation.z = -Math.PI / 4.2;
      rightGroup.add(armTop2);
      const armBot2 = new THREE.Mesh(armGeo, blueMat);
      armBot2.position.set(-0.9, -0.9, 0);
      armBot2.rotation.z = Math.PI / 4.2;
      rightGroup.add(armBot2);
      rightGroup.position.x = 3.2;
      codeGroup.add(rightGroup);

      const slashGeo = new THREE.BoxGeometry(0.45, 4, 0.45);
      const slashMat = new THREE.MeshStandardMaterial({
        color: 0xe6f0ff,
        metalness: 0.65,
        roughness: 0.1,
        emissive: 0x5f9bff,
        emissiveIntensity: 1.1,
      });
      const slash = new THREE.Mesh(slashGeo, slashMat);
      slash.rotation.z = -Math.PI / 10;
      codeGroup.add(slash);

      const leftGlow = makeGlowSprite(1.7, 0x1f5ce6, 0.85);
      leftGlow.position.set(-1.6, 0, -0.15);
      codeGroup.add(leftGlow);

      const rightGlow = makeGlowSprite(1.7, 0x2fa8ff, 0.7);
      rightGlow.position.set(1.6, 0, -0.15);
      codeGroup.add(rightGlow);

      const slashGlow = makeGlowSprite(1.6, 0x5f9bff, 0.75);
      slashGlow.position.set(0, 0, -0.15);
      codeGroup.add(slashGlow);

      introPieces = [
        {
          objs: [leftGroup, leftGlow],
          from: new THREE.Vector3(-12, 1.5, 0),
          delay: 0.0,
          spinZ: Math.PI * 1.5,
        },
        {
          objs: [rightGroup, rightGlow],
          from: new THREE.Vector3(12, -1.5, 0),
          delay: 0.25,
          spinZ: -Math.PI * 1.5,
        },
        {
          objs: [slash, slashGlow],
          from: new THREE.Vector3(0, 10, 3),
          delay: 0.5,
          spinZ: Math.PI * 2,
        },
      ];

      introPieces.forEach((p) =>
        p.objs.forEach((o) => {
          o.userData.finalPos = o.position.clone();
          o.userData.finalRotZ = o.rotation.z;
        })
      );

      codeGroup.position.y = 1.4;
      rootGroup.add(codeGroup);

      const iconLight = new THREE.PointLight(0xa855ff, 4, 9);
      iconLight.position.set(0, 1.4, 1);
      rootGroup.add(iconLight);
      codeGroup.userData.light = iconLight;
    }

    function buildParticles() {
      const count = 200;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * r;
        positions[i * 3 + 1] = -1.8 + Math.random() * 6;
        positions[i * 3 + 2] = Math.sin(theta) * r - 2;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xb388ff,
        size: 0.035,
        transparent: true,
        opacity: 0.7,
      });
      particles = new THREE.Points(geo, mat);
      rootGroup.add(particles);
    }

    function init() {
      if (!mount) return;
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        45,
        mount.clientWidth / mount.clientHeight,
        0.1,
        200
      );
      // Moved camera back and positioned slightly higher to avoid horizontal/vertical clipping
      camera.position.set(0, 1.8, 14.5);
      camera.lookAt(0, 0.2, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x3a2a6a, 0.6));

      const purpleLight = new THREE.PointLight(0x9b4dff, 6, 25);
      purpleLight.position.set(-4, 5, 4);
      scene.add(purpleLight);

      const blueLight = new THREE.PointLight(0x3fc6ff, 6, 25);
      blueLight.position.set(4, 3, 4);
      scene.add(blueLight);

      const topLight = new THREE.PointLight(0xffffff, 2.5, 15);
      topLight.position.set(0, 6, 2);
      scene.add(topLight);

      rootGroup = new THREE.Group();
      // Scaled down slightly to guarantee full ring & tag visibility
      rootGroup.scale.setScalar(0.72);
      scene.add(rootGroup);

      buildPlatform();
      buildCodeIcon();
      buildParticles();
    }

    function onResize() {
      if (!mount || !renderer || !camera) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }

    function updateIntro(t) {
      introPieces.forEach((p) => {
        const raw = THREE.MathUtils.clamp((t - p.delay) / INTRO_DUR, 0, 1);
        const move = easeOutBack(raw);
        const spin = easeOutCubic(raw);

        p.objs.forEach((o) => {
          const fin = o.userData.finalPos;
          o.position.lerpVectors(p.from.clone().add(fin), fin, move);

          if (o.isSprite) {
            o.material.opacity = raw;
          } else {
            o.rotation.z = o.userData.finalRotZ + p.spinZ * (1 - spin);
          }
        });
      });
    }

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (codeGroup) {
        updateIntro(t);

        const dt = t - lastT;
        lastT = t;
        const ramp = THREE.MathUtils.smoothstep(t - INTRO_END, 0, 1.2);
        spinAngle += dt * 0.5 * ramp;
        codeGroup.rotation.y = spinAngle;

        codeGroup.position.y = 1.4 + Math.sin(t * 1.2) * 0.15;
        if (codeGroup.userData.light) {
          codeGroup.userData.light.position.y = codeGroup.position.y;
        }
      }

      if (discGroup) {
        discGroup.rotation.y = t * 0.3;
      }

      if (beam && beam.material) {
        beam.material.opacity = 0.06 + Math.abs(Math.sin(t * 0.7)) * 0.06;
      }

      if (ringGroup) {
        ringGroup.rotation.y = -t * 0.15;
        ringGroup.children.forEach((r, i) => {
          if (
            r.material &&
            r.material.opacity !== undefined &&
            r.geometry.type === "RingGeometry"
          ) {
            r.material.opacity = 0.2 + Math.abs(Math.sin(t * 0.8 + i)) * 0.35;
          }
        });
      }

      if (particles) {
        particles.rotation.y = t * 0.05;
        const pos = particles.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let y = pos.getY(i) + 0.005;
          if (y > 4.5) y = -1.8;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    init();
    animate();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  const tagBase = {
    position: "absolute",
    padding: "6px 14px",
    borderRadius: "8px",
    background: "rgba(5, 15, 40, 0.65)",
    border: "1px solid rgba(60, 130, 255, 0.55)",
    color: "#cfe0ff",
    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    fontSize: "12px",
    letterSpacing: "0.3px",
    whiteSpace: "nowrap",
    boxShadow:
      "0 0 18px rgba(40, 110, 255, 0.35), inset 0 0 12px rgba(40, 110, 255, 0.15)",
    backdropFilter: "blur(4px)",
    pointerEvents: "none",
    userSelect: "none",
  };

  const tagBlue = {
    borderColor: "rgba(110, 200, 255, 0.6)",
    color: "#e6f6ff",
    boxShadow:
      "0 0 18px rgba(80, 190, 255, 0.35), inset 0 0 12px rgba(80, 190, 255, 0.15)",
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white flex items-center overflow-hidden py-16 px-6 lg:px-16">
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .code-disc-tag { animation: floaty 5s ease-in-out infinite; }
      `}</style>

      <div className="max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: Domain Info & Concise 4-5 Line Description */}
        <div className="flex flex-col items-start z-10 space-y-6"> 
          <StrokeTextHeading className="w-full" />

          {/* Reduced paragraph (4-5 lines total) */}
          <p className="text-slate-300 text-base leading-relaxed font-sans max-w-xl">
            Welcome to the algorithmic powerhouse of our tech community, dedicated to mastering core data structures, dynamic programming, and graph algorithms. Through regular contest simulations, speed-drills, and peer mentorship, we prepare members to tackle complex computational challenges under strict constraints and achieve elite standings on platforms like Codeforces, CodeChef, and ICPC.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#roadmap"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Explore Roadmap
            </a>
            <a
              href="#members"
              className="px-6 py-3 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-slate-200 font-medium text-sm transition-all duration-200"
            >
              View Members
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Full 3D Canvas Container without edge clipping */}
        <div className="relative w-full h-[500px] sm:h-[550px] lg:h-[600px] flex items-center justify-center">
          {/* Three.js Canvas mount */}
          <div ref={mountRef} className="absolute inset-0 w-full h-full" />

          {/* Adjusted floating code tags to stay well within padding bounds */}
          <div
            className="code-disc-tag"
            style={{ ...tagBase, top: "14%", left: "6%", animationDelay: "0s" }}
          >
            for(int i=0;i&lt;n;i++)
          </div>
          <div
            className="code-disc-tag"
            style={{
              ...tagBase,
              ...tagBlue,
              top: "10%",
              right: "6%",
              animationDelay: "0.6s",
            }}
          >
            #include &lt;bits/stdc++.h&gt;
          </div>
          <div
            className="code-disc-tag"
            style={{
              ...tagBase,
              bottom: "22%",
              left: "10%",
              animationDelay: "1.2s",
            }}
          >
            while(!AC)
          </div>
          <div
            className="code-disc-tag"
            style={{
              ...tagBase,
              ...tagBlue,
              bottom: "18%",
              right: "10%",
              animationDelay: "1.8s",
            }}
          >
            cout &lt;&lt; "AC";
          </div>
        </div>
      </div>
    </section>
  );
}