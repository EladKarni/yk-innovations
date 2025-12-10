import { FC } from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import type { CompanyInfo } from "@/types";

export interface ContactInfoProps {
  companyInfo?: CompanyInfo;
}

const ContactInfo: FC<ContactInfoProps> = ({ companyInfo }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-base-content mb-6">Let&apos;s Connect</h3>
        <p className="text-base-content/70 leading-relaxed mb-6">
          We&apos;re always excited to hear about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.
        </p>
      </div>

      {companyInfo?.socialMedia && (
        <div>
          <div className="font-semibold text-base-content mb-4">Follow Us</div>
          <SocialMediaLinks socialMedia={companyInfo.socialMedia} />
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
