import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import IconCard from "@/components/IconCard";
import SectionHeader from "@/components/SectionHeader";
import { getIconByName } from "@/components/icons";
import type { ProcessSectionProps } from "@/types";

const ProcessSection: FC<ProcessSectionProps> = ({ data }) => {
  const { title, subtitle, steps } = data;

  return (
    <SectionContainer sectionName="process" background="alt">
      <SectionHeader title={title} subtitle={subtitle} />

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
