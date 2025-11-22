import { FC, ReactNode } from "react";
import CTAButton from "@/ui/CTAButton";
import clsx from "clsx";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: ReactNode;
  className?: string;
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 40,
  children,
  className,
}) => {
  return (
    <section className={clsx("relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden", className)}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
        {subtitle && (
          <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-4 animate-fade-in">
            {subtitle}
          </p>
        )}

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            {description}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            {primaryCTA && (
              <CTAButton href={primaryCTA.href} size="lg" variant="primary">
                {primaryCTA.text}
              </CTAButton>
            )}
            {secondaryCTA && (
              <CTAButton href={secondaryCTA.href} size="lg" variant="ghost" className="text-white border-white hover:bg-white hover:text-primary">
                {secondaryCTA.text}
              </CTAButton>
            )}
          </div>
        )}

        {children && (
          <div className="mt-12 animate-fade-in-up animation-delay-600">
            {children}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
