"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, Html } from "@react-three/drei";
import MemberCard from "./MemberCard";

function FloatingCard({ member, position, onOpenDetails }) {
  const groupRef = useRef(null);
  // Per-card phase offset so cards don't bob in unison.
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.15;
    groupRef.current.position.x = position[0] + Math.cos(t * 0.4 + phase) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center distanceFactor={8} occlude={false} transform={false}>
        <MemberCard member={member} onOpenDetails={onOpenDetails} />
      </Html>
    </group>
  );
}

// Positions members in a gentle downward spiral so scrolling through the
// scene reads as "descending the leaderboard" rather than an arbitrary grid.
function useSpiralPositions(count) {
  return useMemo(() => {
    const positions = [];
    const radius = 3.2;
    const verticalStep = 2.4;
    const angleStep = 0.7;
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.5;
      const y = -i * verticalStep;
      positions.push([x, y, z]);
    }
    return positions;
  }, [count]);
}

export default function MembersScene({ members, onOpenDetails }) {
  const positions = useSpiralPositions(members.length);
  const pages = Math.max(3, Math.ceil(members.length / 1.6));

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ height: "100%", width: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#7c5cff" />

      <ScrollControls pages={pages} damping={0.25}>
        <Scroll>
          {members.map((member, i) => (
            <FloatingCard
              key={member.id}
              member={member}
              position={positions[i]}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}