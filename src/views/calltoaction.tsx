import SectionContainer from "@/ui/SectionContainer";
import React from "react";

const CallToAction = () => {
  return (
    <SectionContainer
      sectionName="cta"
      sectionClasses="bg-base-200 py-4 my-16"
      isFullWidth
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl text-primary-content font-bold text-center">
          Turning Concepts into Reality
        </h2>
      </div>
    </SectionContainer>
  );
};

export default CallToAction;
