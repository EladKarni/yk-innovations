import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "YK Innovations brought our product concept to life with exceptional engineering expertise. Their prototypes were instrumental in securing our Series A funding, and their attention to manufacturability saved us significant time in tooling.",
    author: "David Martinez",
    role: "Founder & CEO",
    company: "InnovateTech Manufacturing",
  },
  {
    quote: "The attention to detail in their CAD models and DFM analysis saved us significant costs in tooling modifications. Their prototypes performed flawlessly in certification testing, helping us get FDA clearance faster than expected.",
    author: "Jennifer Wang",
    role: "VP of Product Development",
    company: "MedDevice Solutions",
  },
  {
    quote: "From initial concept to production-ready design, their mechanical engineering support was outstanding. The functional prototypes exceeded our quality expectations and helped us identify design improvements early in the process.",
    author: "Robert Thompson",
    role: "Director of Engineering",
    company: "Apex Industrial Systems",
  },
];

const TestimonialsSection: FC<TestimonialsSectionProps> = ({
  title = "Client Testimonials",
  subtitle = "What Our Clients Say",
  testimonials = defaultTestimonials,
}) => {
  return (
    <SectionContainer sectionName="testimonials" background="base">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            className="bg-white/60 dark:bg-base-200/60 backdrop-blur-sm border border-gray-300 dark:border-base-300 rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Quote Icon */}
            <svg
              className="w-10 h-10 text-primary/20 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Quote */}
            <p className="text-base-content/80 text-lg leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {testimonial.avatar ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
              )}

              <div>
                <div className="font-semibold text-base-content">
                  {testimonial.author}
                </div>
                <div className="text-sm text-base-content/60">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
};

export default TestimonialsSection;
