import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import IconCard from "@/components/IconCard";

interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Concept Development",
    description: "We begin by understanding your product requirements, target market, and functional specifications. Together, we refine your concept and establish clear design criteria.",
  },
  {
    number: "02",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Design & Engineering",
    description: "Our engineers create detailed CAD models, perform structural analysis, and optimize the design for functionality, manufacturability, and cost-effectiveness.",
  },
  {
    number: "03",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Prototyping & Testing",
    description: "We fabricate functional prototypes using 3D printing or CNC machining, then conduct thorough testing to validate design performance and identify improvements.",
  },
  {
    number: "04",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Production Support",
    description: "We provide manufacturing documentation, vendor recommendations, and ongoing engineering support to ensure a smooth transition from prototype to full production.",
  },
];

const ProcessSection: FC<ProcessSectionProps> = ({
  title = "Our Process",
  subtitle = "How We Work",
  steps = defaultSteps,
}) => {
  return (
    <SectionContainer sectionName="process" background="alt">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector Line (hidden on last item and mobile) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-primary/20 z-0" />
            )}

            <div className="relative z-10">
              {/* Number Badge */}
              <div className="inline-block bg-primary text-primary-content font-bold text-lg px-4 py-2 rounded-full mb-4">
                {step.number}
              </div>

              <IconCard
                icon={step.icon}
                title={step.title}
                description={step.description}
                variant="glass"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProcessSection;
