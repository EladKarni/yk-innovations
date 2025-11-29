import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import type { TestimonialsSectionProps } from "@/types";

const TestimonialsSection: FC<TestimonialsSectionProps> = ({ data }) => {
  return (
    <SectionContainer sectionName="testimonials" background="base">
      <SectionHeader title="Client Testimonials" subtitle="What Our Clients Say" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((testimonial, index) => (
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
              &ldquo;{testimonial.quote}&rdquo;
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
