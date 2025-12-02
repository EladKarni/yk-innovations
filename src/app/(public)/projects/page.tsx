import ProjectCard from "@/components/ProjectCard";
import SectionContainer from "@/ui/SectionContainer";
import { getPayload } from "payload";
import config from "@/payload.config";
import { draftMode } from "next/headers";
import { fallbackProjectsPageData } from "@/lib/fallbackData";
import type { Project, ProjectsSectionData } from "@/types";

// Enable ISR with on-demand revalidation for performance
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand via webhook

export default async function ProjectsPage() {
  // Fetch projects from CMS
  let projects: Project[] = [];
  let sectionData: ProjectsSectionData = fallbackProjectsPageData;

  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const payload = await getPayload({ config });

    // Fetch projects and section data in parallel
    const [projectsResult, projectsSectionData] = await Promise.all([
      payload.find({
        collection: "projects",
        draft: isDraftMode,
        limit: 100, // Get all projects
        sort: "createdAt", // Oldest first (ascending)
      }),
      payload.findGlobal({
        slug: "projects-section",
        draft: isDraftMode,
      }),
    ]);

    projects = projectsResult.docs as unknown as Project[];
    sectionData = projectsSectionData as unknown as ProjectsSectionData;
  } catch (error) {
    console.warn("Failed to fetch data from CMS:", error);
  }

  // Extract page header data with fallbacks
  const pageHeader =
    sectionData?.pageHeader || fallbackProjectsPageData.pageHeader;

  // Extract unique categories from projects
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  return (
    <main className="min-h-screen -pt-8">
      <SectionContainer
        sectionName="all-projects"
        background="base"
        noPadding={false}
      >
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
            {pageHeader.label}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-6">
            {pageHeader.title}
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
            {pageHeader.description}
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
                typeof project.heroImage === "object" &&
                project.heroImage !== null
                  ? (project.heroImage as any).url ||
                    "https://picsum.photos/1200/800?random=" + index
                  : project.heroImage ||
                    "https://picsum.photos/1200/800?random=" + index;

              // Extract technology strings from array of objects
              const techList =
                project.technologies?.map((t) => t.technology) || [];

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
              <p className="text-xl">
                No projects found. Add projects in the CMS to display them here.
              </p>
            </div>
          )}
        </div>
      </SectionContainer>
    </main>
  );
}

export const metadata = {
  title: "Our Projects | YK Innovations",
  description:
    "Explore our portfolio of successful projects across web development, mobile apps, and enterprise solutions.",
};
