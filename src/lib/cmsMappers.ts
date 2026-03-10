/**
 * Mapper functions: Payload CMS generated types → component prop types.
 * These are the only place CMS-specific shape handling lives.
 */
import type {
  HeroSection,
  AboutSection,
  ProcessSection,
  ProjectsSection,
  ContactSection,
  CompanyInfo as PayloadCompanyInfo,
  Media,
  Project as PayloadProject,
  Service as PayloadService,
  Testimonial as PayloadTestimonial,
} from "../../payload-types";
import type {
  AboutSectionData,
  ProcessSectionData,
  ContactData,
  CompanyInfo,
  Service,
  Project,
  Testimonial,
} from "@/types/sections";
import type { HeroProps } from "@/types/components";

type HeroMapped = Omit<HeroProps, "children" | "className">;

function resolveMediaUrl(field: (number | null) | Media | undefined): string | undefined {
  if (field == null || typeof field === "number") return undefined;
  return field.url ?? undefined;
}

export function mapHeroSection(cms: HeroSection): HeroMapped {
  return {
    title: cms.title,
    subtitle: cms.subtitle ?? undefined,
    description: cms.description ?? undefined,
    primaryCTA:
      cms.primaryCTA?.text && cms.primaryCTA?.href
        ? { text: cms.primaryCTA.text, href: cms.primaryCTA.href }
        : undefined,
    secondaryCTA:
      cms.secondaryCTA?.text && cms.secondaryCTA?.href
        ? { text: cms.secondaryCTA.text, href: cms.secondaryCTA.href }
        : undefined,
    backgroundImage: resolveMediaUrl(cms.backgroundImage),
    backgroundVideo: resolveMediaUrl(cms.backgroundVideo),
    overlay: cms.overlay ?? undefined,
    overlayOpacity: cms.overlayOpacity ?? undefined,
    scrollIndicator: cms.scrollIndicator ?? undefined,
  };
}

export function mapAboutSection(cms: AboutSection): AboutSectionData {
  return {
    title: cms.title,
    subtitle: cms.subtitle,
    description: cms.description,
    image: typeof cms.image === "object" && cms.image !== null ? cms.image : undefined,
    imagePosition: cms.imagePosition ?? undefined,
    stats: cms.stats?.map((s) => ({ value: s.value, label: s.label })) ?? undefined,
    cta:
      cms.cta?.text && cms.cta?.href
        ? { text: cms.cta.text, href: cms.cta.href }
        : undefined,
  };
}

export function mapProcessSection(cms: ProcessSection): ProcessSectionData {
  return {
    title: cms.title,
    subtitle: cms.subtitle,
    steps: cms.steps.map((s) => ({
      number: s.number,
      icon: s.icon,
      title: s.title,
      description: s.description,
    })),
  };
}

export function mapProjectsSection(cms: ProjectsSection): { title?: string } {
  return { title: cms.title };
}

export function mapContactSection(cms: ContactSection): ContactData {
  return {
    title: cms.title,
    nameLabel: cms.nameLabel,
    namePlaceholder: cms.namePlaceholder,
    emailLabel: cms.emailLabel,
    emailPlaceholder: cms.emailPlaceholder,
    messageLabel: cms.messageLabel,
    messagePlaceholder: cms.messagePlaceholder,
    submitButtonText: cms.submitButtonText,
  };
}

export function mapCompanyInfo(cms: PayloadCompanyInfo): CompanyInfo {
  return {
    companyName: cms.companyName,
    tagline: cms.tagline ?? undefined,
    email: cms.email,
    phone: cms.phone,
    phoneHref: cms.phoneHref ?? undefined,
    address: cms.address
      ? {
          street: cms.address.street ?? undefined,
          city: cms.address.city ?? undefined,
          state: cms.address.state ?? undefined,
          zip: cms.address.zip ?? undefined,
        }
      : undefined,
    socialMedia: cms.socialMedia
      ? {
          github: cms.socialMedia.github ?? undefined,
          linkedin: cms.socialMedia.linkedin ?? undefined,
          twitter: cms.socialMedia.twitter ?? undefined,
          instagram: cms.socialMedia.instagram ?? undefined,
        }
      : undefined,
  };
}

export function mapService(cms: PayloadService): Service {
  return {
    title: cms.title,
    description: cms.description,
    icon: cms.icon,
  };
}

export function mapProject(cms: PayloadProject): Project {
  return {
    id: String(cms.id),
    title: cms.title,
    description: cms.description,
    slug: cms.slug,
    heroImage: typeof cms.heroImage === "object" ? cms.heroImage : undefined,
    technologies: cms.technologies?.map((t) => ({ technology: t.technology, id: t.id ?? undefined })) ?? undefined,
    category: undefined,
    featured: cms.featured ?? undefined,
    createdAt: cms.createdAt,
    updatedAt: cms.updatedAt,
  };
}

export function mapTestimonial(cms: PayloadTestimonial): Testimonial {
  return {
    quote: cms.quote,
    author: cms.author,
    role: cms.role,
    company: cms.company,
    avatar: typeof cms.avatar === "object" && cms.avatar !== null ? cms.avatar : undefined,
  };
}
