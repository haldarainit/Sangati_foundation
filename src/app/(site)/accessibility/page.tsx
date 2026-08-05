import React from 'react';
import { accessibilityContent } from '@/content/accessibility';
import { RouteLine } from '@/components/ui/RouteLine';
import { ShieldCheck, CheckCircle2, Phone, Mail, Eye, Type, Zap } from 'lucide-react';

export const metadata = {
  title: 'Accessibility Statement | Sangati Foundation',
  description:
    'Read Sangati Foundation’s official digital accessibility statement, WCAG 2.2 AA / AAA compliance details, and feedback channels.',
};

export default function AccessibilityStatementPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="bg-road text-field border-b-2 border-ink py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase">
              NON-NEGOTIABLE CORE POLICY
            </span>
            <span className="font-mono text-xs font-bold bg-field text-ink px-3 py-1 border border-ink uppercase">
              WCAG 2.2 LEVEL AA / AAA
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {accessibilityContent.title}
          </h1>

          <p className="text-lg md:text-xl font-body text-field/90 max-w-3xl">
            {accessibilityContent.subtitle}
          </p>

          <div className="font-mono text-xs text-marigold pt-2">
            Last Updated: {accessibilityContent.lastUpdated} • Target: {accessibilityContent.standards}
          </div>
        </div>
      </section>

      {/* POLICY STATEMENT PARAGRAPHS */}
      <section className="max-w-5xl mx-auto px-4 space-y-6" aria-labelledby="policy-heading">
        <div className="border-b-2 border-ink pb-3">
          <h2 id="policy-heading" className="text-3xl font-bold font-display text-ink">
            Our Accessibility Commitment
          </h2>
        </div>

        <div className="bg-field border-2 border-ink p-8 space-y-4 font-body text-lg text-ink/90 leading-relaxed">
          {accessibilityContent.statementParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* IMPLEMENTED FEATURES GRID */}
      <section className="max-w-5xl mx-auto px-4 space-y-8" aria-labelledby="features-heading">
        <div className="border-b-2 border-ink pb-3">
          <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
            BUILT-IN SPECIFICATIONS
          </span>
          <h2 id="features-heading" className="text-3xl font-bold font-display text-ink">
            Implemented Accessibility Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accessibilityContent.implementedFeatures.map((feat, idx) => (
            <article key={idx} className="border-2 border-ink bg-mist p-6 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-road shrink-0" aria-hidden="true" />
                <h3 className="text-xl font-bold font-display text-ink">{feat.title}</h3>
              </div>
              <p className="text-sm font-body text-ink/80 leading-relaxed">
                {feat.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* FEEDBACK CHANNEL SECTION */}
      <section className="max-w-5xl mx-auto px-4" aria-labelledby="feedback-heading">
        <div className="bg-field border-2 border-ink p-8 md:p-12 space-y-6">
          <div className="border-b-2 border-ink pb-3">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              WE ARE HERE TO HELP
            </span>
            <h2 id="feedback-heading" className="text-3xl font-bold font-display text-ink">
              {accessibilityContent.feedbackChannel.title}
            </h2>
          </div>

          <p className="text-base md:text-lg font-body text-ink/90 leading-relaxed">
            {accessibilityContent.feedbackChannel.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm pt-2">
            <div className="p-4 bg-mist border border-ink space-y-1">
              <span className="text-xs text-road font-bold block">PHONE:</span>
              <a
                href={`tel:${accessibilityContent.feedbackChannel.phone.split(' ')[0]}`}
                className="font-bold text-ink text-base hover:text-road underline"
              >
                {accessibilityContent.feedbackChannel.phone}
              </a>
            </div>

            <div className="p-4 bg-mist border border-ink space-y-1">
              <span className="text-xs text-road font-bold block">ACCESSIBILITY EMAIL:</span>
              <a
                href={`mailto:${accessibilityContent.feedbackChannel.email}`}
                className="font-bold text-ink text-base hover:text-road underline"
              >
                {accessibilityContent.feedbackChannel.email}
              </a>
            </div>
          </div>

          <p className="text-xs font-mono text-ink/70 pt-2 border-t border-ink/10">
            * {accessibilityContent.feedbackChannel.responseWindow}
          </p>
        </div>
      </section>
    </div>
  );
}

