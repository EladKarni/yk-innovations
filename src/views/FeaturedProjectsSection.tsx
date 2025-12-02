import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import ProjectCard from "@/components/ProjectCard";
import CTAButton from "@/ui/CTAButton";
import SectionHeader from "@/components/SectionHeader";
import type { FeaturedProjectsSectionProps } from "@/types";

const FeaturedProjectsSection: FC<FeaturedProjectsSectionProps> = ({
  data,
  showViewAll = true,
  title,
}) => {
  return (
    <SectionContainer sectionName="projects" background="alt">
      <SectionHeader title={title || "Featured Projects"} subtitle="Our Work" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {data.map((project, index) => {
          // Extract image URL from heroImage or image field (Media object)
          const imageSource = project.heroImage || project.image;
          const imageUrl =
            typeof imageSource === "object" && imageSource !== null
              ? (imageSource as any).url || "https://picsum.photos/1200/800?random=" + index
              : imageSource || "https://picsum.photos/1200/800?random=" + index;

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
