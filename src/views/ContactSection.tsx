"use client";

import { FC, useState } from "react";
import SectionContainer from "@/ui/SectionContainer";
import CTAButton from "@/ui/CTAButton";
import type { ContactSectionProps } from "@/types";

const ContactSection: FC<ContactSectionProps> = ({
  contactData,
  companyInfo,
}) => {
  // Extract contact form data with fallbacks
  const title = contactData?.title || "Get in Touch";
  const nameLabel = contactData?.nameLabel || "Name";
  const namePlaceholder = contactData?.namePlaceholder || "Your name";
  const emailLabel = contactData?.emailLabel || "Email";
  const emailPlaceholder = contactData?.emailPlaceholder || "your@email.com";
  const messageLabel = contactData?.messageLabel || "Message";
  const messagePlaceholder = contactData?.messagePlaceholder || "Your message";
  const submitButtonText = contactData?.submitButtonText || "Send Message";

  // Extract company info with fallbacks
  const email = companyInfo?.email || "contact@ykinnovations.com";
  const phone = companyInfo?.phone || "+1 (234) 567-890";
  const phoneHref = companyInfo?.phoneHref || "tel:+1234567890";
  const street = companyInfo?.address?.street || "123 Business St, Suite 100";
  const cityState = companyInfo?.address?.city && companyInfo?.address?.state
    ? `${companyInfo.address.city}, ${companyInfo.address.state} ${companyInfo.address.zip || ''}`
    : "City, State 12345";
  const githubUrl = companyInfo?.socialMedia?.github || "https://github.com";
  const linkedinUrl = companyInfo?.socialMedia?.linkedin || "https://linkedin.com";
  const instagramUrl = companyInfo?.socialMedia?.instagram || "https://instagram.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      const response = await fetch("__form.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(formData).toString(),
    })

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <SectionContainer sectionName="contact" background="base">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
            {title}
          </h2>
          <p className="text-lg text-base-content/70">
            Have a product concept you want to develop? Let&apos;s discuss how we can help transform your idea into a functional prototype.
          </p>
        </div>

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

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-base-content mb-2">
                  {nameLabel} <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder={namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-base-content mb-2">
                  {emailLabel} <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder={emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-base-content mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder={phone}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-base-content mb-2">
                  {messageLabel} <span className="text-error">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={messagePlaceholder}
                />
              </div>

              {status === "success" && (
                <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg">
                  Thank you! We&apos;ll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg">
                  {errorMessage || "Something went wrong. Please try again."}
                </div>
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
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-base-content mb-6">Let&apos;s Connect</h3>
              <p className="text-base-content/70 leading-relaxed mb-6">
                We&apos;re always excited to hear about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <div className="font-semibold text-base-content mb-4">Follow Us</div>
              <div className="flex gap-4">
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-base-200 hover:bg-primary hover:text-primary-content rounded-lg flex items-center justify-center transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-base-200 hover:bg-primary hover:text-primary-content rounded-lg flex items-center justify-center transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
