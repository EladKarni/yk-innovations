import { FC } from "react";
import type { SectionHeaderProps } from "@/types";

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  alignment = "center",
  className = "",
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-16 ${alignmentClasses[alignment]} ${className}`}>
      {subtitle && (
        <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
