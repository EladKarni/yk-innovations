import Image from "next/image";
import SectionContainer from "@/ui/SectionContainer";
import TitleText from "@/ui/TitleText";

import SMCPoster from "../../public/smc-poster.png";
import StickerPoster from "../../public/sticker-separator-poster.png";
import FloralinkPoster from "../../public/floralink-poster.jpg";
import PetFeederPoster from "../../public/pawfectfeed-poster.jpg";

const Projects = () => {
  return (
    <SectionContainer
      sectionName="projects"
      sectionClasses="bg-base-100"
      innerContainerClasses="py-4 flex flex-col items-center space-y-4"
      isFullWidth
    >
      <TitleText>Projects</TitleText>
      <Image src={FloralinkPoster} alt="Floralink Poster" width={1100} />
      <Image src={PetFeederPoster} alt="PawfectFeed Poster" width={1100} />
      <Image src={SMCPoster} alt="SMC Poster" width={1100} />
      <Image src={StickerPoster} alt="Sticker Separator Poster" width={1100} />
    </SectionContainer>
  );
};

export default Projects;
