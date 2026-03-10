import {
  LightbulbIcon,
  DesignIcon,
  FlaskIcon,
  ShieldIcon,
  CogIcon,
  LightningBoltIcon,
  CubeIcon,
  PrinterIcon,
  ChartIcon,
  BeakerIcon,
  TemplateIcon,
  ClipboardIcon,
  ChipIcon,
  RulerIcon,
  TriangleRulerIcon,
  CodeBracketsIcon,
  PCBIcon,
  EmailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
} from "./index";
import type { FC } from "react";
import type { IconProps } from "@/types";

export const getIconByName = (name: string, className?: string) => {
  const icons: Record<string, FC<IconProps>> = {
    // Process Icons
    lightbulb: LightbulbIcon,
    design: DesignIcon,
    flask: FlaskIcon,
    shield: ShieldIcon,
    cog: CogIcon,
    'lightning-bolt': LightningBoltIcon,

    // Service Icons
    cube: CubeIcon,
    printer: PrinterIcon,
    chart: ChartIcon,
    beaker: BeakerIcon,
    template: TemplateIcon,
    clipboard: ClipboardIcon,
    chip: ChipIcon,
    ruler: RulerIcon,
    'triangle-ruler': TriangleRulerIcon,
    'code-brackets': CodeBracketsIcon,
    'pcb': PCBIcon,
    'circuit-board': PCBIcon,

    // Contact Icons
    email: EmailIcon,
    phone: PhoneIcon,
    mapPin: MapPinIcon,

    // Social Icons
    github: GithubIcon,
    linkedin: LinkedInIcon,
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon,
  };

  const Icon = icons[name.toLowerCase()] || CubeIcon;
  return <Icon className={className} />;
};
