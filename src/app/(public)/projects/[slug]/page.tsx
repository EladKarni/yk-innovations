import Image from "next/image";
import CTAButton from "@/ui/CTAButton";
import SectionContainer from "@/ui/SectionContainer";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { draftMode } from "next/headers";
import { ReactElement } from "react";
import ProjectGallery from "@/components/ProjectGallery";

// Helper to render Lexical rich text to React elements
function renderRichText(richText: any): ReactElement {
  if (!richText) return <></>;
  if (typeof richText === 'string') return <p>{richText}</p>;

  // Handle Lexical format
  if (richText.root && richText.root.children) {
    return (
      <>
        {richText.root.children.map((node: any, index: number) => {
          // List nodes
          if (node.type === 'list') {
            const ListTag = node.listType === 'bullet' ? 'ul' : 'ol';
            return (
              <ListTag key={index} className="list-disc list-inside space-y-2 mb-4 text-lg text-base-content/80">
                {node.children?.map((listItem: any, liIndex: number) => (
                  <li key={liIndex} className="ml-4">
                    {listItem.children?.map((child: any) => child.text || '').join('')}
                  </li>
                ))}
              </ListTag>
            );
          }

          // Paragraph nodes
          if (node.type === 'paragraph') {
            const text = node.children?.map((child: any, childIndex: number) => {
              if (child.type === 'text' || child.text) {
                let element: any = child.text;
                if (child.format & 1) element = <strong key={childIndex}>{element}</strong>;
                if (child.format & 2) element = <em key={childIndex}>{element}</em>;
                return element;
              }
              return '';
            });
            return <p key={index} className="mb-4 text-lg text-base-content/80 leading-relaxed">{text}</p>;
          }

          // Heading nodes
          if (node.type === 'heading') {
            const text = node.children?.map((child: any) => child.text || '').join('');
            const level = node.tag || 'h3';
            const className = "font-bold text-base-content mb-3";

            switch (level) {
              case 'h1': return <h1 key={index} className={className}>{text}</h1>;
              case 'h2': return <h2 key={index} className={className}>{text}</h2>;
              case 'h3': return <h3 key={index} className={className}>{text}</h3>;
              case 'h4': return <h4 key={index} className={className}>{text}</h4>;
              case 'h5': return <h5 key={index} className={className}>{text}</h5>;
              case 'h6': return <h6 key={index} className={className}>{text}</h6>;
              default: return <h3 key={index} className={className}>{text}</h3>;
            }
          }

          return null;
        })}
      </>
    );
  }

  return <></>;
}

// Enable ISR with on-demand revalidation for performance
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand via webhook

// Pre-generate static pages for all projects at build time
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const projects = await payload.find({
      collection: "projects",
      limit: 100,
      draft: false,
    });

    return projects.docs.map((project: any) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.warn("Failed to generate static params:", error);
    return [];
  }
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  // Fetch project from CMS
  const { isEnabled: isDraftMode } = await draftMode();

  let project: any = null;

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: isDraftMode,
      limit: 1,
    });

    if (result.docs.length > 0) {
      project = result.docs[0];
    }
  } catch (error) {
    console.warn("Failed to fetch project from CMS:", error);
  }

  if (!project) {
    notFound();
  }

  // Extract hero image URL from Media object
  const heroImageUrl =
    typeof project.heroImage === "object" && project.heroImage !== null
      ? (project.heroImage as any).url || "https://picsum.photos/1200/800?random=1"
      : project.heroImage || "https://picsum.photos/1200/800?random=1";

  // Extract gallery image URLs from Media objects
  const galleryUrls = project.gallery?.map((item: any) => {
    if (typeof item.image === "object" && item.image !== null) {
      return (item.image as any).url || "";
    }
    return item.image || "";
  }).filter(Boolean) || [];

  // Extract feature strings from objects
  const featuresList = project.features?.map((item: any) =>
    typeof item === "object" ? item.feature : item
  ).filter(Boolean) || [];

  // Extract technology strings from objects
  const techList = project.technologies?.map((item: any) =>
    typeof item === "object" ? item.technology : item
  ).filter(Boolean) || [];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[800px] md:h-[900px] bg-base-200 -mt-[100px] pt-[100px]">
        <div className="relative w-full h-full">
          <Image
            src={heroImageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <SectionContainer sectionName="project-details" background="base">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold text-base-content mb-4">Overview</h2>
              <div>
                {renderRichText(project.fullDescription)}
              </div>
            </div>

            {/* Features */}
            {featuresList.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-base-content mb-4">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuresList.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base-content/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-base-content mb-3">Challenge</h3>
                <p className="text-base-content/80">{project.challenge}</p>
              </div>
              <div className="bg-base-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-base-content mb-3">Solution</h3>
                <p className="text-base-content/80">{project.solution}</p>
              </div>
            </div>

            {/* Results */}
            {project.results?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-base-content mb-6">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.results.map((result: any, index: number) => (
                    <div key={index} className="bg-primary/10 rounded-lg p-4 text-center flex flex-col justify-between min-h-[80px]">
                      <div className="text-xl font-bold text-primary mb-1">{result.value}</div>
                      <div className="text-xs text-base-content/70 mt-auto">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className="bg-base-200 rounded-lg p-6 space-y-4 sticky top-24">
              <div>
                <div className="text-sm font-semibold text-base-content/60 mb-1">Client</div>
                <div className="text-base-content">{project.client}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-base-content/60 mb-1">Duration</div>
                <div className="text-base-content">{project.duration}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-base-content/60 mb-1">Year</div>
                <div className="text-base-content">{project.year}</div>
              </div>
              {techList.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-base-content/60 mb-2">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full bg-base-100 text-base-content"
                      >
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
      </SectionContainer>

      {/* Gallery Section (if images exist) */}
      {galleryUrls.length > 0 && (
        <SectionContainer sectionName="project-gallery" background="alt">
          <h2 className="text-3xl font-bold text-base-content mb-8 text-center">Project Gallery</h2>
          <ProjectGallery images={galleryUrls} projectTitle={project.title} />
        </SectionContainer>
      )}

      {/* CTA Section */}
      <SectionContainer sectionName="project-cta" background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            Let&apos;s discuss how we can help bring your vision to life with innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/#contact" variant="primary" size="lg">
              Get in Touch
            </CTAButton>
            <CTAButton href="/projects" variant="ghost" size="lg">
              View More Projects
            </CTAButton>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  let project: any = null;

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: isDraftMode,
      limit: 1,
    });

    if (result.docs.length > 0) {
      project = result.docs[0];
    }
  } catch (error) {
    console.warn("Failed to fetch project metadata from CMS:", error);
  }

  if (!project) {
    return {
      title: "Project Not Found | YK Innovations",
    };
  }

  return {
    title: `${project.title} | YK Innovations`,
    description: project.description,
  };
}
