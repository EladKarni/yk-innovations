import { FC } from "react";
import Image from "next/image";
import SectionContainer from "@/ui/SectionContainer";
import CTAButton from "@/ui/CTAButton";
import type { AboutSectionProps } from "@/types";

const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  const {
    title,
    subtitle,
    description,
    image,
    imageAlt,
    stats,
    cta,
    imagePosition = "right",
  } = data;

  // Extract image URL if it's a Media object
  const imageUrl =
    typeof image === "object" && image !== null
      ? (image as any).url || "https://picsum.photos/800/600?random=2"
      : image || "https://picsum.photos/800/600?random=2";

  // Use default alt text if imageAlt is empty or undefined
  const altText = imageAlt && imageAlt.trim() !== ""
    ? imageAlt
    : "YK Innovations mechanical engineering and prototyping workspace";

  return (
    <SectionContainer sectionName="about" background="alt">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imagePosition === "left" ? "lg:flex-row-reverse" : ""}`}>
        {/* Content */}
        <div className={imagePosition === "left" ? "lg:order-2" : ""}>
          <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6">
            {title}
          </h2>
          <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed space-y-4">
            <p>{description}</p>
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-base-content/70">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image */}
        <div className={imagePosition === "left" ? "lg:order-1" : ""}>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
