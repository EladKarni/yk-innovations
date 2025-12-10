import { FC } from "react";
import { LinkedInIcon, InstagramIcon, GithubIcon, TwitterIcon } from "./icons";

export interface SocialMediaLinksProps {
  socialMedia?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  className?: string;
}

const SocialMediaLinks: FC<SocialMediaLinksProps> = ({ socialMedia, className = "" }) => {
  if (!socialMedia) return null;

  const links = [
    { url: socialMedia.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
    { url: socialMedia.instagram, icon: InstagramIcon, label: "Instagram" },
    { url: socialMedia.github, icon: GithubIcon, label: "GitHub" },
    { url: socialMedia.twitter, icon: TwitterIcon, label: "Twitter" },
  ];

  const visibleLinks = links.filter(link => link.url);

  if (visibleLinks.length === 0) return null;

  return (
    <div className={`flex gap-4 ${className}`}>
      {visibleLinks.map(({ url, icon: Icon, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-base-200 hover:bg-primary hover:text-primary-content rounded-lg flex items-center justify-center transition-all duration-200"
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
