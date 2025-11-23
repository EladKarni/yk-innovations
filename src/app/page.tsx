import Hero from "@/components/Hero";
import AboutSection from "@/views/AboutSection";
import ServicesSection from "@/views/ServicesSection";
import ProcessSection from "@/views/ProcessSection";
import FeaturedProjectsSection from "@/views/FeaturedProjectsSection";
import TestimonialsSection from "@/views/TestimonialsSection";
import ContactSection from "@/views/ContactSection";
import { getPayload } from "payload";
import config from "@/payload.config";

interface AboutSectionData {
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

interface ProcessSectionData {
  title: string;
  subtitle?: string;
  steps: Array<{
    number: string;
    icon: string;
    title: string;
    description: string;
  }>;
}

interface Service {
  title: string;
  description: string;
  icon?: string;
}

interface Project {
  title: string;
  description: string;
  image?: any;
  slug: string;
  technologies?: string[];
  category?: string;
  featured?: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: any;
}

export default async function Home() {
  const payload = await getPayload({ config });

  // Fetch all CMS data in parallel for better performance
  const [heroData, aboutData, processData, services, projects, testimonials] = await Promise.all([
    payload.findGlobal({ slug: "hero-section" }),
    payload.findGlobal({ slug: "about-section" }),
    payload.findGlobal({ slug: "process-section" }),
    payload.find({ collection: "services" }),
    payload.find({
      collection: "projects",
      where: { featured: { equals: true } },
      limit: 6,
    }),
    payload.find({
      collection: "testimonials",
      where: { featured: { equals: true } },
      limit: 6,
    }),
  ]);

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
      <FeaturedProjectsSection data={projects.docs as unknown as Project[]} />

      {/* Services Section - Data from CMS */}
      <ServicesSection data={services.docs as unknown as Service[]} />

      {/* Process Section - Data from CMS */}
      <ProcessSection data={processData as ProcessSectionData} />

      {/* Testimonials Section - Data from CMS */}
      <TestimonialsSection data={testimonials.docs as unknown as Testimonial[]} />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
