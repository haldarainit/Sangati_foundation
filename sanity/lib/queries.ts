import { groq } from 'next-sanity';

/* ------------------------------------------------------------------ *
 * Reusable fragments
 * ------------------------------------------------------------------ */

const IMAGE = `{ asset, hotspot, crop, alt, caption }`;

const GALLERY = `gallery[]{ title, caption, image ${IMAGE} }`;

/* ------------------------------------------------------------------ *
 * Collections
 * ------------------------------------------------------------------ */

export const NEWS_QUERY = groq`
  *[_type == "newsPoster"] | order(order asc) {
    "id": _id,
    title,
    date,
    category,
    description,
    linkText,
    image ${IMAGE}
  }
`;

export const STORIES_QUERY = groq`
  *[_type == "story"] | order(order asc) {
    "slug": slug.current,
    title,
    subtitle,
    category,
    date,
    author,
    excerpt,
    quote,
    body,
    image ${IMAGE}
  }
`;

export const STORY_SLUGS_QUERY = groq`*[_type == "story" && defined(slug.current)].slug.current`;

export const STORY_BY_SLUG_QUERY = groq`
  *[_type == "story" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    subtitle,
    category,
    date,
    author,
    excerpt,
    quote,
    body,
    image ${IMAGE}
  }
`;

export const PROGRAMS_QUERY = groq`
  *[_type == "program"] | order(order asc) {
    "slug": slug.current,
    title,
    summary,
    fullContent,
    highlights,
    keyStats,
    partners,
    image ${IMAGE},
    ${GALLERY}
  }
`;

export const PROGRAM_SLUGS_QUERY = groq`*[_type == "program" && defined(slug.current)].slug.current`;

export const PROGRAM_BY_SLUG_QUERY = groq`
  *[_type == "program" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    summary,
    fullContent,
    highlights,
    keyStats,
    partners,
    image ${IMAGE},
    ${GALLERY}
  }
`;

export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    name,
    section,
    role,
    subtitle,
    bio,
    expertise,
    careerHighlights,
    quote,
    image ${IMAGE}
  }
`;

/* ------------------------------------------------------------------ *
 * One-off pages
 * ------------------------------------------------------------------ */

export const HOME_QUERY = groq`
  *[_type == "homePage"][0] {
    heroSlides[]{ category, title, subtitle, ctaText, ctaLink, image ${IMAGE} },
    heroHeadline,
    heroSubheadline,
    heroPrimaryCtaText,
    heroPrimaryCtaLink,
    heroSecondaryCtaText,
    heroSecondaryCtaLink,
    heroImage ${IMAGE},
    stats[]{ id, value, numberValue, unit, label, description },
    whoWeAreEyebrow,
    whoWeAreTitle,
    whoWeAreParagraphs,
    whoWeAreCtaText,
    whoWeAreCtaLink,
    whoWeAreImage ${IMAGE},
    yatraEyebrow,
    yatraTitle,
    yatraHeadline,
    yatraDescription,
    yatraCtaText,
    yatraCtaLink,
    yatraImage ${IMAGE},
    ${GALLERY}
  }
`;

export const ABOUT_QUERY = groq`
  *[_type == "aboutPage"][0] {
    title,
    subtitle,
    heroImage ${IMAGE},
    insetStoryImage ${IMAGE},
    brandIdeaTitle,
    brandIdeaQuoteHindi,
    brandIdeaDescription,
    poemTitle,
    poemLines,
    poemInvitation,
    epigraphQuote,
    epigraphAttribution,
    timelinePreview[]{ year, event },
    ${GALLERY}
  }
`;

export const IMPACT_QUERY = groq`
  *[_type == "impactPage"][0] {
    title,
    subtitle,
    bannerImage ${IMAGE},
    keyStats[]{ number, label },
    timeline[]{ year, title, summary, details },
    ${GALLERY}
  }
`;

export const YATRA_QUERY = groq`
  *[_type == "yatraPage"][0] {
    headline,
    distance,
    duration,
    driverCount,
    storyParagraphs,
    heroImage ${IMAGE},
    bodyImage ${IMAGE},
    flagOffDate,
    flagOffLocation,
    flaggedOffBy,
    conclusionDate,
    conclusionLocation,
    stops[]{ name, state, distanceKm, date, description, isKeyStop },
    ${GALLERY}
  }
`;

export const DONATE_QUERY = groq`
  *[_type == "donatePage"][0] {
    title,
    subtitle,
    bannerImage ${IMAGE},
    featuredImage ${IMAGE},
    tiers[]{ amount, label, fundsDescription, isPopular }
  }
`;
