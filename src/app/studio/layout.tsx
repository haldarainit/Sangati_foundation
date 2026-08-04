import React from 'react';

/**
 * Bare layout for the admin panel — no site header, footer, accessibility
 * toolbar or background audio. The Studio manages its own full-screen UI.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
