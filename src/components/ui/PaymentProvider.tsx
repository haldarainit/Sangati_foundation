'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Building, Copy, Check, Mail, ArrowRight } from 'lucide-react';

import { donateContent } from '@/content/donate';
import { contactContent } from '@/content/contact';

interface PaymentProviderProps {
  selectedAmount: number | string;
}

/**
 * Bank transfer details plus a form that helps a donor claim their 80G receipt.
 *
 * There is deliberately no card or net-banking flow here. Those tabs existed
 * before but processed nothing — the submit button waited a second and then
 * told the donor their money "has been received", which was untrue and could
 * have left someone believing they had given when they had not.
 *
 * Until a real payment gateway (Razorpay, Cashfree, PayU) is connected, the
 * honest flow is: show the account details, and help the donor send their
 * details in for the receipt. Both of those actually work.
 */
export const PaymentProvider: React.FC<PaymentProviderProps> = ({ selectedAmount }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');

  const bank = donateContent.bankDetails;
  const amountToDisplay = selectedAmount || '2500';

  const copy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  /**
   * Opens the donor's own email app with everything filled in. No server is
   * involved, so nothing is promised that the site cannot deliver.
   */
  const receiptMailto = () => {
    const subject = `80G receipt request — donation of ₹${amountToDisplay}`;
    const body = [
      'I have made a donation to Sangati Foundation and would like an 80G receipt.',
      '',
      `Amount: ₹${amountToDisplay}`,
      `Name: ${donorName || '(please fill in)'}`,
      `Email: ${donorEmail || '(please fill in)'}`,
      `Phone: ${donorPhone || '(please fill in)'}`,
      `PAN: ${donorPan || '(please fill in)'}`,
      '',
      'Transfer reference / UTR number: ',
      'Date of transfer: ',
    ].join('\n');

    return `mailto:${contactContent.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const field = (label: string, value: string, key: string) => (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-road/10 last:border-0">
      <div className="min-w-0">
        <span className="block text-[11px] font-mono font-bold text-road uppercase tracking-wide">
          {label}
        </span>
        <span className="block font-bold text-ink text-sm sm:text-base break-words">{value}</span>
      </div>
      <button
        type="button"
        onClick={() => copy(value, key)}
        aria-label={`Copy ${label}`}
        className="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white border border-road/20 hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-road"
      >
        {copiedField === key ? (
          <Check className="w-4 h-4 text-road" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4 text-road" aria-hidden="true" />
        )}
      </button>
    </div>
  );

  return (
    <div className="w-full bg-white border border-road/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-road/15 pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase">
              80G TAX EXEMPTION
            </span>
            <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase">
              REGISTERED TRUST
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-ink tracking-tight mt-1">
            Donate by Bank Transfer
          </h3>
        </div>

        <div className="bg-mist/70 border border-road/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-ink flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-road" aria-hidden="true" />
          <span>Govt. Registered 80G Trust</span>
        </div>
      </div>

      {/* Selected amount */}
      <div className="bg-gradient-to-r from-ink via-[#0D2444] to-[#15803D] text-field p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <span className="text-xs font-mono text-marigold font-bold uppercase tracking-wider block">
            YOUR CHOSEN AMOUNT
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-display text-field">
              ₹{amountToDisplay}
            </span>
            <span className="text-xs font-body text-field/80">INR (Tax Deductible)</span>
          </div>
        </div>
        <p className="text-xs font-body text-field/80 max-w-xs">
          Any amount is welcome — transfer whatever you choose using the details below.
        </p>
      </div>

      {/* Step 1 — bank details */}
      <div className="space-y-4">
        <h4 className="font-display font-bold text-base text-ink flex items-center gap-2">
          <span className="grid place-items-center w-6 h-6 rounded-full bg-road text-field font-mono text-xs">
            1
          </span>
          Transfer to this account
        </h4>

        <div className="bg-mist/40 border border-road/20 rounded-2xl px-5 py-2">
          {field('Account name', bank.accountName, 'name')}
          {field('Account number', bank.accountNumber, 'acc')}
          {field('IFSC code', bank.ifscCode, 'ifsc')}
          {field('Bank', bank.bankName, 'bank')}
          {field('Branch', bank.branch, 'branch')}
        </div>

        <p className="flex items-start gap-2 text-xs font-body text-ink/70">
          <Building className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Works with any UPI app, net banking or IMPS. Please keep the transfer reference
            (UTR) number — it is needed for your receipt.
          </span>
        </p>
      </div>

      {/* Step 2 — 80G receipt */}
      <div className="space-y-4 bg-mist/30 p-5 rounded-2xl border border-road/15">
        <h4 className="font-display font-bold text-base text-ink flex items-center gap-2">
          <span className="grid place-items-center w-6 h-6 rounded-full bg-road text-field font-mono text-xs">
            2
          </span>
          Claim your 80G tax receipt
        </h4>

        <p className="text-xs font-body text-ink/70">
          Fill these in and we will open an email to the foundation with the details ready to
          send. Add your transfer reference number before sending.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="donor-name" className="block text-xs font-mono font-bold text-ink/80 mb-1">
              Full name
            </label>
            <input
              id="donor-name"
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="As it should appear on the receipt"
              className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-road"
            />
          </div>

          <div>
            <label htmlFor="donor-email" className="block text-xs font-mono font-bold text-ink/80 mb-1">
              Email address
            </label>
            <input
              id="donor-email"
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-road"
            />
          </div>

          <div>
            <label htmlFor="donor-phone" className="block text-xs font-mono font-bold text-ink/80 mb-1">
              Phone number
            </label>
            <input
              id="donor-phone"
              type="tel"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              placeholder="+91"
              className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-road"
            />
          </div>

          <div>
            <label htmlFor="donor-pan" className="block text-xs font-mono font-bold text-ink/80 mb-1">
              PAN (needed for 80G)
            </label>
            <input
              id="donor-pan"
              type="text"
              value={donorPan}
              onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
              maxLength={10}
              placeholder="ABCDE1234F"
              className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-road"
            />
          </div>
        </div>

        <a
          href={receiptMailto()}
          className="w-full py-4 px-6 bg-gradient-to-r from-clay via-clay to-road text-field font-display font-black text-base sm:text-lg rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 text-center"
        >
          <Mail className="w-5 h-5 text-marigold shrink-0" aria-hidden="true" />
          <span>Email these details for my 80G receipt</span>
          <ArrowRight className="w-5 h-5 text-marigold shrink-0" aria-hidden="true" />
        </a>

        <p className="flex items-start gap-2 text-xs font-body text-ink/70">
          <CheckCircle2 className="w-4 h-4 text-road shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Prefer to do it yourself? Email {contactContent.email} or call{' '}
            {contactContent.helpline}.
          </span>
        </p>
      </div>
    </div>
  );
};
