import Link from "next/link";
import { FC, ReactNode } from "react";
import clsx from "clsx";

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CTAButton: FC<CTAButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  className,
  type = "button",
}) => {
  const baseClasses = clsx(
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
    {
      // Variants
      "bg-primary text-primary-content hover:brightness-110 shadow-md hover:shadow-lg":
        variant === "primary",
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-content":
        variant === "ghost",
      "bg-secondary text-secondary-content hover:brightness-110 shadow-md hover:shadow-lg":
        variant === "secondary",
      // Sizes
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    },
    className
  );

  const content = (
    <>
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && icon && <span>{icon}</span>}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

export default CTAButton;
