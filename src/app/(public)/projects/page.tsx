import ProjectCard from "@/components/ProjectCard";
import SectionContainer from "@/ui/SectionContainer";
import { getPayload } from "payload";
import config from "@/payload.config";
import { draftMode } from "next/headers";

// Enable ISR with on-demand revalidation for performance
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand via webhook

interface Project {
  id: string;
  title: string;
  description: string;
  heroImage?: any;
  slug: string;
  technologies?: Array<{ technology: string; id?: string }>;
  category?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default async function ProjectsPage() {
  // Fetch projects from CMS
  let projects: Project[] = [];

  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      draft: isDraftMode,
      limit: 100, // Get all projects
    });
    projects = result.docs as unknown as Project[];
  } catch (error) {
    console.warn("Failed to fetch projects from CMS:", error);
  }

  // Extract unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  return (
    <main className="min-h-screen pt-24">
      <SectionContainer sectionName="all-projects" background="base" noPadding={false}>
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-6">
            Our Projects
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
            Explore our portfolio of prototyping and engineering projects across various industries. Each prototype demonstrates our expertise in bringing product concepts to reality.
          </p>
        </div>

        {/* Filter/Category Section */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <div
                key={category}
                className={`px-6 py-2 rounded-full font-medium ${
                  category === "All"
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {category}
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              // Extract image URL if it's a Media object
              const imageUrl =
                typeof project.heroImage === "object" && project.heroImage !== null
                  ? (project.heroImage as any).url || "https://picsum.photos/1200/800?random=" + index
                  : project.heroImage || "https://picsum.photos/1200/800?random=" + index;

              // Extract technology strings from array of objects
              const techList = project.technologies?.map(t => t.technology) || [];

              return (
                <ProjectCard
                  key={project.slug || index}
                  title={project.title}
                  description={project.description}
                  image={imageUrl}
                  slug={project.slug}
                  technologies={techList}
                  category={project.category}
                  glassMorphism={true}
                  featured={project.featured}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-base-content/70">
              <p className="text-xl">No projects found. Add projects in the CMS to display them here.</p>
            </div>
          )}
        </div>
      </SectionContainer>
    </main>
  );
}

export const metadata = {
  title: "Our Projects | YK Innovations",
  description: "Explore our portfolio of successful projects across web development, mobile apps, and enterprise solutions.",
};
