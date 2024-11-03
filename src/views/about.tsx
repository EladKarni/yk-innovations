import SectionContainer from "@/ui/SectionContainer";
import SubtitleText from "@/ui/SubtitleText";
import TitleText from "@/ui/TitleText";
import React from "react";

const About = () => {
  return (
    <SectionContainer
      sectionName="about"
      sectionClasses="bg-base-100 my-96"
      innerContainerClasses="py-4"
      isFullWidth
    >
      <TitleText>About Y.K. Innovations</TitleText>
      <SubtitleText>
        At Y.K. Innovations, I bring bold ideas to life through R&D and
        proof-of-concept prototyping, focusing on efficient, low-cost designs
        optimized not only for proof-of-concept but for production and assembly.
        With innovative solutions and practical approaches, I help clients
        streamline the journey from concept to market-ready prototype
      </SubtitleText>
    </SectionContainer>
  );
};

export default About;
