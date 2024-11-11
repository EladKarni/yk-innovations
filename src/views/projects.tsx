import ProjectCard from "@/components/projectCard";
import SectionContainer from "@/ui/SectionContainer";
import TitleText from "@/ui/TitleText";

import FloralinkLogo from "../../public/projects/FloraLink/FloraLink-Logo.png";
import FloralinkPoster from "../../public/projects/FloraLink/FloraLinkPoster.png";

import PawfectFeedLogo from "../../public/projects/PawfectFeed/pawfectfeed-logo.png";
import PawfectFeedPoster from "../../public/projects/PawfectFeed/PawfectFeedPoster.png";

import StickerSeparatorLogo from "../../public/projects/SticketSeparator/StickerSeparator-Logo.png";
import StickerSeparatorPoster from "../../public/projects/SticketSeparator/StickerSeparatorPoster.png";

import SheetMetalCutterLogo from "../../public/projects/SheetMetalCutter/SheetMetalCutterLogo.png";
import SheetMetalCutterPoster from "../../public/projects/SheetMetalCutter/SheetMetalCutterPoster.png";

const Projects = () => {
  return (
    <SectionContainer
      sectionName="projects"
      sectionClasses="bg-base-100"
      innerContainerClasses="py-4 flex flex-col items-center space-y-4"
      isFullWidth
    >
      <TitleText>Projects</TitleText>
      <div className="flex flex-wrap gap-10 justify-center">
        <ProjectCard
          Title={"Floralink"}
          Description={
            "Smart environmental monitor with live animations and Bluetooth control!"
          }
          ProjectImages={{
            logo: FloralinkLogo,
            poster: FloralinkPoster,
            alt: "Floralink Poster",
          }}
        />
        <ProjectCard
          Title={"PawfectFeed"}
          Description={
            "Smart feeder ensures perfect portions, scheduled meals, and remote control!"
          }
          ProjectImages={{
            logo: PawfectFeedLogo,
            poster: PawfectFeedPoster,
            alt: "Floralink Poster",
          }}
        />
        <ProjectCard
          Title={"Floralink"}
          Description={"This is a test descretions of the project"}
          ProjectImages={{
            logo: StickerSeparatorLogo,
            poster: StickerSeparatorPoster,
            alt: "Floralink Poster",
          }}
        />
        <ProjectCard
          Title={"Floralink"}
          Description={"This is a test descretions of the project"}
          ProjectImages={{
            logo: SheetMetalCutterLogo,
            poster: SheetMetalCutterPoster,
            alt: "Floralink Poster",
          }}
        />
      </div>
      {/* <Image src={PetFeederPoster} alt="PawfectFeed Poster" width={1100} />
      <Image src={SMCPoster} alt="SMC Poster" width={1100} />
      <Image src={StickerPoster} alt="Sticker Separator Poster" width={1100} /> */}
    </SectionContainer>
  );
};

export default Projects;
