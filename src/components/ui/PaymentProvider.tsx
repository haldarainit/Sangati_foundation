'use client';

import React, { useState } from 'react';
import { ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react';

interface PaymentProviderProps {
  selectedAmount: number | string;
  donorDetails?: {
    name: string;
    email: string;
    phone: string;
    pan: string;
  };
}

/**
 * TODO: INTEGRATE LIVE PAYMENT GATEWAY (e.g. Razorpay / PayU India / HDFC Merchant Gateway)
 * This is a placeholder PaymentProvider component for static client deployment.
 * Connect API secrets and webhook response handlers when deploying production gateway backend.
 */
export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  selectedAmount,
  donorDetails,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="w-full bg-field border-2 border-ink p-6 space-y-6">
      <div className="border-b-2 border-ink pb-4 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs font-bold uppercase text-road block">
            SECURE CHECKOUT PLACEHOLDER
          </span>
          <h3 className="text-xl font-bold font-display text-ink">
            Payment Gateway Integration
          </h3>
        </div>
        <div className="bg-mist border border-ink px-3 py-1 text-xs font-mono font-bold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-road" aria-hidden="true" />
          <span>256-Bit SSL</span>
        </div>
      </div>

      {/* TODO Developer Notice Alert */}
      <div
        className="bg-mist border-2 border-ink p-4 text-xs font-mono space-y-1 text-ink"
        role="note"
        aria-label="Developer integration notice"
      >
        <div className="font-bold text-road uppercase">
          /* TODO: CLIENT PAYMENT GATEWAY ENDPOINT */
        </div>
        <p>
          Connect backend Razorpay/PayU webhook scripts to receive 80G donor receipts automatically via email.
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSimulatedPayment} className="space-y-4">
          <div className="bg-road text-field p-4 border-2 border-ink flex justify-between items-center">
            <div>
              <span className="text-xs font-mono block">Selected Contribution:</span>
              <strong className="text-2xl font-display font-black text-marigold">
                ₹{selectedAmount || '0'}
              </strong>
            </div>
            <CreditCard className="w-8 h-8 text-marigold" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold font-mono uppercase text-ink">
              Select Payment Method (Simulation)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                className="p-3 border-2 border-ink bg-mist text-xs font-bold hover:bg-marigold text-center min-h-[44px]"
              >
                UPI / QR Code
              </button>
              <button
                type="button"
                className="p-3 border-2 border-ink bg-mist text-xs font-bold hover:bg-marigold text-center min-h-[44px]"
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                className="p-3 border-2 border-ink bg-mist text-xs font-bold hover:bg-marigold text-center min-h-[44px]"
              >
                Net Banking
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !selectedAmount}
            className="w-full bg-clay text-field border-2 border-ink py-4 rounded-full font-bold text-lg hover:bg-marigold hover:text-ink transition-colors min-h-[44px] flex items-center justify-center gap-2 focus-visible:outline-marigold"
          >
            {isProcessing ? 'Processing Transaction...' : `Proceed to Pay ₹${selectedAmount}`}
          </button>
        </form>
      ) : (
        <div
          className="bg-road text-field p-6 border-2 border-ink text-center space-y-4"
          aria-live="polite"
        >
          <CheckCircle2 className="w-12 h-12 text-marigold mx-auto" aria-hidden="true" />
          <h4 className="text-2xl font-bold font-display text-marigold">
            Thank You for Walking Alongside Us!
          </h4>
          <p className="text-sm font-body max-w-md mx-auto">
            Your payment simulation of <strong>₹{selectedAmount}</strong> was recorded. An 80G tax exemption receipt will be generated and sent to your email.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="bg-field text-ink border-2 border-ink px-6 py-2 rounded-full font-bold text-xs uppercase font-mono hover:bg-marigold min-h-[44px]"
          >
            Make Another Contribution
          </button>
        </div>
      )}
    </div>
  );
};
