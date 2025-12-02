import type { ReactNode, SVGProps } from "react";

export interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export type SectionContainerProps = {
  children: React.ReactNode;
  sectionName: string;
  isFullWidth?: boolean;
  sectionClasses?: string;
  innerContainerClasses?: string;
  background?: "none" | "base" | "alt" | "gradient";
  noPadding?: boolean;
};

export type SubtitleTextProps = {
  children: React.ReactNode;
  DarkMode?: boolean;
  sectionClasses?: string;
};

export type InputBoxProps = {
  children: React.ReactNode;
  id: string;
  field: string;
  placeholder: string;
  inputType: "text" | "email" | "tel";
};

export interface ButtonProps {
  children: React.ReactNode;
  link: string;
}

export type TitleTextProps = {
  children: React.ReactNode;
  DarkMode?: boolean;
  sectionClasses?: string;
};

export type LogoProps = {
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

export type MailIconProps = {
  height?: number;
  width?: number;
  "aria-label"?: string;
  className?: string;
} & SVGProps<SVGSVGElement>;
