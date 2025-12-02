import { cn } from "@/util/utils";
import type { SubtitleTextProps } from "@/types";

const SubtitleText = ({
  children,
  DarkMode,
  sectionClasses,
}: SubtitleTextProps) => {
  return (
    <h2
      className={cn(
        "text-2xl sm:text-xl text-primary-content/80",
        {
          "text-base-200": DarkMode,
        },
        sectionClasses
      )}
    >
      {children}
    </h2>
  );
};

export default SubtitleText;
