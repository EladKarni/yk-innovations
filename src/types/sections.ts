// Section view component types

export interface Project {
  id?: string;
  title: string;
  description: string;
  image?: any;
  heroImage?: any;
  slug: string;
  technologies?: Array<{ technology: string; id?: string }>;
  category?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeaturedProjectsSectionProps {
  data: Project[];
  showViewAll?: boolean;
  title?: string;
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessSectionData {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export interface ProcessSectionProps {
  data: ProcessSectionData;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
}

export interface ServicesSectionProps {
  data: Service[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: any;
}

export interface TestimonialsSectionProps {
  data: Testimonial[];
}

export interface AboutSectionData {
  title: string;
  subtitle?: string;
  description: string;
  image?: any;
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

export interface AboutSectionProps {
  data: AboutSectionData;
}

export interface ContactData {
  title?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitButtonText?: string;
}

export interface ContactSectionProps {
  contactData?: ContactData;
  companyInfo?: CompanyInfo;
}

export interface CompanyInfo {
  companyName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  socialMedia?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface FooterData {
  services?: Array<{
    label: string;
    href: string;
  }>;
  showQuickLinks?: boolean;
  legalLinks?: Array<{
    label: string;
    href: string;
  }>;
  copyrightText?: string;
}

export interface FooterProps {
  footerData?: FooterData;
  companyInfo?: CompanyInfo;
}
