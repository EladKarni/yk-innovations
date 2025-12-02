import Hero from "@/components/Hero";
import AboutSection from "@/views/AboutSection";
import ServicesSection from "@/views/ServicesSection";
import ProcessSection from "@/views/ProcessSection";
import FeaturedProjectsSection from "@/views/FeaturedProjectsSection";
import TestimonialsSection from "@/views/TestimonialsSection";
import ContactSection from "@/views/ContactSection";
import { getPayload } from "payload";
import config from "@/payload.config";
import { draftMode } from "next/headers";
import {
  fallbackHeroData,
  fallbackAboutData,
  fallbackProcessData,
  fallbackServices,
  fallbackProjects,
  fallbackTestimonials,
} from "@/lib/fallbackData";
import type {
  AboutSectionData,
  ProcessSectionData,
  Service,
  Project,
  Testimonial,
} from "@/types";

// Enable ISR with on-demand revalidation for performance
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand via webhook

export default async function Home() {
  // Try to fetch from CMS, fall back to static data if database is unavailable
  let heroData: any;
  let aboutData: any;
  let processData: any;
  let projectsSection: any;
  let contactSection: any;
  let companyInfo: any;
  let services: any;
  let projects: any;
  let testimonials: any;

  // Check if we're in draft mode for live preview
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const payload = await getPayload({ config });

    // Fetch all CMS data in parallel for better performance
    [heroData, aboutData, processData, projectsSection, contactSection, companyInfo, services, projects, testimonials] = await Promise.all([
      payload.findGlobal({ slug: "hero-section", draft: isDraftMode }),
      payload.findGlobal({ slug: "about-section", draft: isDraftMode }),
      payload.findGlobal({ slug: "process-section", draft: isDraftMode }),
      payload.findGlobal({ slug: "projects-section", draft: isDraftMode }),
      payload.findGlobal({ slug: "contact-section", draft: isDraftMode }),
      payload.findGlobal({ slug: "company-info", draft: isDraftMode }),
      payload.find({ collection: "services", draft: isDraftMode }),
      payload.find({
        collection: "projects",
        where: { featured: { equals: true } },
        limit: 6,
        draft: isDraftMode,
      }),
      payload.find({
        collection: "testimonials",
        where: { featured: { equals: true } },
        limit: 6,
        draft: isDraftMode,
      }),
    ]);
  } catch (error) {
    // Use fallback data when CMS is unavailable (e.g., during build without database)
    console.warn("CMS unavailable, using fallback data:", error);
    heroData = fallbackHeroData;
    aboutData = fallbackAboutData;
    processData = fallbackProcessData;
    services = { docs: fallbackServices };
    projects = { docs: fallbackProjects };
    testimonials = { docs: fallbackTestimonials };
  }

  // Extract background image URL if it's a Media object
  const backgroundImage =
    typeof heroData.backgroundImage === "object" && heroData.backgroundImage !== null
      ? (heroData.backgroundImage as any).url
      : heroData.backgroundImage;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Data from CMS */}
      <Hero
        title={heroData.title as string}
        subtitle={heroData.subtitle as string}
        description={heroData.description as string}
        primaryCTA={heroData.primaryCTA as any}
        secondaryCTA={heroData.secondaryCTA as any}
        backgroundImage={backgroundImage}
        backgroundVideo={heroData.backgroundVideo as string}
        overlay={heroData.overlay as boolean}
        overlayOpacity={heroData.overlayOpacity as number}
      />

      {/* About Section - Data from CMS */}
      <AboutSection data={aboutData as AboutSectionData} />

      {/* Featured Projects Section - Data from CMS */}
      <FeaturedProjectsSection
        data={projects.docs as Project[]}
        title={projectsSection?.title}
      />

      {/* Services Section - Data from CMS */}
      <ServicesSection data={services.docs as Service[]} />

      {/* Process Section - Data from CMS */}
      <ProcessSection data={processData as ProcessSectionData} />

      {/* Testimonials Section - Data from CMS */}
      {/* <TestimonialsSection data={testimonials.docs as Testimonial[]} /> */}

      {/* Contact Section - Data from CMS */}
      <ContactSection
        contactData={contactSection}
        companyInfo={companyInfo}
      />
    </main>
  );
}
