"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/* =====================================================================
   Programming Club IIT Indore: 3D logo built entirely from geometry.
   Dark blue disc with a white border, and the white 3D P on top:

   - a slanted bar that runs from the rim, through the top vertex, to the
     right-hand tip (the tip is a sharp joint with NO circle)
   - a second bar from the tip back to a detached circle vertex that does
     NOT touch the vertical line
   - a vertical stem from the top vertex down to the bottom rim, with a
     circle vertex near the bottom
   - "CLUB / IIT INDORE" to the right of the stem, clear of it

   Positions were measured from the original logo. Coordinates are in
   disc units (disc radius = 1.6). Everything is editable below.
   ===================================================================== */

const R_DISC = 1.6;

// ---- Geometry of the P (measured from the original logo) ----
const N1 = [-0.525, 1.128]; // top vertex (circle), on the stem
const N3 = [-0.026, 0.079]; // detached vertex (circle), NOT on the stem
const N4 = [-0.525, -1.154]; // bottom vertex (circle), on the stem
const TIP = [0.944, 0.551]; // right-hand tip, sharp joint, no circle

const NODES = [N1, N3, N4]; // only these get circles

// Point where a line from p, heading along dir, reaches the disc rim.
function rimPoint(p, dir, radius = R_DISC - 0.02) {
  const len = Math.hypot(dir[0], dir[1]);
  const d = [dir[0] / len, dir[1] / len];
  const pd = p[0] * d[0] + p[1] * d[1];
  const c = p[0] * p[0] + p[1] * p[1] - radius * radius;
  const t = -pd + Math.sqrt(pd * pd - c);
  return [p[0] + d[0] * t, p[1] + d[1] * t];
}

// Each bar grows from `from` to `to`.
const BARS = [
  // slant: tip -> through the top vertex -> out to the rim
  { from: TIP, to: rimPoint(TIP, [N1[0] - TIP[0], N1[1] - TIP[1]]) },
  // tip -> detached vertex
  { from: TIP, to: N3 },
  // stem: top vertex straight down to the bottom rim
  { from: N1, to: rimPoint(N1, [0, -1]) },
];

const WOBBLE_AMP = 0.1;    // max tilt in radians (~6°); keep small
const WOBBLE_SPEED = 1.8;  // higher = faster (1.8 ≈ one full cycle every 3.5 s)
const WOBBLE_START = 2.0;  // seconds; starts after the intro animation finishes

// original length and angle of the lower bar (tip -> detached circle)
const LOWER_DX = N3[0] - TIP[0];
const LOWER_DY = N3[1] - TIP[1];
const LOWER_LEN = Math.hypot(LOWER_DX, LOWER_DY);
const LOWER_ANGLE = Math.atan2(LOWER_DY, LOWER_DX);

// ---- Thickness / bulge ----
const BAR_WIDTH = 0.16; // thickness of each bar (side to side)
const BAR_DEPTH = 0.2; // how far the bars stand out of the disc
const NODE_RADIUS = 0.24; // size of the circle vertices
const NODE_LIFT = 0.1; // sphere center height; higher = bulges out more
const NODE_FLATTEN = 0.85; // <1 squashes the spheres slightly toward the disc

// ---- Text (positions measured from the original) ----
const SHOW_TEXT = true;
const TEXT_TOP = "CLUB";
const TEXT_BOTTOM = "IIT INDORE";
const TEXT_LEFT = -0.39; // left edge of the text; the stem's right edge is at about -0.445
const TEXT_WIDTH = 0.94; // width of "CLUB" (IIT INDORE is fitted to the same width)
const TEXT_BASELINE_TOP = -0.567; // baseline of "CLUB"
const TEXT_BASELINE_BOTTOM = -0.85; // baseline of "IIT INDORE"

// ---- Motion ----
const FULL_SPIN = false; // false = gentle swing (logo stays readable), true = full 360° rotation

// ---- Colors ----
const C_FACE = 0x0f4593; // dark logo blue
const C_BODY = 0x08224f;
const C_WHITE = 0xffffff;
const C_ROYAL = 0x2f6bff;
const C_SKY = 0x8fd3ff;

