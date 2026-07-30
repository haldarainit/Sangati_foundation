import React from 'react';
import Image from 'next/image';
import { getInvolvedContent } from '@/content/getInvolved';
import { RouteLine } from '@/components/ui/RouteLine';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactForm } from '@/components/forms/ContactForm';
import { UserCheck, Building2, PackageCheck, CheckCircle2, Heart } from 'lucide-react';

export const metadata = {
  title: 'Get Involved | Sangati Foundation',
  description:
    'Volunteer, partner, or donate-in-kind to support accessibility and mobility for persons with disability.',
};

export default function GetInvolvedPage() {
  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={getInvolvedContent.bannerImage}
          alt="Sangati Foundation volunteers and community partners"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              VOLUNTEER • PARTNER • DONATE IN KIND
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              {getInvolvedContent.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              {getInvolvedContent.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3 WAYS TO GET INVOLVED CARDS */}
      <section className="max-w-7xl mx-auto px-4 space-y-8" aria-labelledby="get-involved-options-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-4">
            <h2 id="get-involved-options-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Ways You Can Contribute
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. Volunteer */}
          <ScrollReveal variant="fade-up" delay={100}>
            <article className="border border-road/20 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-road text-field rounded-2xl">
                    <UserCheck className="w-6 h-6 text-marigold" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">
                    1. Volunteer
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-body text-ink/80 leading-relaxed">
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

              <Button href="#apply-form" variant="road" className="w-full rounded-full">
                <span>Apply to Volunteer</span>
              </Button>
            </article>
          </ScrollReveal>

          {/* 2. Partner */}
          <ScrollReveal variant="fade-up" delay={200}>
            <article className="border border-road/20 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-marigold text-ink rounded-2xl">
                    <Building2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">
                    2. Corporate Partner
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-body text-ink/80 leading-relaxed">
                  {getInvolvedContent.sections[1].description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs font-bold text-road uppercase">CSR & IMPACT AREAS:</span>
                  <ul className="space-y-2 text-xs font-body">
                    {getInvolvedContent.sections[1].opportunities?.map((opp, i) => (
                      <li key={i} className="flex items-start gap-2 text-ink/90">
                        <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="#apply-form" variant="clay" className="w-full rounded-full">
                <span>Explore CSR Partnership</span>
              </Button>
            </article>
          </ScrollReveal>

          {/* 3. Donate in Kind */}
          <ScrollReveal variant="fade-up" delay={300}>
            <article className="border border-road/20 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-ink text-marigold rounded-2xl">
                    <PackageCheck className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-ink">
                    3. Donate-in-Kind
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-body text-ink/80 leading-relaxed">
                  {getInvolvedContent.sections[2].description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs font-bold text-road uppercase">ACCEPTED ITEMS:</span>
                  <ul className="space-y-2 text-xs font-body">
                    {getInvolvedContent.sections[2].opportunities?.map((opp, i) => (
                      <li key={i} className="flex items-start gap-2 text-ink/90">
                        <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="#apply-form" variant="marigold" className="w-full rounded-full">
                <span>Inquire In-Kind Donation</span>
              </Button>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="apply-form" className="max-w-4xl mx-auto px-4">
        <ScrollReveal variant="zoom-in">
          <div className="bg-white border border-road/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink text-center">
              Submit Your Volunteer or Partnership Interest
            </h2>
            <ContactForm formType="volunteer" />
          </div>
        </ScrollReveal>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>
    </div>
  );
}
