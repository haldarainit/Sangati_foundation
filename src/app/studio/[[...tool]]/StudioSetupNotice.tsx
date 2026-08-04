import React from 'react';

/**
 * Shown at /studio before a Sanity project has been connected. This is a
 * developer-facing screen — the client should never see it once setup is done.
 */
export function StudioSetupNotice() {
  return (
    <main
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        maxWidth: '46rem',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        lineHeight: 1.6,
        color: '#1a1a1a',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Admin panel not connected yet
      </h1>

      <p style={{ marginBottom: '1.5rem' }}>
        The website is running normally and is serving the content from the{' '}
        <code>content/</code> folder. To switch it over to the admin panel, connect a
        Sanity project:
      </p>

      <ol style={{ paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem' }}>
        <li>
          Create a free project at <strong>sanity.io</strong> and note the{' '}
          <strong>Project ID</strong>.
        </li>
        <li>
          Copy <code>.env.local.example</code> to <code>.env.local</code> and fill in{' '}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>.
        </li>
        <li>
          Add a write token to <code>SANITY_API_WRITE_TOKEN</code>, then run{' '}
          <code>npm run seed</code> once to import the existing pages, text and photos.
        </li>
        <li>
          In Sanity, go to <strong>Manage → API → CORS origins</strong> and allow this
          site&rsquo;s URL with credentials.
        </li>
        <li>
          Restart the server and reload this page. Full instructions are in{' '}
          <code>README.md</code>.
        </li>
      </ol>
    </main>
  );
}
