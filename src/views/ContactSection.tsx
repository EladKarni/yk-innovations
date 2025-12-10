"use client";

import { FC } from "react";
import SectionContainer from "@/ui/SectionContainer";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/ui/CTAButton";
import FormField from "@/ui/FormField";
import FormAlert from "@/ui/FormAlert";
import ContactInfo from "@/components/ContactInfo";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactSectionProps } from "@/types";

const ContactSection: FC<ContactSectionProps> = ({
  contactData,
  companyInfo,
}) => {
  const { formData, status, errorMessage, handleSubmit, handleChange } = useContactForm();

  // Extract contact form data with fallbacks
  const title = contactData?.title || "Get in Touch";
  const nameLabel = contactData?.nameLabel || "Name";
  const namePlaceholder = contactData?.namePlaceholder || "Your name";
  const emailLabel = contactData?.emailLabel || "Email";
  const emailPlaceholder = contactData?.emailPlaceholder || "your@email.com";
  const messageLabel = contactData?.messageLabel || "Message";
  const messagePlaceholder = contactData?.messagePlaceholder || "Your message";
  const submitButtonText = contactData?.submitButtonText || "Send Message";
  const phone = companyInfo?.phone || "+1 (234) 567-890";

  return (
    <SectionContainer sectionName="contact" background="base">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title={title}
          subtitle="Contact Us"
          alignment="center"
          className="mb-12"
        />
        <p className="text-lg text-base-content/70 text-center mb-12">
          Have a product concept you want to develop? Let&apos;s discuss how we can help transform your idea into a functional prototype.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/60 dark:bg-base-200/60 backdrop-blur-sm border border-gray-300 dark:border-base-300 rounded-lg p-8">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden input for Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />

              {/* Honeypot field for spam protection */}
              <div style={{ display: "none" }}>
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </div>

              <FormField
                id="name"
                name="name"
                label={nameLabel}
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={namePlaceholder}
              />

              <FormField
                id="email"
                name="email"
                label={emailLabel}
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={emailPlaceholder}
              />

              <FormField
                id="phone"
                name="phone"
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={phone}
              />

              <FormField
                id="message"
                name="message"
                label={messageLabel}
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={messagePlaceholder}
                rows={5}
              />

              {status === "success" && (
                <FormAlert
                  type="success"
                  message="Thank you! We'll get back to you soon."
                />
              )}

              {status === "error" && (
                <FormAlert
                  type="error"
                  message={errorMessage || "Something went wrong. Please try again."}
                />
              )}

              <CTAButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={status === "loading"}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : submitButtonText}
              </CTAButton>
            </form>
          </div>

          {/* Contact Info */}
          <ContactInfo companyInfo={companyInfo} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
