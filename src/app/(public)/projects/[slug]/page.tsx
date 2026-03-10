import CTAButton from "@/ui/CTAButton";
import SectionContainer from "@/ui/SectionContainer";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { draftMode } from "next/headers";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectHero from "@/views/ProjectHero";
import ProjectContent from "@/views/ProjectContent";
import ProjectSidebar from "@/views/ProjectSidebar";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const projects = await payload.find({ collection: "projects", limit: 100, draft: false });
    return projects.docs.map((project: any) => ({ slug: project.slug }));
  } catch {
    return [];
  }
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  let project: any = null;
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      draft: isDraftMode,
      limit: 1,
    });
    if (result.docs.length > 0) project = result.docs[0];
  } catch (error) {
    console.warn("Failed to fetch project from CMS:", error);
  }

  if (!project) notFound();

  const heroImageUrl =
    typeof project.heroImage === "object" && project.heroImage !== null
      ? project.heroImage.url || "https://picsum.photos/1200/800?random=1"
      : project.heroImage || "https://picsum.photos/1200/800?random=1";

  const model3dUrl =
    typeof project.model3d === "object" && project.model3d !== null
      ? project.model3d.url || undefined
      : typeof project.model3d === "string" ? project.model3d : undefined;

  const galleryUrls = (project.gallery ?? [])
    .map((item: any) => (typeof item.image === "object" ? item.image?.url : item.image))
    .filter(Boolean);

  const features = (project.features ?? [])
    .map((item: any) => (typeof item === "object" ? item.feature : item))
    .filter(Boolean);

  const technologies = (project.technologies ?? [])
    .map((item: any) => (typeof item === "object" ? item.technology : item))
    .filter(Boolean);

  const results = (project.results ?? []).map((r: any) => ({ metric: r.metric, value: r.value }));

  return (
    <main className="min-h-screen">
      <ProjectHero title={project.title} imageUrl={heroImageUrl} />

      <SectionContainer sectionName="project-details" background="base">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <ProjectContent
            fullDescription={project.fullDescription}
            features={features}
            challenge={project.challenge}
            solution={project.solution}
            results={results}
          />
          <ProjectSidebar
            client={project.client}
            duration={project.duration}
            year={project.year}
            technologies={technologies}
            model3dUrl={model3dUrl}
          />
        </div>
      </SectionContainer>

      {galleryUrls.length > 0 && (
        <SectionContainer sectionName="project-gallery" background="alt">
          <h2 className="text-3xl font-bold text-base-content mb-8 text-center">Project Gallery</h2>
          <ProjectGallery images={galleryUrls} projectTitle={project.title} />
        </SectionContainer>
      )}

      <SectionContainer sectionName="project-cta" background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            Let&apos;s discuss how we can help bring your vision to life with innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/#contact" variant="primary" size="lg">Get in Touch</CTAButton>
            <CTAButton href="/projects" variant="ghost" size="lg">View More Projects</CTAButton>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      draft: isDraftMode,
      limit: 1,
    });
    const project = result.docs[0];
    if (!project) return { title: "Project Not Found | YK Innovations" };
    return { title: `${project.title} | YK Innovations`, description: project.description };
  } catch {
    return { title: "Project | YK Innovations" };
  }
}
