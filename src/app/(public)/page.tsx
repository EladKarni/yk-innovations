import Hero from "@/components/Hero";
import AboutSection from "@/views/AboutSection";
import ServicesSection from "@/views/ServicesSection";
import ProcessSection from "@/views/ProcessSection";
import FeaturedProjectsSection from "@/views/FeaturedProjectsSection";
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
  fallbackContactData,
  fallbackCompanyInfo,
  fallbackProjectsSection,
} from "@/lib/fallbackData";
import {
  mapHeroSection,
  mapAboutSection,
  mapProcessSection,
  mapProjectsSection,
  mapContactSection,
  mapCompanyInfo,
  mapService,
  mapProject,
} from "@/lib/cmsMappers";
import type {
  AboutSectionData,
  ProcessSectionData,
  Service,
  Project,
  ContactData,
  CompanyInfo,
} from "@/types";
import type { HeroProps } from "@/types/components";

// Enable ISR with on-demand revalidation for performance
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand via webhook

type HeroMapped = Omit<HeroProps, "children" | "className">;

export default async function Home() {
  // Initialize with fallback data so variables are always assigned
  let heroData: HeroMapped = {
    title: fallbackHeroData.title,
    subtitle: fallbackHeroData.subtitle,
    description: fallbackHeroData.description,
    primaryCTA: fallbackHeroData.primaryCTA,
    secondaryCTA: fallbackHeroData.secondaryCTA,
    backgroundImage: fallbackHeroData.backgroundImage,
    backgroundVideo: fallbackHeroData.backgroundVideo,
    overlay: fallbackHeroData.overlay,
    overlayOpacity: fallbackHeroData.overlayOpacity,
  };
  let aboutData: AboutSectionData = fallbackAboutData;
  let processData: ProcessSectionData = fallbackProcessData;
  let projectsSection: { title?: string } = fallbackProjectsSection;
  let contactSection: ContactData = fallbackContactData;
  let companyInfo: CompanyInfo = fallbackCompanyInfo;
  let services: { docs: Service[] } = { docs: fallbackServices };
  let projects: { docs: Project[] } = { docs: fallbackProjects };

  // Check if we're in draft mode for live preview
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const payload = await getPayload({ config });

    // Fetch all CMS data in parallel for better performance
    const [
      _hero,
      _about,
      _process,
      _projectsSection,
      _contact,
      _companyInfo,
      _services,
      _projects,
    ] = await Promise.all([
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
    ]);

    heroData = mapHeroSection(_hero);
    aboutData = mapAboutSection(_about);
    processData = mapProcessSection(_process);
    projectsSection = mapProjectsSection(_projectsSection);
    contactSection = mapContactSection(_contact);
    companyInfo = mapCompanyInfo(_companyInfo);
    services = { docs: _services.docs.map(mapService) };
    projects = { docs: _projects.docs.map(mapProject) };
  } catch (error) {
    // Fallback data already initialized above; log the error
    console.warn("CMS unavailable, using fallback data:", error);
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section - Data from CMS */}
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        description={heroData.description}
        primaryCTA={heroData.primaryCTA}
        secondaryCTA={heroData.secondaryCTA}
        backgroundImage={heroData.backgroundImage}
        backgroundVideo={heroData.backgroundVideo || "/hero-bg-video.webm"}
        overlay={heroData.overlay}
        overlayOpacity={heroData.overlayOpacity}
        scrollIndicator={heroData.scrollIndicator}
      />

      {/* About Section - Data from CMS */}
      <AboutSection data={aboutData} />

      {/* Featured Projects Section - Data from CMS */}
      <FeaturedProjectsSection
        data={projects.docs}
        title={projectsSection?.title}
      />

      {/* Services Section - Data from CMS */}
      <ServicesSection data={services.docs} />

      {/* Process Section - Data from CMS */}
      <ProcessSection data={processData} />

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
