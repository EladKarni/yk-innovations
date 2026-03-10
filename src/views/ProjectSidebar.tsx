import CTAButton from "@/ui/CTAButton";
import ProjectModel3DClient from "@/components/ProjectModel3DClient";

interface ProjectSidebarProps {
  client: string;
  duration: string;
  year: string;
  technologies: string[];
  model3dUrl?: string;
}

export default function ProjectSidebar({
  client,
  duration,
  year,
  technologies,
  model3dUrl,
}: ProjectSidebarProps) {
  return (
    <div className="">
      <div className="sticky top-32 space-y-6">
        {/* 3D Model Viewer */}
        {model3dUrl && (
          <div className="rounded-lg overflow-hidden bg-base-200" style={{ height: 300 }}>
            <ProjectModel3DClient url={model3dUrl} />
          </div>
        )}

        {/* Project Info Card */}
        <div className="bg-base-200 rounded-lg p-6 space-y-4">
          <div>
            <div className="text-sm font-semibold text-base-content/60 mb-1">Client</div>
            <div className="text-base-content">{client}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-base-content/60 mb-1">Duration</div>
            <div className="text-base-content">{duration}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-base-content/60 mb-1">Year</div>
            <div className="text-base-content">{year}</div>
          </div>
          {technologies.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-base-content/60 mb-2">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span key={index} className="text-xs px-3 py-1 rounded-full bg-base-100 text-base-content">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 space-y-3">
            <CTAButton href="/#contact" variant="primary" size="md" className="w-full">
              Start Your Project
            </CTAButton>
            <CTAButton href="/projects" variant="ghost" size="md" className="w-full">
              View All Projects
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
