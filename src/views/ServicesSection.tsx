import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import IconCard from "@/components/IconCard";
import SectionHeader from "@/components/SectionHeader";
import type { ServicesSectionProps } from "@/types";

const ServicesSection: FC<ServicesSectionProps> = ({ data }) => {
  return (
    <SectionContainer sectionName="solutions" background="alt">
      <SectionHeader title="Our Services" subtitle="What We Do" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((service, index) => (
          <IconCard
            key={index}
            icon={service.icon || "cube"}
            title={service.title}
            description={service.description}
            variant="glass"
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ServicesSection;
