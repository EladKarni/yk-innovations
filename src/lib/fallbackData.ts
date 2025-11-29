// Fallback data for when CMS is unavailable (e.g., during build without database)

export const fallbackHeroData = {
  title: "Engineering Excellence",
  subtitle: "From Concept to Reality",
  description:
    "Transform your product ideas into functional prototypes with expert mechanical engineering and rapid prototyping services.",
  primaryCTA: {
    text: "Start Your Project",
    href: "/#contact",
  },
  secondaryCTA: {
    text: "View Our Work",
    href: "/projects",
  },
  backgroundImage: "https://picsum.photos/1920/1080?random=1",
  backgroundVideo: "",
  overlay: true,
  overlayOpacity: 0.5,
};

export const fallbackAboutData = {
  title: "About YK Innovations",
  subtitle: "Your Partner in Product Development",
  description:
    "We specialize in transforming innovative ideas into tangible products. With expertise in CAD design, rapid prototyping, and manufacturing optimization, we help startups and established companies bring their visions to life.",
  stats: [
    { value: "100+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "10+", label: "Years Experience" },
  ],
  imagePosition: "right" as const,
};

export const fallbackProjectsPageData = {
  title: "Featured Developments",
  pageHeader: {
    label: "Portfolio",
    title: "Our Projects",
    description:
      "Explore our portfolio of prototyping and engineering projects across various industries. Each prototype demonstrates our expertise in bringing product concepts to reality.",
  },
};

export const fallbackProcessData = {
  title: "Our Process",
  subtitle: "From Concept to Production",
  steps: [
    {
      number: "01",
      icon: "lightbulb",
      title: "Concept Development",
      description:
        "We work with you to understand your vision and requirements, translating ideas into actionable design concepts.",
    },
    {
      number: "02",
      icon: "pencil-ruler",
      title: "CAD Design & Engineering",
      description:
        "Our team creates detailed 3D models and engineering drawings optimized for manufacturing and functionality.",
    },
    {
      number: "03",
      icon: "cube",
      title: "Rapid Prototyping",
      description:
        "Using 3D printing and CNC machining, we quickly produce functional prototypes for testing and validation.",
    },
    {
      number: "04",
      icon: "check-circle",
      title: "Testing & Refinement",
      description:
        "We iterate based on testing results, ensuring your product meets all requirements before production.",
    },
  ],
};

export const fallbackServices = [
  {
    title: "3D CAD Modeling & Enclosure Design",
    description:
      "Detailed SolidWorks modeling for enclosures, assemblies, mechanisms, and product-grade housings ready for prototyping.",
    icon: "lightning-bolt",
  },
  {
    title: "Engineering Consulting & Problem Solving",
    description:
      "Technical guidance, feasibility evaluations, mechanism troubleshooting, and prototype optimization for early-stage products.",
    icon: "chip",
  },
  {
    title: "Full Turnkey Product Development",
    description:
      "End-to-end engineering support. From concept and design to electronics, firmware, and a fully working prototype. A complete solution handled in-house.",
    icon: "ruler",
  },
  {
    title: "Custom PCB Development",
    description:
      "Design and development of small-scale printed circuit boards for prototypes, sensor modules, control systems, and embedded devices.",
    icon: "pcb",
  },
  {
    title: "Electronics Integration",
    description:
      "Seamless integration of sensors, motors, actuators, displays, and control boards into complete electromechanical systems, even without mass-production electronics.",
    icon: "cube",
  },
  {
    title: "Rapid Prototyping",
    description:
      "Fast, functional prototypes using 3D printing, CNC machining, and modular electronics. From concept to working model in months, not years.",
    icon: "triangle-ruler",
  },
];

export const fallbackProjects = [
  {
    title: "Smart Kitchen Appliance",
    description:
      "A compact, IoT-enabled kitchen appliance designed for modern consumers.",
    slug: "smart-kitchen-appliance",
    image: "https://picsum.photos/1200/800?random=3",
    category: "Consumer Product",
    technologies: ["SolidWorks", "FEA Analysis", "3D Printing"],
    featured: true,
  },
  {
    title: "Medical Device Prototype",
    description:
      "FDA-compliant prototype for a novel medical diagnostic device.",
    slug: "medical-device",
    image: "https://picsum.photos/1200/800?random=4",
    category: "Medical",
    technologies: ["Biocompatible Materials", "CNC Machining"],
    featured: true,
  },
  {
    title: "Industrial Automation Component",
    description:
      "Custom-designed component for manufacturing automation system.",
    slug: "industrial-automation",
    image: "https://picsum.photos/1200/800?random=5",
    category: "Industrial",
    technologies: ["SolidWorks", "Metal 3D Printing"],
    featured: true,
  },
];

export const fallbackTestimonials = [
  {
    quote:
      "YK Innovations transformed our concept into a production-ready prototype in record time. Their expertise in DFM saved us thousands in manufacturing costs.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechStart Inc.",
  },
  {
    quote:
      "The team's attention to detail and engineering expertise is exceptional. They helped us navigate complex FDA requirements for our medical device.",
    author: "Dr. Michael Rodriguez",
    role: "Founder",
    company: "MedTech Solutions",
  },
  {
    quote:
      "From initial CAD designs to functional prototypes, YK Innovations delivered quality work on schedule. Highly recommended!",
    author: "Jennifer Williams",
    role: "Product Manager",
    company: "Consumer Goods Co.",
  },
];