const clamp01 = (x) => Math.min(Math.max(x, 0), 1);
const prog = (t, start, dur) => clamp01((t - start) / dur);
const easeOutBack = (x) => {
  const c1 = 1.7;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

function makeGlowSprite(size, color, opacity) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const c = new THREE.Color(color);
  const rgb = `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
  const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, `rgba(${rgb},${opacity})`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 256, 256);

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  sprite.scale.set(size, size, 1);
  return sprite;
}

// Text is drawn into a canvas in code (no image file). Both lines are
// left-aligned, and "IIT INDORE" is sized to the same width as "CLUB",
// like the original logo.
function makeTextTexture(renderer) {
  const W = 1024;
  const H = 512;
  const FONT = '"Inter", "Segoe UI", Arial, sans-serif';
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";

  const topSize = 200;
  ctx.font = `800 ${topSize}px ${FONT}`;
  const wTop = ctx.measureText(TEXT_TOP).width;

  // Fit the second line to the same width (a few passes converge)
  let fs = 90;
  for (let i = 0; i < 4; i++) {
    ctx.font = `700 ${fs}px ${FONT}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = `${fs * 0.06}px`;
    const w = ctx.measureText(TEXT_BOTTOM).width;
    fs *= wTop / w;
  }

  const scaleU = TEXT_WIDTH / wTop; // world units per canvas pixel
  const baseTopPx = 220;
  const baseBottomPx =
    baseTopPx + (TEXT_BASELINE_TOP - TEXT_BASELINE_BOTTOM) / scaleU;

  // draw
  ctx.font = `800 ${topSize}px ${FONT}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  ctx.fillText(TEXT_TOP, 0, baseTopPx);

  ctx.font = `700 ${fs}px ${FONT}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${fs * 0.06}px`;
  ctx.fillText(TEXT_BOTTOM, 0, baseBottomPx);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  return {
    tex,
    planeW: W * scaleU,
    planeH: H * scaleU,
    // plane center in disc units
    cx: TEXT_LEFT + (W * scaleU) / 2,
    cy: TEXT_BASELINE_TOP + (baseTopPx - H / 2) * scaleU,
  };
}

export default function Club3DLogo({ className = "", style }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const R = R_DISC; // disc radius
    const T = 0.4; // disc thickness
    const FACE_Z = T / 2 + 0.004;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---- Lights ----
    scene.add(new THREE.AmbientLight(0xc8d4ee, 1.2));

    const keyLight = new THREE.PointLight(0xffffff, 60, 30);
    keyLight.position.set(2, 3, 6);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(C_ROYAL, 25, 30);
    blueLight.position.set(-4, -1, 4);
    scene.add(blueLight);

    const skyLight = new THREE.PointLight(C_SKY, 15, 30);
    skyLight.position.set(4, 2, 3);
    scene.add(skyLight);

    // ---- Shared materials ----
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.4,
      emissive: 0xffffff,
      emissiveIntensity: 0.3,
    });

    const text = SHOW_TEXT ? makeTextTexture(renderer) : null;

    // ---- Logo group ----
    const logo = new THREE.Group();
    scene.add(logo);

    // Dark blue body of the disc
    const bodyGeo = new THREE.CylinderGeometry(R - 0.01, R - 0.01, T, 96);
    bodyGeo.rotateX(Math.PI / 2);
    logo.add(
      new THREE.Mesh(
        bodyGeo,
        new THREE.MeshStandardMaterial({
          color: C_BODY,
          metalness: 0.6,
          roughness: 0.4,
          emissive: 0x0a2a63,
          emissiveIntensity: 0.4,
        })
      )
    );

    // White border on both sides
    const borderGeo = new THREE.TorusGeometry(R, 0.11, 20, 160);
    [1, -1].forEach((s) => {
      const border = new THREE.Mesh(borderGeo, whiteMat);
      border.position.z = (s * T) / 2;
      logo.add(border);
    });

    // Dark blue face on both sides
    const faceGeo = new THREE.CircleGeometry(R - 0.1, 128);
    const faceMat = new THREE.MeshStandardMaterial({
      color: C_FACE,
      metalness: 0.2,
      roughness: 0.5,
      emissive: 0x0a2a63,
      emissiveIntensity: 0.45,
    });
    const frontFace = new THREE.Mesh(faceGeo, faceMat);
    frontFace.position.z = FACE_Z;
    logo.add(frontFace);
    const backFace = new THREE.Mesh(faceGeo, faceMat);
    backFace.position.z = -FACE_Z;
    backFace.rotation.y = Math.PI;
    logo.add(backFace);

    // ---- The mark: white P from thick bars + bulging vertices ----
    function buildMark() {
      const group = new THREE.Group();
      const nodes = [];
      const bars = [];

      // Bars: thick rounded rectangles stretched between two points
      BARS.forEach(({ from, to }) => {
        const dx = to[0] - from[0];
        const dy = to[1] - from[1];
        const len = Math.hypot(dx, dy);

        const pivot = new THREE.Group(); // origin at `from`, grows toward `to`
        pivot.position.set(from[0], from[1], 0);
        pivot.rotation.z = Math.atan2(dy, dx);

        const bar = new THREE.Mesh(
          new RoundedBoxGeometry(len, BAR_WIDTH, BAR_DEPTH, 4, 0.045),
          whiteMat
        );
        bar.position.set(len / 2, 0, BAR_DEPTH / 2);
        pivot.add(bar);
        group.add(pivot);
        bars.push(pivot);
      });

      // Tip: a plain rounded joint, no circle vertex
      const tipGeo = new THREE.CylinderGeometry(
        BAR_WIDTH / 2,
        BAR_WIDTH / 2,
        BAR_DEPTH,
        40
      );
      tipGeo.rotateX(Math.PI / 2);
      const tip = new THREE.Mesh(tipGeo, whiteMat);
      tip.position.set(TIP[0], TIP[1], BAR_DEPTH / 2);
      group.add(tip);

      // Circle vertices: big white domes that bulge out of the disc
      NODES.forEach(([x, y]) => {
        const node = new THREE.Group();
        node.position.set(x, y, 0);

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(NODE_RADIUS, 48, 32),
          whiteMat
        );
        sphere.scale.z = NODE_FLATTEN;
        sphere.position.z = NODE_LIFT;
        node.add(sphere);

        group.add(node);
        nodes.push(node);
      });

      // Text
      let textMat = null;
      if (text) {
        textMat = new THREE.MeshBasicMaterial({
          map: text.tex,
          transparent: true,
          depthWrite: false,
          opacity: 0,
        });
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(text.planeW, text.planeH),
          textMat
        );
        plane.position.set(text.cx, text.cy, 0.012);
        group.add(plane);
      }

      return { group, nodes, bars, tip, textMat };
    }

    const front = buildMark();
    front.group.position.z = FACE_Z;
    logo.add(front.group);

    const back = buildMark();
    back.group.position.z = -FACE_Z;
    back.group.rotation.y = Math.PI;
    logo.add(back.group);

    const marks = [front, back];

    // Soft glow behind the logo
    const glow = makeGlowSprite(R * 4.2, C_ROYAL, 0.5);
    glow.position.z = -0.8;
    scene.add(glow);

    // ---- Sizing: keep the whole disc inside the container ----
    function fit() {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;

      const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      const distV = (R * 1.4) / tanHalf;
      const distH = (R * 1.4) / (tanHalf * camera.aspect);
      camera.position.set(0, 0, Math.max(distV, distH));
      camera.updateProjectionMatrix();
    }
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    // ---- Pointer tilt ----
    // const pointer = { x: 0, y: 0 };
    // const tilt = { x: 0, y: 0 };
    // const onPointerMove = (e) => {
    //   pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    //   pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    // };
    // window.addEventListener("pointermove", onPointerMove, { passive: true });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Animation ----
    const startTime = performance.now();
    let frameId;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = reduceMotion ? 99 : (performance.now() - startTime) / 1000;

      // Disc pops in and spins into place
      const pDisc = prog(t, 0, 0.9);
      logo.scale.setScalar(Math.max(easeOutBack(pDisc), 0.0001));
      const introSpin = (1 - easeOutCubic(prog(t, 0, 1.3))) * Math.PI * 2;

      // P builds itself: vertices pop in, bars grow, then text fades in
      marks.forEach((m) => {
        m.nodes.forEach((n, i) => {
          const p = prog(t, 0.8 + i * 0.14, 0.5);
          n.scale.setScalar(Math.max(easeOutBack(p), 0.0001));
        });
        m.tip.scale.setScalar(
          Math.max(easeOutBack(prog(t, 0.8, 0.5)), 0.0001)
        );
        m.bars.forEach((b, i) => {
          const p = prog(t, 1.3 + i * 0.16, 0.5);
          b.scale.x = Math.max(easeOutCubic(p), 0.0001);
        });

        // Lower bar: swing up, then down, passing through the original angle
const wobbleAmp = reduceMotion
  ? 0
  : WOBBLE_AMP * easeOutCubic(prog(t, WOBBLE_START, 1.0)); // eases in, no jump

const delta = -wobbleAmp * Math.sin((t - WOBBLE_START) * WOBBLE_SPEED);
const ang = LOWER_ANGLE + delta;

// swing the bar around the tip
m.bars[1].rotation.z = ang;

// keep the circle at the end of the bar (same length, moving on an arc)
m.nodes[1].position.set(
  TIP[0] + Math.cos(ang) * LOWER_LEN,
  TIP[1] + Math.sin(ang) * LOWER_LEN,
  0
);
        if (m.textMat) m.textMat.opacity = prog(t, 2.0, 0.7);
      });

      // Idle motion
      const idleY = reduceMotion
        ? 0
        : FULL_SPIN
        ? t * 0.6
        : Math.sin(t * 0.7) * 0.55;

    //   tilt.x += (pointer.y * 0.25 - tilt.x) * 0.05;
    //   tilt.y += (pointer.x * 0.35 - tilt.y) * 0.05;

    //   logo.rotation.y = idleY + introSpin + tilt.y;
    //   logo.rotation.x = tilt.x;
      logo.rotation.y = idleY + introSpin;
      logo.position.y = reduceMotion ? 0 : Math.sin(t * 1.1) * 0.06;

      glow.material.opacity = 0.85 + Math.sin(t * 1.3) * 0.15;

      renderer.render(scene, camera);
    }
    animate();

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    //   window.removeEventListener("pointermove", onPointerMove);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      if (text) text.tex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
      role="img"
      aria-label="Programming Club IIT Indore logo"
    />
  );
}