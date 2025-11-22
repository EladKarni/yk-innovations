import { FC, ReactNode } from "react";
import clsx from "clsx";

interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
  variant?: "default" | "glass" | "bordered";
  className?: string;
}

const IconCard: FC<IconCardProps> = ({
  icon,
  title,
  description,
  link,
  variant = "default",
  className,
}) => {
  const cardClasses = clsx(
    "group p-6 md:p-8 rounded-lg transition-all duration-300 hover:-translate-y-1",
    {
      "bg-base-100 hover:shadow-lg": variant === "default",
      "bg-white/60 dark:bg-base-200/60 backdrop-blur-sm border border-gray-300 dark:border-base-300 hover:shadow-xl":
        variant === "glass",
      "bg-base-100 border-2 border-base-300 hover:border-primary hover:shadow-lg":
        variant === "bordered",
    },
    className
  );

  const CardContent = () => (
    <>
      {/* Icon */}
      <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-base-content mb-3 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base-content/70 leading-relaxed mb-4">
        {description}
      </p>

      {/* Link */}
      {link && (
        <div className="flex items-center text-primary font-semibold text-sm mt-4 group-hover:gap-2 transition-all duration-300">
          <span>{link.text}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <a href={link.href} className={cardClasses}>
        <CardContent />
      </a>
    );
  }

  return (
    <div className={cardClasses}>
      <CardContent />
    </div>
  );
};

export default IconCard;
