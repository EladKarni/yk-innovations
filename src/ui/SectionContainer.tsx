import { cn } from "@/util/utils";
import type { SectionContainerProps } from "@/types";

const SectionContainer = ({
  children,
  sectionName,
  sectionClasses,
  innerContainerClasses,
  isFullWidth,
  background = "none",
  noPadding = false,
}: SectionContainerProps) => {
  const backgroundClasses = {
    none: "",
    base: "bg-base-100",
    alt: "bg-base-200",
    gradient: "bg-gradient-to-b from-base-100 to-base-200",
  };

  return (
    <section
      id={sectionName}
      className={cn(
        "w-full scroll-mt-22",
        !noPadding && "py-8 md:py-24 lg:py-32",
        backgroundClasses[background],
        sectionClasses
      )}
    >
      <div
        className={cn(
          "mx-auto px-4",
          isFullWidth ? "max-w-full" : "max-w-7xl",
          innerContainerClasses
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
