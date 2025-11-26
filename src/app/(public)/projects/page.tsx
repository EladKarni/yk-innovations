import ProjectCard from "@/components/ProjectCard";
import SectionContainer from "@/ui/SectionContainer";

// This will be replaced with actual data from Payload CMS
const projects = [
  {
    title: "Smart Kitchen Appliance",
    description: "Engineered and prototyped a next-generation kitchen appliance with integrated IoT sensors. Delivered functional prototypes for user testing and investor demonstrations with complete documentation.",
    image: "https://picsum.photos/1200/800?random=3",
    slug: "smart-kitchen-appliance",
    technologies: ["SolidWorks", "3D Printing", "ABS", "Electronics Integration"],
    category: "Consumer Product",
    featured: true,
  },
  {
    title: "Industrial Valve Assembly",
    description: "Designed custom valve assembly for high-pressure applications. Provided comprehensive CAD models, FEA analysis, and precision CNC-machined prototypes for certification testing.",
    image: "https://picsum.photos/1200/800?random=4",
    slug: "industrial-valve",
    technologies: ["Fusion 360", "FEA Analysis", "Stainless Steel", "CNC Machining"],
    category: "Industrial",
  },
  {
    title: "Medical Device Enclosure",
    description: "Created biocompatible enclosure for portable medical device. Designed for injection molding with emphasis on ergonomics, sterilization requirements, and regulatory compliance.",
    image: "https://picsum.photos/1200/800?random=5",
    slug: "medical-device-enclosure",
    technologies: ["AutoCAD", "SLA Printing", "Medical-Grade Polymer", "DFM"],
    category: "Medical",
  },
  {
    title: "Automotive Sensor Housing",
    description: "Developed robust sensor housing for automotive application with thermal and vibration requirements. Prototyped using SLS nylon and validated through environmental testing.",
    image: "https://picsum.photos/1200/800?random=6",
    slug: "automotive-sensor-housing",
    technologies: ["CATIA", "SLS Printing", "PA12 Nylon", "Environmental Testing"],
    category: "Automotive",
  },
  {
    title: "Robotic Gripper Mechanism",
    description: "Designed precision gripper mechanism for collaborative robot. Integrated pneumatic actuation with custom jaw design optimized for specific product handling.",
    image: "https://picsum.photos/1200/800?random=7",
    slug: "robotic-gripper",
    technologies: ["SolidWorks", "Motion Simulation", "Aluminum", "Pneumatics"],
    category: "Robotics",
  },
  {
    title: "Consumer Electronics Case",
    description: "Engineered sleek protective case for consumer electronics with integrated cooling features. Tooled prototypes demonstrated manufacturability and thermal performance.",
    image: "https://picsum.photos/1200/800?random=8",
    slug: "electronics-case",
    technologies: ["Rhino 3D", "FDM Printing", "Polycarbonate", "Thermal Analysis"],
    category: "Consumer Product",
  },
];

export default function ProjectsPage() {
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

        {/* Filter/Category Section - Placeholder for future enhancement */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Consumer Product", "Industrial", "Medical", "Automotive", "Robotics"].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                category === "All"
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </SectionContainer>
    </main>
  );
}

export const metadata = {
  title: "Our Projects | YK Innovations",
  description: "Explore our portfolio of successful projects across web development, mobile apps, and enterprise solutions.",
};
