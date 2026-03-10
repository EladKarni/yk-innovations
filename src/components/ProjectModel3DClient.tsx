"use client";

import dynamic from "next/dynamic";

const ProjectModel3D = dynamic(() => import("./ProjectModel3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-base-300 animate-pulse" />,
});

export default function ProjectModel3DClient({ url }: { url: string }) {
  return <ProjectModel3D url={url} />;
}
