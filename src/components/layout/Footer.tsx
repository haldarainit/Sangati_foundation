'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { organizationInfo } from '@/content/organization';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-ink text-field border-t-4 border-marigold mt-16 font-body">
      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: About & Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-marigold/60 bg-white shrink-0">
              <Image
                src="/sangati-logo.jpg"
                alt="Sangati Foundation Logo"
                fill
                sizes="40px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-display tracking-tight text-marigold">
                  SANGATI
                </span>
                <span className="text-xs font-mono bg-marigold text-ink px-2 py-0.5 font-bold rounded-full">
                  FOUNDATION
                </span>
              </div>
              <span className="text-xs font-semibold font-sans text-marigold/90 tracking-wide pt-0.5">
                Empowering Persons with Disability
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-field/90 font-sans">
            {organizationInfo.missionLine}
          </p>
          <div className="p-3 border-2 border-road bg-road/20 text-xs font-mono space-y-1">
            <div className="text-marigold font-bold">Registered Charitable Trust</div>
            <div>Established: 14 February 2019</div>
            <div>Founder: {organizationInfo.founder}</div>
            <div>Lead Author: {organizationInfo.leadAuthor}</div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3 font-sans">
          <h2 className="text-base font-bold font-mono text-marigold uppercase tracking-wider border-b border-field/20 pb-2">
            Navigation
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                Home Page
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                About Us & Founding Story
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                Overview of 6 Programmes
              </Link>
            </li>
            <li>
              <Link href="/yatra" className="hover:text-marigold underline min-h-[44px] inline-flex items-center font-bold text-marigold">
                Sangati Yatra 2024–25 (6,500 km Drive)
              </Link>
            </li>
            <li>
              <Link href="/impact" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                Impact Numbers & Timeline
              </Link>
            </li>
            <li>
              <Link href="/stories" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                Inspirational Stories
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                News & Events Archive
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Get Involved & Support */}
        <div className="space-y-3 font-sans">
          <h2 className="text-base font-bold font-mono text-marigold uppercase tracking-wider border-b border-field/20 pb-2">
            Get Involved & Legal
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/get-involved" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                Volunteer or Partner With Us
              </Link>
            </li>
            <li>
              <Link href="/donate" className="hover:text-marigold underline min-h-[44px] inline-flex items-center text-clay font-bold">
                Donate Online (Tax Receipt Provided)
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-marigold underline min-h-[44px] inline-flex items-center">
                Contact & Centre Locations
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="/accessibility"
                className="bg-marigold text-ink p-2.5 font-bold font-mono text-xs flex items-center gap-2 border border-field hover:bg-field hover:text-ink transition-colors min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4 text-ink" aria-hidden="true" />
                <span>Accessibility Statement (WCAG 2.2 AA)</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Address & Connect */}
        <div className="space-y-3 font-sans text-xs">
          <h2 className="text-base font-bold font-mono text-marigold uppercase tracking-wider border-b border-field/20 pb-2">
            Address & Connect
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-field font-bold block text-sm">Main Office:</strong>
                <p className="text-field/80 leading-relaxed">
                  F18/3 Connaught Place<br />
                  Middle Circle<br />
                  New Delhi – 110001
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-field/20 space-y-1 font-mono text-xs">
            <div>Twitter/X: <a href="https://twitter.com/thesangati" target="_blank" rel="noopener noreferrer" className="underline text-marigold hover:text-field">@thesangati</a></div>
            <div>Blog: <a href={`https://${organizationInfo.existingSite}`} target="_blank" rel="noopener noreferrer" className="underline text-marigold hover:text-field">{organizationInfo.existingSite}</a></div>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Copyright */}
      <div className="border-t border-field/20 py-6 px-4 bg-black/40 text-xs font-mono text-field/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Sangati Foundation. All rights reserved. Registered Charitable Trust under Indian Trust Act.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/accessibility" className="hover:text-marigold underline min-h-[44px] flex items-center">
              Accessibility Policy
            </Link>
            <span>•</span>
            <span>WCAG 2.2 AA Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

