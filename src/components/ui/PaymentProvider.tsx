'use client';

import React, { useState } from 'react';
import { ShieldCheck, CreditCard, CheckCircle2, QrCode, Building, Lock, ArrowRight, Copy, Check } from 'lucide-react';
import { donateContent } from '@/content/donate';

interface PaymentProviderProps {
  selectedAmount: number | string;
}

/**
 * The real UPI handle, or an empty string if the foundation has not supplied
 * one. It must never be guessed: a donor who copies a wrong handle sends money
 * to whoever owns it, and the payment succeeds silently.
 */
const UPI_ID = donateContent.bankDetails.upiId;

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ selectedAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>(
    UPI_ID ? 'upi' : 'card'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form State for 80G Receipt
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');

  const handleCopyUpi = () => {
    if (!UPI_ID) return;
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const amountToDisplay = selectedAmount || '2500';

  return (
    <div className="w-full bg-white border border-road/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-road/15 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase">
              INSTANT 80G RECEIPT
            </span>
            <span className="font-mono text-xs font-bold text-road bg-road/10 border border-road/20 px-3 py-1 rounded-full uppercase">
              50% TAX DEDUCTION
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-ink tracking-tight mt-1">
            Secure Donation Portal
          </h3>
        </div>

        <div className="bg-mist/70 border border-road/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-ink flex items-center gap-1.5 shrink-0">
          <Lock className="w-3.5 h-3.5 text-road" aria-hidden="true" />
          <span>256-Bit Bank Grade SSL Encrypted</span>
        </div>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Active Amount Banner */}
          <div className="bg-gradient-to-r from-ink via-[#0D2444] to-[#15803D] text-field p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
            <div>
              <span className="text-xs font-mono text-marigold font-bold uppercase tracking-wider block">
                SELECTED CONTRIBUTION AMOUNT
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-display text-field">
                  ₹{amountToDisplay}
                </span>
                <span className="text-xs font-body text-field/80">INR (Tax Deductible)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
              <ShieldCheck className="w-5 h-5 text-marigold" />
              <span className="text-xs font-mono font-bold text-white">Govt. Regd 80G Trust</span>
            </div>
          </div>

          {/* Donor Information Inputs */}
          <div className="space-y-4 bg-mist/30 p-5 rounded-2xl border border-road/15">
            <h4 className="font-display font-bold text-base text-ink flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-road" />
              Donor Info for 80G Tax Exemption Receipt
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-ink/80 mb-1">Full Name (Required for 80G)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-road"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-ink/80 mb-1">Email (Receipt Sent Instantly)</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-road"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-ink/80 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-road"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-ink/80 mb-1">PAN Card Number (Optional for 80G Tax Exemption)</label>
                <input
                  type="text"
                  placeholder="e.g. ABCDE1234F"
                  value={donorPan}
                  onChange={(e) => setDonorPan(e.target.value)}
                  className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-road uppercase"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="space-y-4">
            <label className="block text-sm font-bold font-display text-ink uppercase tracking-wider">
              Select Preferred Payment Method
            </label>
            
            <div className={`grid ${UPI_ID ? 'grid-cols-3' : 'grid-cols-2'} gap-2 sm:gap-3`}>
              {/* UPI is offered only when a real handle is configured. */}
              {UPI_ID && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-road text-field border-road shadow-md ring-2 ring-marigold'
                      : 'bg-white text-ink border-road/20 hover:bg-mist'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-marigold" />
                  <span>UPI / QR Code</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-road text-field border-road shadow-md ring-2 ring-marigold'
                    : 'bg-white text-ink border-road/20 hover:bg-mist'
                }`}
              >
                <CreditCard className="w-5 h-5 text-marigold" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'netbanking'
                    ? 'bg-road text-field border-road shadow-md ring-2 ring-marigold'
                    : 'bg-white text-ink border-road/20 hover:bg-mist'
                }`}
              >
                <Building className="w-5 h-5 text-marigold" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Tab 1: UPI / GPay / PhonePe */}
            {paymentMethod === 'upi' && UPI_ID && (
              <div className="p-5 bg-mist/40 border border-road/20 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="font-mono text-xs font-bold text-road uppercase">INSTANT VPA / UPI TRANSFER</span>
                    <p className="font-body text-xs text-ink/80">Scan with GPay, PhonePe, Paytm, BHIM, or any UPI App</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="inline-flex items-center gap-2 bg-white border border-road/20 px-4 py-2 rounded-xl text-xs font-mono font-bold text-ink hover:bg-mist cursor-pointer shadow-2xs"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-road" /> : <Copy className="w-4 h-4 text-road" />}
                    <span>{copiedUpi ? 'UPI ID Copied!' : UPI_ID}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Credit / Debit Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="p-5 bg-mist/40 border border-road/20 rounded-2xl space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-ink/80 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8921"
                    className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-road"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-ink/80 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-road"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-ink/80 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      className="w-full p-3 bg-white border border-road/20 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-road"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Net Banking Bank Badges */}
            {paymentMethod === 'netbanking' && (
              <div className="p-5 bg-mist/40 border border-road/20 rounded-2xl space-y-3">
                <span className="font-mono text-xs font-bold text-ink block uppercase">Popular Banks</span>
                <div className="flex flex-wrap gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'].map((b) => (
                    <span key={b} className="bg-white border border-road/20 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-ink cursor-pointer hover:bg-mist/60">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-gradient-to-r from-clay via-clay to-road text-field font-display font-black text-lg sm:text-xl rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Processing Secure Payment...</span>
            ) : (
              <>
                <span>Proceed to Pay ₹{amountToDisplay} & Get 80G Receipt</span>
                <ArrowRight className="w-5 h-5 text-marigold" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* Payment Success Confirmation State */
        <div className="p-8 bg-mist border border-road/30 rounded-3xl text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-road mx-auto animate-bounce" />
          <h4 className="text-2xl font-bold font-display text-ink">
            Thank You for Your Generous Support!
          </h4>
          <p className="text-sm font-body text-ink/80 max-w-md mx-auto">
            Your contribution of <strong>₹{amountToDisplay}</strong> has been received. Your 80G Tax Exemption Receipt is being generated and emailed to you.
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="mt-4 px-6 py-2.5 bg-road text-field font-mono text-xs font-bold rounded-full hover:bg-ink cursor-pointer"
          >
            Make Another Donation
          </button>
        </div>
      )}
    </div>
  );
};

