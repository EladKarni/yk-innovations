import type { ReactNode, SVGProps } from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  technologies?: string[];
  category?: string;
  glassMorphism?: boolean;
  featured?: boolean;
}

export interface NavBarProps {
  children?: ReactNode;
}

export interface HeroProps {
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
  backgroundImageAlt?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: ReactNode;
  className?: string;
}

export interface IconCardProps {
  icon: ReactNode | string;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  variant?: "default" | "glass" | "bordered";
  className?: string;
}

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export interface MobileMenuProps {
  children?: ReactNode;
}
