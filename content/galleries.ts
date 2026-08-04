/**
 * Starter photo galleries.
 *
 * Seed contents for the galleries on the Impact, About and Yatra pages. Once
 * the site is live the foundation manages these in the admin panel; this file
 * is used for the initial import and as a fallback.
 *
 * Every caption below was written after looking at the actual photograph. They
 * are used as alt text and read aloud by screen readers, so they describe what
 * is really in the frame rather than a generic label.
 *
 * DELIBERATELY EXCLUDED: public/images/stories/story-04.jpg is a screenshot of
 * an ISBN application form showing a personal email address, phone number and
 * home address. It must not be published. See README.
 */

export interface GallerySeedItem {
  title: string;
  src: string;
  caption: string;
}

/** Impact page — a cross-section of the foundation's work on the ground. */
export const impactGallery: GallerySeedItem[] = [
  {
    title: 'Sewing Machine Handover at Home',
    src: '/images/gallery/gallery-01.jpg',
    caption:
      'A Sangati Foundation representative sits with a mother and her daughter in their home, beside a newly delivered sewing machine.',
  },
  {
    title: 'Starting a Tailoring Livelihood',
    src: '/images/gallery/gallery-02.jpg',
    caption:
      'A woman reads the instruction manual beside a new Singer sewing machine marked with the Sangati Foundation logo, received to start a tailoring livelihood.',
  },
  {
    title: 'Winter Blanket Distribution',
    src: '/images/gallery/gallery-03.jpg',
    caption:
      'Volunteers distribute a tall stack of brightly coloured blankets to families sheltering at a roadside bus stand during winter relief.',
  },
  {
    title: 'Sweets Distributed to Schoolchildren',
    src: '/images/gallery/gallery-04.jpg',
    caption:
      'A Sangati volunteer hands out boxes of sweets to schoolchildren in uniform gathered around a table with a celebration cake.',
  },
  {
    title: 'संगTea Cart Keys Handover',
    src: '/images/gallery/gallery-05.jpg',
    caption:
      'A Sangati Foundation representative hands the keys of a branded संगTea mobile tea cart to a man seated in the driver’s position of the retrofitted vehicle.',
  },
  {
    title: 'Free Medical Camp, Bathri',
    src: '/images/gallery/gallery-06.jpg',
    caption:
      'A doctor is felicitated with a Guest of Honour trophy at the Sangati Foundation free medical camp in Bathri, Chamba district, Himachal Pradesh.',
  },
  {
    title: 'Sangati Shoppe Electric Vendor Cart',
    src: '/images/gallery/gallery-07.jpg',
    caption:
      'A black Sangati Shoppe electric vendor cart parked outdoors, built on a three-wheeled scooter and branded with the foundation’s logo.',
  },
  {
    title: 'Bakery Training Launch, Mandi',
    src: '/images/gallery/gallery-08.jpg',
    caption:
      'Trainees seated in a decorated hall listen to a speaker at the launch of the Project Udaan bakery training programme at the Sangati Skill Development Center in Mandi, Himachal Pradesh.',
  },
  {
    title: 'Roadside Sangati Shoppe in Delhi',
    src: '/images/gallery/gallery-09.jpg',
    caption:
      'A vendor operates his stocked Sangati Shoppe cart at a Delhi roadside, the cart marked "Run by Person with Disability".',
  },
  {
    title: 'Divya Kala Mela 2022 Food Stall',
    src: '/images/gallery/gallery-10.jpg',
    caption:
      'A Sangati Shoppe food cart operating among the marquees of the Divya Kala Mela 2022 exhibition, with a vendor serving from the cart.',
  },
  {
    title: 'Woman Running a Sangati Food Cart',
    src: '/images/gallery/gallery-11.jpg',
    caption:
      'A woman stands at the counter of her Sangati food cart with cooking pots and a green shade canopy, running the stall independently.',
  },
  {
    title: 'Health Camp Registration Desk',
    src: '/images/health/health-patient-registration.jpg',
    caption:
      'Staff register patients at a table stacked with yellow record folders while women and a small child wait in line at a free health camp.',
  },
];

/** About page — accessibility work, livelihoods and para sports. */
export const aboutGallery: GallerySeedItem[] = [
  {
    title: 'Accessible Toilet Installation',
    src: '/images/stories/story-02.jpg',
    caption:
      'A blue portable toilet cabin carrying a sign reading "Accessible Toilet — Initiative by Sangati Foundation", with symbols for women, men and wheelchair users.',
  },
  {
    title: 'Sangati Durlabh Shauchalaya',
    src: '/images/stories/story-05.jpg',
    caption:
      'A Sangati Durlabh Shauchalaya wheelchair-accessible public toilet installed on a Delhi street, signed in English and Hindi.',
  },
  {
    title: 'Relief Kit Distribution',
    src: '/images/stories/story-03.jpg',
    caption:
      'Two workers stand at a roadside holding sealed Sangati Foundation relief kits handed to them during a distribution drive.',
  },
  {
    title: 'Tea Cart Micro-Enterprise',
    src: '/images/stories/story-07.jpg',
    caption:
      'A vendor prepares tea on a gas stove inside his Sangati Shoppe cart on a Delhi street, the cart carrying the foundation’s NGO registration number.',
  },
  {
    title: 'Snack Cart at an Exhibition',
    src: '/images/stories/story-08.jpg',
    caption:
      'Bags of savoury snacks and green chillies displayed across the counter of a Sangati Shoppe cart at an outdoor exhibition.',
  },
  {
    title: 'Scooter-Mounted Vendor Cart',
    src: '/images/stories/story-06.jpg',
    caption:
      'A vendor sits on his maroon scooter fitted with a Sangati Shoppe canopy and hanging strips of packaged snacks for sale.',
  },
  {
    title: 'Mobile Shop on a Delhi Avenue',
    src: '/images/hero/hero-inclusion.jpg',
    caption:
      'A vendor operates a fully stocked Sangati Shoppe mobile cart with a cold box and hanging snack packets on a tree-lined Delhi avenue.',
  },
  {
    title: 'Riders and Wheelchair Users Group',
    src: '/images/parasports/parasports-riders-group.jpg',
    caption:
      'A group of men and women with disability gathered under trees with their wheelchairs and modified scooters, smiling at the camera.',
  },
  {
    title: 'Asian Youth Para Games, Bahrain 2021',
    src: '/images/parasports/sports-bahrain-trophy.jpg',
    caption:
      'The Indian contingent celebrates on court with a trophy and national flags at the Bahrain 2021 Asian Youth Para Games.',
  },
];

/**
 * Yatra page — the Yatra photographs currently in the repository.
 *
 * The foundation has roughly 30 more photos from the 6,500 km ride. Those are
 * uploaded through the admin panel (Yatra Page → Photo gallery), not added here.
 */
export const yatraGallery: GallerySeedItem[] = [
  {
    title: 'Flag-Off by Padma Shri Dr Deepa Malik',
    src: '/images/yatra/yatra-flagoff-deepa-malik.jpg',
    caption:
      'Padma Shri Dr Deepa Malik flags off the 6,500 km Sangati Yatra at Modern School, New Delhi on 14 December 2024.',
  },
  {
    title: 'Riders Assembled at the Flag-Off',
    src: '/images/hero/hero-yatra.jpg',
    caption:
      'Riders in high-visibility vests wait on their modified scooters while wheelchair users hold the Indian flag at the Sangati Yatra flag-off ceremony.',
  },
];
