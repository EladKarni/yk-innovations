import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import ProjectCard from "@/components/ProjectCard";
import CTAButton from "@/ui/CTAButton";
import SectionHeader from "@/components/SectionHeader";

interface Project {
  title: string;
  description: string;
  image?: any;
  slug: string;
  technologies?: string[];
  category?: string;
  featured?: boolean;
}

interface FeaturedProjectsSectionProps {
  data: Project[];
  showViewAll?: boolean;
}

const FeaturedProjectsSection: FC<FeaturedProjectsSectionProps> = ({
  data,
  showViewAll = true,
}) => {
  console.log(data)
  return (
    <SectionContainer sectionName="projects" background="alt">
      <SectionHeader title="Featured Projects" subtitle="Our Work" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {data.map((project, index) => {
          // Extract image URL if it's a Media object
          const imageUrl =
            typeof project.image === "object" && project.image !== null
              ? (project.image as any).url || "https://picsum.photos/1200/800?random=" + index
              : project.image || "https://picsum.photos/1200/800?random=" + index;

          return (
            <ProjectCard
              key={project.slug || index}
              title={project.title}
              description={project.description}
              image={imageUrl}
              slug={project.slug}
              technologies={project.technologies}
              category={project.category}
              glassMorphism={true}
              featured={project.featured}
            />
          );
        })}
      </div>

      {showViewAll && (
        <div className="text-center">
          <CTAButton href="/projects" variant="ghost" size="lg">
            View All Projects
          </CTAButton>
        </div>
      )}
    </SectionContainer>
  );
};

export default FeaturedProjectsSection;
