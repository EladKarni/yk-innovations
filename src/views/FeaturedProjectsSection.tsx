import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import ProjectCard from "@/components/ProjectCard";
import CTAButton from "@/ui/CTAButton";

interface Project {
  title: string;
  description: string;
  image: string;
  slug: string;
  technologies?: string[];
  category?: string;
  featured?: boolean;
}

interface FeaturedProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  showViewAll?: boolean;
}

const defaultProjects: Project[] = [
  {
    title: "Smart Kitchen Appliance",
    description: "Engineered and prototyped a next-generation kitchen appliance with integrated IoT sensors. Delivered functional prototypes for user testing and investor demonstrations.",
    image: "https://picsum.photos/1200/800?random=3",
    slug: "smart-kitchen-appliance",
    technologies: ["SolidWorks", "3D Printing", "ABS", "Electronics Integration"],
    category: "Consumer Product",
    featured: true,
  },
  {
    title: "Industrial Valve Assembly",
    description: "Designed custom valve assembly for high-pressure applications. Provided CAD models, FEA analysis, and CNC-machined prototypes for testing and certification.",
    image: "https://picsum.photos/1200/800?random=4",
    slug: "industrial-valve",
    technologies: ["Fusion 360", "FEA Analysis", "Stainless Steel", "CNC Machining"],
    category: "Industrial",
  },
  {
    title: "Medical Device Enclosure",
    description: "Created biocompatible enclosure for portable medical device. Designed for injection molding with emphasis on ergonomics, sterilization, and regulatory compliance.",
    image: "https://picsum.photos/1200/800?random=5",
    slug: "medical-device-enclosure",
    technologies: ["AutoCAD", "SLA Printing", "Medical-Grade Polymer", "DFM"],
    category: "Medical",
  },
];

const FeaturedProjectsSection: FC<FeaturedProjectsSectionProps> = ({
  title = "Featured Projects",
  subtitle = "Our Work",
  projects = defaultProjects,
  showViewAll = true,
}) => {
  return (
    <SectionContainer sectionName="projects" background="alt">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            slug={project.slug}
            technologies={project.technologies}
            category={project.category}
            glassMorphism={true}
            featured={project.featured}
          />
        ))}
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
