import React from 'react';
import Image from 'next/image';
import { getInvolvedContent } from '@/content/getInvolved';
import { RouteLine } from '@/components/ui/RouteLine';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { UserCheck, Building2, PackageCheck, CheckCircle2, Heart } from 'lucide-react';

export const metadata = {
  title: 'Get Involved | Sangati Foundation',
  description:
    'Volunteer, partner, or donate-in-kind to support accessibility and mobility for persons with disability.',
};

export default function GetInvolvedPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[320px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={getInvolvedContent.bannerImage}
          alt="Sangati Foundation volunteers and community partners"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            VOLUNTEER • PARTNER • DONATE IN KIND
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {getInvolvedContent.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            {getInvolvedContent.subtitle}
          </p>
        </div>
      </section>

      {/* 3 WAYS TO GET INVOLVED CARDS */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="get-involved-options-heading">
        <div className="border-b-2 border-ink pb-4">
          <h2 id="get-involved-options-heading" className="text-3xl font-bold font-display text-ink">
            Ways You Can Contribute
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. Volunteer */}
          <article className="border-2 border-ink bg-field p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-road text-field border-2 border-ink">
                  <UserCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-display text-ink">
                  1. Volunteer
                </h3>
              </div>

              <p className="text-sm font-body text-ink/80 leading-relaxed">
                {getInvolvedContent.sections[0].description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs font-bold text-road uppercase">OPPORTUNITIES:</span>
                <ul className="space-y-2 text-xs font-body">
                  {getInvolvedContent.sections[0].opportunities?.map((opp, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink/90">
                      <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button href="#apply-form" variant="road" className="w-full">
              <span>Apply to Volunteer</span>
            </Button>
          </article>

          {/* 2. Partner */}
          <article className="border-2 border-ink bg-mist p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-marigold text-ink border-2 border-ink">
                  <Building2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-display text-ink">
                  2. Corporate Partner
                </h3>
              </div>

              <p className="text-sm font-body text-ink/80 leading-relaxed">
                {getInvolvedContent.sections[1].description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs font-bold text-road uppercase">PARTNERSHIP BENEFITS:</span>
                <ul className="space-y-2 text-xs font-body">
                  {getInvolvedContent.sections[1].benefits?.map((ben, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink/90">
                      <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button href="#apply-form" variant="marigold" className="w-full">
              <span>Explore Partnership</span>
            </Button>
          </article>

          {/* 3. Donate-in-Kind */}
          <article className="border-2 border-ink bg-field p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-clay text-field border-2 border-ink">
                  <PackageCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-display text-ink">
                  3. Donate-in-Kind
                </h3>
              </div>

              <p className="text-sm font-body text-ink/80 leading-relaxed">
                {getInvolvedContent.sections[2].description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs font-bold text-road uppercase">NEEDED ITEMS:</span>
                <ul className="space-y-2 text-xs font-body">
                  {getInvolvedContent.sections[2].acceptedItems?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink/90">
                      <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button href="#apply-form" variant="clay" className="w-full">
              <span>Donate Equipment</span>
            </Button>
          </article>
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* SUBMISSION FORM SECTION */}
      <section id="apply-form" className="max-w-4xl mx-auto px-4">
        <ContactForm />
      </section>
    </div>
  );
}
