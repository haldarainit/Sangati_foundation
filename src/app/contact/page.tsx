import React from 'react';
import Image from 'next/image';
import { contactContent } from '@/content/contact';
import { ContactForm } from '@/components/forms/ContactForm';
import { RouteLine } from '@/components/ui/RouteLine';
import { Phone, Mail, MapPin, Building, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us & Centres | Sangati Foundation',
  description:
    'Reach Sangati Foundation on our toll-free helpline 1800 102 1622 or visit our centres in Gurgaon, Jodhpur, and Bathri.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={contactContent.bannerImage}
          alt="Sangati Foundation helpline and contact banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            HELPLINE • CENTRES • ENQUIRIES
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {contactContent.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            {contactContent.subtitle}
          </p>
        </div>
      </section>

      {/* HELPLINE BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-road text-field border-2 border-ink p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-xs font-bold text-marigold uppercase tracking-wider block">
              NATIONAL TOLL-FREE DISABILITY HELPLINE
            </span>
            <a
              href={`tel:${contactContent.helpline.replace(/\s+/g, '')}`}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-field hover:text-marigold transition-colors inline-flex items-center gap-3 min-h-[44px] focus-visible:outline-marigold"
            >
              <Phone className="w-8 h-8 text-marigold" aria-hidden="true" />
              <span>{contactContent.helpline}</span>
            </a>
            <p className="text-sm font-body text-field/90 max-w-xl">
              {contactContent.helplineNotice}
            </p>
          </div>

          <div className="bg-mist text-ink border-2 border-ink p-6 text-center space-y-1 font-mono text-xs font-bold min-w-[240px]">
            <Clock className="w-5 h-5 text-road mx-auto mb-1" aria-hidden="true" />
            <div>Operational Hours</div>
            <div className="text-road text-sm">Mon–Sat: 9:00 AM – 6:00 PM IST</div>
          </div>
        </div>
      </section>

      {/* CENTRES & FORM GRID */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10" aria-labelledby="centres-heading">
        {/* Left Column: Centres List */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border-b-2 border-ink pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              OUR PHYSICAL LOCATIONS
            </span>
            <h2 id="centres-heading" className="text-3xl font-bold font-display text-ink">
              Sangati Centres Across India
            </h2>
          </div>

          <div className="space-y-6">
            {contactContent.centres.map((centre) => (
              <article key={centre.city} className="border-2 border-ink bg-field p-6 space-y-3">
                <span className="font-mono text-xs font-bold text-road bg-mist border border-ink px-2 py-0.5 inline-block">
                  {centre.type}
                </span>
                <h3 className="text-xl font-bold font-display text-ink">{centre.city}</h3>
                <p className="text-sm font-body text-ink/80 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-road shrink-0 mt-1" aria-hidden="true" />
                  <span>{centre.address}</span>
                </p>
                <p className="text-xs font-mono text-ink/70 flex items-center gap-2 pt-1 border-t border-ink/10">
                  <Phone className="w-3.5 h-3.5 text-road" aria-hidden="true" />
                  <span>Phone: {centre.phone}</span>
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Accessible Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>
    </div>
  );
}
