import React from 'react';
import Image from 'next/image';
import { contactContent } from '@/content/contact';
import { ContactForm } from '@/components/forms/ContactForm';
import { RouteLine } from '@/components/ui/RouteLine';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Phone, Mail, MapPin, Building, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us & Centres | Sangati Foundation',
  description:
    'Reach Sangati Foundation on 7428769622 or at support@sangati.org, or visit our centres in Gurgaon, Jodhpur, and Bathri.',
};

export default function ContactPage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={contactContent.bannerImage}
          alt="Sangati Foundation contact banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              PHONE • EMAIL • CENTRES
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              {contactContent.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              {contactContent.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* HELPLINE BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-road text-field border border-road/40 rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="font-mono text-xs font-bold text-marigold uppercase tracking-wider block">
                CALL SANGATI FOUNDATION
              </span>
              <a
                href={`tel:${contactContent.helpline.replace(/\s+/g, '')}`}
                className="text-2xl sm:text-4xl md:text-5xl font-black font-mono text-field hover:text-marigold transition-colors inline-flex items-center gap-3 min-h-[44px] focus-visible:outline-marigold"
              >
                <Phone className="w-7 h-7 sm:w-9 sm:h-9 text-marigold animate-pulse" aria-hidden="true" />
                <span>{contactContent.helpline}</span>
              </a>
              <p className="text-xs sm:text-sm font-body text-field/90 max-w-xl">
                {contactContent.helplineNotice}
              </p>
            </div>

            <div className="bg-white/10 text-field border border-white/20 p-5 rounded-2xl text-center space-y-1 font-mono text-xs font-bold min-w-[240px]">
              <Clock className="w-5 h-5 text-marigold mx-auto mb-1" aria-hidden="true" />
              <div>Operational Hours</div>
              <div className="text-marigold text-sm">Mon–Sat: 9:00 AM – 6:00 PM IST</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CENTRES & FORM GRID */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10" aria-labelledby="centres-heading">
        {/* Left Column: Centres List */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <ScrollReveal variant="fade-up">
            <div className="border-b border-road/20 pb-4">
              <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
                OUR PHYSICAL LOCATIONS
              </span>
              <h2 id="centres-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
                Sangati Centres Across India
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4 sm:space-y-6">
            {contactContent.centres.map((centre, index) => (
              <ScrollReveal key={centre.city} variant="fade-up" delay={index * 100}>
                <article className="border border-road/20 bg-white rounded-3xl p-5 sm:p-6 space-y-3 shadow-sm hover:shadow-lg transition-all duration-300">
                  <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-2.5 py-0.5 rounded-full inline-block">
                    {centre.type}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-ink">{centre.city}</h3>
                  <p className="text-xs sm:text-sm font-body text-ink/80 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{centre.address}</span>
                  </p>
                  <p className="text-xs font-mono text-ink/70 flex items-center gap-2 pt-2 border-t border-road/15">
                    <Phone className="w-3.5 h-3.5 text-road" aria-hidden="true" />
                    <span>Phone: {centre.phone}</span>
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="bg-white border border-road/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-ink">
                Send Us a Direct Message
              </h2>
              <ContactForm formType="general" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>
    </div>
  );
}

