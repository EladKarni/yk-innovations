import { FC } from "react";
import Image from "next/image";
import SectionContainer from "@/ui/SectionContainer";
import CTAButton from "@/ui/CTAButton";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  cta?: {
    text: string;
    href: string;
  };
  imagePosition?: "left" | "right";
}

const AboutSection: FC<AboutSectionProps> = ({
  title = "About Us",
  subtitle = "Who We Are",
  description = "We are a team of experienced mechanical engineers dedicated to helping businesses bring innovative products to market through expert prototyping and engineering support.",
  image = "https://picsum.photos/800/600?random=2",
  imageAlt = "About Us",
  stats,
  cta,
  imagePosition = "right",
}) => {
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

          {/* CTA */}
          {cta && (
            <div className="mt-8">
              <CTAButton href={cta.href} variant="primary" size="md">
                {cta.text}
              </CTAButton>
            </div>
          )}
        </div>

        {/* Image */}
        <div className={imagePosition === "left" ? "lg:order-1" : ""}>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={image}
              alt={imageAlt}
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
