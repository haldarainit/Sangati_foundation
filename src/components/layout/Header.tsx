'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { organizationInfo } from '@/content/organization';
import { programsList } from '@/content/programs';
import { Phone, ChevronDown, Menu, X, Heart, Shield, Eye } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export interface HeaderProps {
  /**
   * Programmes for the navigation menu, supplied by the site layout so the menu
   * follows whatever is in the admin panel. Falls back to the built-in list.
   */
  programs?: { slug: string; title: string; summary: string }[];
}

export const Header: React.FC<HeaderProps> = ({ programs = programsList }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);
  return (
    <header className="w-full bg-field/95 backdrop-blur-md border-b border-road/20 sticky top-0 z-40 shadow-xs">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center group min-h-[44px] focus-visible:outline-road shrink-0 py-1"
          aria-label="Sangati Foundation - Home Page"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-marigold/60 shadow-md shrink-0 bg-white hover:scale-105 transition-transform duration-200">
            <Image
              src="/sangati-logo.jpg"
              alt="Sangati Foundation Official Logo"
              fill
              priority
              sizes="100px"
              className="object-contain p-0.5"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 font-display font-bold text-base"
        >
          <Link
            href="/about"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center ${
              pathname === '/about' ? 'bg-mist border-ink' : ''
            }`}
          >
            About Us
          </Link>

          {/* Mega Menu Trigger: Programmes */}
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              aria-expanded={isMegaMenuOpen}
              aria-controls="programmes-mega-menu"
              className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist flex items-center gap-1 transition-colors min-h-[44px] ${
                pathname.startsWith('/programs') ? 'bg-mist border-ink' : ''
              }`}
            >
              <span>Programmes</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {/* Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div
                id="programmes-mega-menu"
                className="absolute top-full left-0 w-[580px] bg-field border-2 border-ink shadow-2xl p-4 grid grid-cols-2 gap-3 z-50 mt-1"
                role="region"
                aria-label="Programmes Submenu"
              >
                <div className="col-span-2 border-b-2 border-ink pb-2 mb-1 flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-road uppercase tracking-wider">
                    Our 6 Core Programmes
                  </span>
                  <Link
                    href="/programs"
                    className="text-xs font-mono underline hover:text-marigold"
                    onClick={() => setIsMegaMenuOpen(false)}
                  >
                    View All Overview →
                  </Link>
                </div>

                {programs.filter((prog) => prog.slug !== 'mobility').map((prog) => (
                  <Link
                    key={prog.slug}
                    href={`/programs/${prog.slug}`}
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="p-3 border-2 border-ink hover:bg-road hover:text-field transition-all group/item block"
                  >
                    <div className="font-bold text-sm group-hover/item:text-marigold">
                      {prog.title}
                    </div>
                    <div className="text-xs text-ink/70 group-hover/item:text-field line-clamp-2 mt-0.5 font-body">
                      {prog.summary}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/yatra"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center font-bold text-road ${
              pathname === '/yatra' ? 'bg-mist border-ink' : ''
            }`}
          >
            Yatra 2024–25
          </Link>

          <Link
            href="/impact"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center ${
              pathname === '/impact' ? 'bg-mist border-ink' : ''
            }`}
          >
            Impact
          </Link>

          <Link
            href="/stories"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center ${
              pathname === '/stories' ? 'bg-mist border-ink' : ''
            }`}
          >
            Stories
          </Link>

          <Link
            href="/news"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center font-bold text-clay ${
              pathname === '/news' || pathname === '/films' ? 'bg-mist border-ink' : ''
            }`}
          >
            Films
          </Link>

          <Link
            href="/get-involved"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center ${
              pathname === '/get-involved' ? 'bg-mist border-ink' : ''
            }`}
          >
            Get Involved
          </Link>

          <Link
            href="/contact"
            className={`px-3 py-2 border-2 border-transparent hover:border-ink hover:bg-mist transition-colors min-h-[44px] flex items-center ${
              pathname === '/contact' ? 'bg-mist border-ink' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="lg:hidden p-2 border-2 border-ink bg-mist text-ink min-h-[44px] min-w-[44px] flex items-center justify-center font-bold"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden bg-field border-t-2 border-ink px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto"
        >
          {/* Mobile Quick Accessibility Bar */}
          <div className="flex items-center justify-end gap-2 p-2 bg-ink text-field border-2 border-ink font-mono text-xs mb-2">
            <Link
              href="/accessibility"
              onClick={() => setIsMobileMenuOpen(false)}
              className="underline text-field hover:text-marigold"
            >
              Accessibility Statement
            </Link>
          </div>

          <div className="space-y-2 border-b-2 border-ink pb-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink bg-mist text-lg"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              About Us
            </Link>
            <Link
              href="/programs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              All Programmes Grid
            </Link>

            <div className="pl-4 space-y-1.5 border-l-4 border-road my-2">
              <span className="block font-mono text-xs text-road font-bold uppercase">
                Specific Programmes
              </span>
              {programs.filter((prog) => prog.slug !== 'mobility').map((prog) => (
                <Link
                  key={prog.slug}
                  href={`/programs/${prog.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-sm font-semibold hover:bg-mist border-b border-ink/10"
                >
                  → {prog.title}
                </Link>
              ))}
            </div>

            <Link
              href="/yatra"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink bg-road text-field text-lg"
            >
              Sangati Yatra 2024–25
            </Link>
            <Link
              href="/impact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              Impact & Timeline
            </Link>
            <Link
              href="/stories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              Inspirational Stories
            </Link>
            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              Films & Video Documentaries
            </Link>
            <Link
              href="/get-involved"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              Get Involved (Volunteer / Partner)
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-3 font-bold border-2 border-ink hover:bg-mist text-lg"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

