export const accessibilityContent = {
  title: 'Accessibility Statement',
  subtitle: 'Accessibility is the product, not a checkbox. Our commitment to digital inclusion.',
  lastUpdated: '29 July 2026',
  standards: 'WCAG 2.2 Level AA Minimum (Target AAA for Body Text Contrast)',
  statementParagraphs: [
    'Sangati Foundation is a disability-rights organisation dedicated to accessibility, mobility, inclusivity, and visibility for persons with disability in India. Digital accessibility is core to our mission — a non-negotiable right for all users.',
    'This website has been architected from the ground up to comply with Web Content Accessibility Guidelines (WCAG) 2.2 Level AA guidelines, aiming for AAA standards on body text contrast (7:1 ratio minimum on primary surfaces).',
  ],
  implementedFeatures: [
    {
      title: 'Semantic HTML & Navigation',
      description:
        'Engineered using semantic HTML5 landmarks (<header>, <nav>, <main>, <article>, <section>, <footer>) with strict single <h1> per page hierarchy.',
    },
    {
      title: 'Accessibility Toolbar',
      description:
        'Includes a persistent, bottom-left accessibility widget offering Text Scaling (A 100% / A+ 115% / A++ 130%), High Contrast Mode (yellow & black inverted mode), and Manual Reduced Motion toggle.',
    },
    {
      title: 'Keyboard Operability & Focus',
      description:
        '100% operable via keyboard navigation. High-visibility 2px solid focus rings with 2px offset on all interactive elements. A "Skip to Main Content" link is the first focusable element.',
    },
    {
      title: 'Motion & Animation Preferences',
      description:
        'Fully respects system-level prefers-reduced-motion settings. Disables all CSS transitions, route line scroll drawings, and automated slideshows when active.',
    },
    {
      title: 'Carousel Controls',
      description:
        'Carousels never autoplay by default. Equipped with clear Pause/Play buttons, Previous/Next controls, and keyboard arrow key navigation.',
    },
    {
      title: 'Forms & Error Handling',
      description:
        'All input elements have explicit <label> associations. Form validation errors are announced dynamically to screen readers via aria-live="polite" and never rely solely on color.',
    },
    {
      title: 'Touch Targets & Display Zoom',
      description:
        'All interactive buttons, links, and form fields maintain a minimum touch target size of 44×44 pixels. The layout remains fully responsive, readable, and functional at 200% browser zoom and down to 320px viewport width.',
    },
  ],
  feedbackChannel: {
    title: 'Accessibility Feedback & Assistance',
    description:
      'We welcome your feedback on the accessibility of the Sangati Foundation website. If you encounter accessibility barriers or require content in an alternative accessible format (large print, audio, simplified text), please reach out to us:',
    phone: '7428769622',
    email: 'support@sangati.org',
    responseWindow: 'We aim to respond to accessibility inquiries within 2 business days.',
  },
};
