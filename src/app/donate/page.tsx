'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { donateContent } from '@/content/donate';
import { PaymentProvider } from '@/components/ui/PaymentProvider';
import { RouteLine } from '@/components/ui/RouteLine';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ShieldCheck, Heart, Building, Check, Copy, Sparkles, Award } from 'lucide-react';

export default function DonatePage() {
  const [selectedTierAmount, setSelectedTierAmount] = useState<number | string>(
    donateContent.tiers[2].amount // Default 2500
  );

  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSelectTier = (amount: number) => {
    setSelectedTierAmount(amount);
    setIsCustomActive(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setSelectedTierAmount(val ? Number(val) : '');
    setIsCustomActive(true);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 sm:space-y-14 pb-20 md:pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={donateContent.bannerImage}
          alt="Sangati Foundation donate banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-3 sm:space-y-4">
          <ScrollReveal variant="fade-down">
            <span className="font-mono text-[10px] sm:text-xs font-bold bg-marigold text-ink px-3.5 py-1 rounded-full uppercase tracking-wider inline-block shadow-2xs">
              80G TAX EXEMPTION RECEIPT ELIGIBLE
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-display tracking-tight text-field">
              {donateContent.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-sm sm:text-lg md:text-xl font-body text-field/90 max-w-2xl">
              {donateContent.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 80G RECEIPT NOTICE */}
      <section className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="fade-up">
          <div className="bg-white border border-road/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-4 text-ink shadow-md">
            <div className="p-3 bg-road/10 border border-road/20 rounded-2xl shrink-0">
              <ShieldCheck className="w-8 h-8 text-road" aria-hidden="true" />
            </div>
            <div className="space-y-1 text-sm font-body text-center md:text-left">
              <strong className="font-mono text-xs text-road uppercase font-bold block">
                50% TAX DEDUCTIBLE CONTRIBUTION (REGISTERED 80G TRUST):
              </strong>
              <p className="text-ink/90 leading-relaxed font-medium">
                {donateContent.taxInfo}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* DONATION TIERS & CHECKOUT SECTION */}
      <section className="max-w-5xl mx-auto px-4 space-y-8" aria-labelledby="donation-tiers-heading">
        <ScrollReveal variant="fade-up">
          <div className="border-b border-road/20 pb-4">
            <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
              CHOOSE CONTRIBUTION AMOUNT
            </span>
            <h2 id="donation-tiers-heading" className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Select Your Donation Tier
            </h2>
          </div>
        </ScrollReveal>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="group" aria-label="Donation amount options">
          {donateContent.tiers.map((tier, idx) => {
            const isSelected = !isCustomActive && selectedTierAmount === tier.amount;
            return (
              <ScrollReveal key={tier.amount} variant="fade-up" delay={idx * 100}>
                <button
                  type="button"
                  onClick={() => handleSelectTier(tier.amount)}
                  aria-pressed={isSelected}
                  className={`w-full p-5 sm:p-6 rounded-3xl text-left flex flex-col justify-between space-y-4 transition-all duration-300 min-h-[44px] cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-clay to-road text-field ring-4 ring-marigold/60 scale-105 shadow-xl border-transparent'
                      : 'bg-white text-ink border border-road/20 hover:bg-mist/50 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-black text-2xl sm:text-3xl">{tier.label}</span>
                      {tier.isPopular && (
                        <span className="font-mono text-[9px] bg-marigold text-ink px-2 py-0.5 font-extrabold rounded-full border border-marigold/40">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className={`text-xs font-body leading-relaxed ${isSelected ? 'text-field/90' : 'text-ink/80'}`}>
                      {tier.fundsDescription}
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider">
                    {isSelected ? '✓ Selected' : 'Select Tier →'}
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="bg-white border border-road/20 rounded-3xl p-5 sm:p-6 space-y-3 shadow-sm">
            <label htmlFor="custom-amount" className="block font-mono text-xs font-bold uppercase text-ink">
              Or Enter Custom Amount (₹ INR):
            </label>
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-2xl text-road">₹</span>
              <input
                type="number"
                id="custom-amount"
                min="100"
                placeholder="e.g. 10000"
                value={customAmount}
                onChange={handleCustomChange}
                className="flex-1 p-3.5 min-h-[44px] bg-mist/40 border border-road/20 rounded-2xl text-xl font-bold font-mono focus:outline-none focus:ring-2 focus:ring-road text-ink"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Payment Gateway Component */}
        <ScrollReveal variant="zoom-in" delay={300}>
          <PaymentProvider selectedAmount={selectedTierAmount} />
        </ScrollReveal>
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* DIRECT BANK TRANSFER DETAILS */}
      <section className="max-w-5xl mx-auto px-4" aria-labelledby="bank-details-heading">
        <ScrollReveal variant="fade-up">
          <div className="bg-white border border-road/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-road/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-road/10 border border-road/20 rounded-2xl">
                  <Building className="w-6 h-6 text-road" aria-hidden="true" />
                </div>
                <h2 id="bank-details-heading" className="text-xl sm:text-2xl font-bold font-display text-ink">
                  Direct Bank & NEFT / RTGS Transfer Details
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
              <div className="p-4 bg-mist/30 border border-road/15 rounded-2xl space-y-1">
                <span className="text-xs text-road font-bold block uppercase">ACCOUNT NAME:</span>
                <span className="font-bold text-ink text-sm sm:text-base">{donateContent.bankDetails.accountName}</span>
              </div>

              <div className="p-4 bg-mist/30 border border-road/15 rounded-2xl space-y-1">
                <span className="text-xs text-road font-bold block uppercase">BANK NAME:</span>
                <span className="font-bold text-ink text-sm sm:text-base">{donateContent.bankDetails.bankName}</span>
              </div>

              <div className="p-4 bg-mist/30 border border-road/15 rounded-2xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-road font-bold block uppercase">ACCOUNT NUMBER:</span>
                  <span className="font-bold text-ink text-sm sm:text-base">{donateContent.bankDetails.accountNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(donateContent.bankDetails.accountNumber, 'acc')}
                  className="p-2 bg-white border border-road/20 rounded-xl hover:bg-mist cursor-pointer"
                  title="Copy Account Number"
                >
                  {copiedField === 'acc' ? <Check className="w-4 h-4 text-road" /> : <Copy className="w-4 h-4 text-road" />}
                </button>
              </div>

              <div className="p-4 bg-mist/30 border border-road/15 rounded-2xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-road font-bold block uppercase">IFSC CODE:</span>
                  <span className="font-bold text-ink text-sm sm:text-base">{donateContent.bankDetails.ifscCode}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(donateContent.bankDetails.ifscCode, 'ifsc')}
                  className="p-2 bg-white border border-road/20 rounded-xl hover:bg-mist cursor-pointer"
                  title="Copy IFSC Code"
                >
                  {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-road" /> : <Copy className="w-4 h-4 text-road" />}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
