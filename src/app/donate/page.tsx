'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { donateContent } from '@/content/donate';
import { PaymentProvider } from '@/components/ui/PaymentProvider';
import { RouteLine } from '@/components/ui/RouteLine';
import { ShieldCheck, Heart, CheckCircle2, Building, CreditCard } from 'lucide-react';

export default function DonatePage() {
  const [selectedTierAmount, setSelectedTierAmount] = useState<number | string>(
    donateContent.tiers[2].amount // Default 2500
  );

  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);

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

  return (
    <div className="space-y-16 pb-16">
      {/* BANNER HEADER */}
      <section className="relative w-full min-h-[340px] md:min-h-[400px] flex items-center bg-ink text-field overflow-hidden">
        <Image
          src={donateContent.bannerImage}
          alt="Sangati Foundation donate banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full space-y-4">
          <span className="font-mono text-xs font-bold bg-marigold text-ink px-3 py-1 border border-ink uppercase tracking-wider inline-block">
            80G TAX EXEMPTION RECEIPT ELIGIBLE
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-field">
            {donateContent.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-field/90 max-w-2xl">
            {donateContent.subtitle}
          </p>
        </div>
      </section>

      {/* 80G RECEIPT NOTICE */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-mist border-2 border-ink p-6 flex flex-col md:flex-row items-center gap-4 text-ink">
          <ShieldCheck className="w-10 h-10 text-road shrink-0" aria-hidden="true" />
          <div className="space-y-1 text-sm font-body">
            <strong className="font-mono text-xs text-road uppercase font-bold block">
              TAX DEDUCTIBLE CONTRIBUTION:
            </strong>
            <p className="text-ink/90 leading-relaxed font-semibold">
              {donateContent.taxInfo}
            </p>
          </div>
        </div>
      </section>

      {/* DONATION TIERS & CHECKOUT SECTION */}
      <section className="max-w-5xl mx-auto px-4 space-y-10" aria-labelledby="donation-tiers-heading">
        <div className="border-b-2 border-ink pb-4">
          <span className="font-mono text-xs font-bold text-road uppercase tracking-wider block">
            CHOOSE CONTRIBUTION AMOUNT
          </span>
          <h2 id="donation-tiers-heading" className="text-3xl font-bold font-display text-ink">
            Select Your Donation Tier
          </h2>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="group" aria-label="Donation amount options">
          {donateContent.tiers.map((tier) => {
            const isSelected = !isCustomActive && selectedTierAmount === tier.amount;
            return (
              <button
                key={tier.amount}
                type="button"
                onClick={() => handleSelectTier(tier.amount)}
                aria-pressed={isSelected}
                className={`p-6 border-2 border-ink text-left flex flex-col justify-between space-y-4 transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-clay text-field ring-4 ring-marigold scale-105'
                    : 'bg-field text-ink hover:bg-mist'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-display font-black text-3xl">{tier.label}</span>
                    {tier.isPopular && (
                      <span className="font-mono text-[10px] bg-marigold text-ink px-1.5 py-0.5 font-bold border border-ink">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-body leading-relaxed ${isSelected ? 'text-field/90' : 'text-ink/80'}`}>
                    {tier.fundsDescription}
                  </p>
                </div>
                <div className="font-mono text-xs font-bold uppercase underline">
                  {isSelected ? '✓ Selected' : 'Select Tier'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="bg-field border-2 border-ink p-6 space-y-3">
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
              className="flex-1 p-3 min-h-[44px] bg-field border-2 border-ink text-xl font-bold font-mono focus-visible:outline-road"
            />
          </div>
        </div>

        {/* Payment Gateway Placeholder Component */}
        <PaymentProvider selectedAmount={selectedTierAmount} />
      </section>

      {/* ROUTE LINE MOTIF */}
      <div className="max-w-7xl mx-auto px-4">
        <RouteLine />
      </div>

      {/* DIRECT BANK TRANSFER DETAILS */}
      <section className="max-w-5xl mx-auto px-4" aria-labelledby="bank-details-heading">
        <div className="bg-mist border-2 border-ink p-8 space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
            <Building className="w-6 h-6 text-road" aria-hidden="true" />
            <h2 id="bank-details-heading" className="text-2xl font-bold font-display text-ink">
              Direct Bank & NEFT / RTGS Transfer Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div className="p-4 bg-field border border-ink space-y-1">
              <span className="text-xs text-road font-bold block uppercase">ACCOUNT NAME:</span>
              <span className="font-bold text-ink text-base">{donateContent.bankDetails.accountName}</span>
            </div>

            <div className="p-4 bg-field border border-ink space-y-1">
              <span className="text-xs text-road font-bold block uppercase">BANK NAME:</span>
              <span className="font-bold text-ink text-base">{donateContent.bankDetails.bankName}</span>
            </div>

            <div className="p-4 bg-field border border-ink space-y-1">
              <span className="text-xs text-road font-bold block uppercase">ACCOUNT NUMBER:</span>
              <span className="font-bold text-ink text-base">{donateContent.bankDetails.accountNumber}</span>
            </div>

            <div className="p-4 bg-field border border-ink space-y-1">
              <span className="text-xs text-road font-bold block uppercase">IFSC CODE:</span>
              <span className="font-bold text-ink text-base">{donateContent.bankDetails.ifscCode}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
