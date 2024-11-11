import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  Title: string;
  Description: string;
  ProjectImages: {
    poster: StaticImageData;
    logo: StaticImageData;
    alt: string;
  };
};

const ProjectCard = ({
  ProjectImages,
  Title,
  Description,
}: ProjectCardProps) => {
  return (
    <article className="card bg-[#cecece] w-96 shadow-xl text-black">
      <figure className="pt-2">
        <Image
          src={ProjectImages.logo}
          alt={ProjectImages.alt}
          style={{ aspectRatio: "auto" }}
          className="object-contain w-full h-48"
        />
      </figure>
      <div className="card-body text-left">
        <h2 className="card-title">{Title}</h2>
        <p>{Description}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-primary"
            href={ProjectImages.poster.src}
            target="_blank"
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
