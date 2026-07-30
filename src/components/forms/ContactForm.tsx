'use client';

import React, { useState } from 'react';
import { contactContent } from '@/content/contact';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';

interface ContactFormProps {
  formType?: 'general' | 'volunteer' | 'partner';
}

export const ContactForm: React.FC<ContactFormProps> = ({ formType = 'general' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: contactContent.formOptions[0],
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message or query.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (validate()) {
      setIsSubmitted(true);
      setStatusMessage(
        'Thank you! Your message has been received. Our team will get back to you within 24–48 hours.'
      );
    } else {
      setStatusMessage('Please fix the errors indicated below before submitting.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-field border-2 border-ink p-6 md:p-8 space-y-6"
      aria-label="Contact and Inquiry Form"
    >
      <div className="border-b-2 border-ink pb-4">
        <h2 className="text-2xl font-bold font-display text-ink">Send Us a Message</h2>
        <p className="text-sm font-body text-ink/80">
          Have a question about accessibility, training, or volunteering? Fill out the form below.
        </p>
      </div>

      {/* Dynamic Screen Reader Live Region for Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="contact-form-live-status"
      >
        {statusMessage}
      </div>

      {statusMessage && (
        <div
          className={`p-4 border-2 border-ink flex items-start gap-3 text-sm font-semibold ${
            isSubmitted ? 'bg-road text-field' : 'bg-clay text-field'
          }`}
          role="alert"
        >
          {isSubmitted ? (
            <CheckCircle2 className="w-5 h-5 text-marigold shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-5 h-5 text-marigold shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="contact-name" className="block text-sm font-bold font-mono uppercase text-ink">
          Full Name <span className="text-clay" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={`w-full p-3 min-h-[44px] bg-field text-ink border-2 ${
            errors.name ? 'border-clay font-bold' : 'border-ink'
          } focus-visible:outline-road`}
          placeholder="e.g. Alka Asthana"
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs font-mono font-bold text-clay flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>ERROR: {errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="contact-email" className="block text-sm font-bold font-mono uppercase text-ink">
          Email Address <span className="text-clay" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={`w-full p-3 min-h-[44px] bg-field text-ink border-2 ${
            errors.email ? 'border-clay font-bold' : 'border-ink'
          } focus-visible:outline-road`}
          placeholder="e.g. alka@example.com"
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs font-mono font-bold text-clay flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>ERROR: {errors.email}</span>
          </p>
        )}
      </div>

      {/* Phone Input */}
      <div className="space-y-2">
        <label htmlFor="contact-phone" className="block text-sm font-bold font-mono uppercase text-ink">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 min-h-[44px] bg-field text-ink border-2 border-ink focus-visible:outline-road"
          placeholder="e.g. +91 98765 43210"
        />
      </div>

      {/* Purpose Select */}
      <div className="space-y-2">
        <label htmlFor="contact-purpose" className="block text-sm font-bold font-mono uppercase text-ink">
          How Can We Help? <span className="text-clay" aria-hidden="true">*</span>
        </label>
        <select
          id="contact-purpose"
          name="purpose"
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="w-full p-3 min-h-[44px] bg-field text-ink border-2 border-ink focus-visible:outline-road font-body font-bold"
        >
          {contactContent.formOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-bold font-mono uppercase text-ink">
          Your Message <span className="text-clay" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`w-full p-3 bg-field text-ink border-2 ${
            errors.message ? 'border-clay font-bold' : 'border-ink'
          } focus-visible:outline-road`}
          placeholder="Please describe how we can assist you or collaborate..."
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs font-mono font-bold text-clay flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>ERROR: {errors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-road text-field border-2 border-ink py-4 rounded-full font-bold text-lg hover:bg-marigold hover:text-ink transition-colors min-h-[44px] flex items-center justify-center gap-2 focus-visible:outline-marigold"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
        <span>Submit Message</span>
      </button>
    </form>
  );
};
