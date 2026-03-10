"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useFBX } from "@react-three/drei";
import { Box3, Vector3 } from "three";

function Loader() {
  return (
    <Html center>
      <span className="text-xs text-base-content/70 bg-base-100/80 px-2 py-1 rounded">
        Loading...
      </span>
    </Html>
  );
}

function FBXScene({ url }: { url: string }) {
  const fbx = useFBX(url);
  const { camera } = useThree();

  // Center model and fit camera — runs once per unique fbx object
  useMemo(() => {
    const box = new Box3().setFromObject(fbx);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    fbx.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as any).fov ?? 50;
    const distance = (maxDim / 2) / Math.tan((fov * Math.PI) / 360) * 2;
    camera.position.set(0, maxDim * 0.2, distance);
    camera.lookAt(0, 0, 0);
    (camera as any).updateProjectionMatrix?.();
  }, [fbx, camera]);

  return <primitive object={fbx} />;
}

export interface ProjectModel3DProps {
  url: string;
  onError?: () => void;
}

export default function ProjectModel3D({ url, onError }: ProjectModel3DProps) {
  const hasDragged = useRef(false);
  const isPointerDown = useRef(false);

  return (
    <div
      className="w-full h-full"
      onPointerDown={() => { isPointerDown.current = true; hasDragged.current = false; }}
      onPointerMove={() => { if (isPointerDown.current) hasDragged.current = true; }}
      onPointerUp={() => { isPointerDown.current = false; }}
      onClick={(e) => { if (hasDragged.current) { e.preventDefault(); e.stopPropagation(); } }}
    >
      <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }} onCreated={({ gl }) => { if (!gl) onError?.(); }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <Suspense fallback={<Loader />}>
          <FBXScene url={url} />
          <OrbitControls autoRotate autoRotateSpeed={1.5} enableZoom={false} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
