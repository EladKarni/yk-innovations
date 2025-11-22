import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  technologies?: string[];
  category?: string;
  glassMorphism?: boolean;
  featured?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  image,
  slug,
  technologies = [],
  category,
  glassMorphism = true,
  featured = false,
}) => {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article
        className={clsx(
          "relative h-full rounded-lg overflow-hidden transition-all duration-300",
          glassMorphism
            ? "bg-white/60 dark:bg-base-200/60 backdrop-blur-sm border border-gray-300 dark:border-base-300"
            : "bg-base-100 border border-base-300",
          "hover:shadow-xl hover:-translate-y-1",
          featured && "md:col-span-2 md:row-span-2"
        )}
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-base-300">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute top-4 left-4 bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-base-content/70 mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-md bg-base-200 text-base-content/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* View Project Link */}
          <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all duration-300">
            <span>View Project</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
