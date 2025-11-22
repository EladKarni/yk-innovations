import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import IconCard from "@/components/IconCard";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "CAD Design & Engineering",
    description: "Professional 3D modeling and CAD design services using SolidWorks, Fusion 360, and AutoCAD for precise product development.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Rapid Prototyping",
    description: "Fast turnaround prototypes using 3D printing (FDM, SLA, SLS) and CNC machining to validate your design concepts quickly.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Design for Manufacturing",
    description: "DFM analysis and optimization to ensure your designs are production-ready, cost-effective, and manufacturable at scale.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Testing & Validation",
    description: "Comprehensive prototype testing including functional testing, fit checks, and performance validation to ensure design integrity.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Materials Engineering",
    description: "Expert materials selection and engineering consultation to choose the right materials for your application requirements.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Production Support",
    description: "End-to-end manufacturing support from prototype to production, including vendor sourcing and quality control guidance.",
  },
];

const ServicesSection: FC<ServicesSectionProps> = ({
  title = "Our Services",
  subtitle = "What We Do",
  services = defaultServices,
}) => {
  return (
    <SectionContainer sectionName="solutions" background="base">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <IconCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            link={service.link}
            variant="glass"
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ServicesSection;
