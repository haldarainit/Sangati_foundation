export interface LeadershipMember {
  name: string;
  role: string;
  subtitle?: string;
  bio: string[];
  image: string;
  expertise?: string[];
  quote?: string;
  careerHighlights?: string[];
}

export const aboutContent = {
  title: 'Who We Are',
  subtitle: 'Walking alongside persons with disability across India since 14 February 2019.',
  heroImage: '/images/hero/banner-about.jpg',
  insetStoryImage: '/images/featured/featured-02.jpg',
  brandIdea: {
    title: 'Companionship, Not Charity',
    quoteHindi: 'संगति (Sangati): Companionship, association, coming together.',
    description:
      'Sangati Foundation was established on 14 February 2019 by Mr Sudhir Dhir. We believe that true inclusion is not about sympathy or hand-outs handed down from above. It is about standing shoulder-to-shoulder, removing physical and institutional obstacles, and walking the road together.',
  },
  foundingPoem: {
    title: 'संGati — Nomads on Wheels',
    lines: [
      'Let us leave ……… together',
      'Let us reach ……… together',
      'Let us see ……… together',
      'Let us be ……… together',
    ],
    invitation:
      'Do you wish to travel but hesitate to leave your home? Do you fear the unknown and the inaccessible? Do you want to actually see places on your own, not just view images on a screen? Do you wish to be an individual with choices? Say yes, and we will make it happen together.',
    epigraph: {
      quote: 'Good company in a journey makes the way seem shorter.',
      attribution: 'Izaak Walton',
    },
  },
  trustees: [
    {
      name: 'Sudhir Dhir',
      role: 'Founder Trustee | Sangati Foundation',
      subtitle: 'Social Impact Leader | Disability Inclusion & Accessibility Advocate',
      image: '/images/team/sudhir-dhir.jpg',
      bio: [
        'Sudhir Dhir is the Founder Trustee of Sangati Foundation, a nonprofit organization committed to advancing disability inclusion, accessibility and inclusive community development. Inspired by his lived experience as a person with disability, he works to promote equal opportunities, independent living and barrier-free environments.',
        'His work focuses on accessible tourism, inclusive healthcare, para sports, women\'s health awareness, skill development, policy advocacy and CSR partnerships. Through collaborative initiatives with government, corporate and civil society partners, he strives to create sustainable social impact and empower persons with disabilities.',
      ],
      expertise: [
        'Accessible Tourism & Nomads on Wheels',
        'Inclusive Healthcare & Mobile Cancer Screening',
        'Para Sports & Adaptive Athletics',
        'Women\'s Health & Hygiene Awareness',
        'Vocational Skill Training & Udaan',
        'Policy Advocacy & Universal Barrier-Free Design',
        'CSR & Civil Society Partnerships',
      ],
      quote: 'To create an India where disability is never a barrier to opportunity, dignity or leadership.',
    },
    {
      name: 'Alka Selot Asthana',
      role: 'Founder Trustee | Sangati Foundation',
      subtitle: 'Technology & Policy Leader | Telecom Executive | Accessibility & Inclusion Advocate',
      image: '/images/team/alka-selot-asthana.jpg',
      bio: [
        'Alka Selot Asthana is a distinguished technology and public policy leader with over 30 years of experience in telecommunications, digital infrastructure, regulatory affairs and corporate leadership. She has served as an Indian Telecom Service (ITS) officer, held the position of Chief Technology Officer at Indus Towers, and currently serves as Global Head – Regulatory, Tata Communications Limited.',
        'As Founder Trustee of Sangati Foundation, she provides strategic leadership to initiatives promoting disability inclusion, universal accessibility, accessible tourism, inclusive healthcare, digital empowerment, skill development and sustainable social impact. She is committed to building partnerships with government, industry and civil society to create an inclusive and accessible India.',
      ],
      expertise: [
        'Telecommunications & Digital Infrastructure',
        'Regulatory Affairs & Public Policy',
        'Technology Strategy & Digital Transformation',
        'Corporate Governance',
        'Accessibility & Disability Inclusion',
        'CSR & Strategic Partnerships',
        'Leadership & Innovation',
      ],
      quote: 'Inclusive technology and accessible systems are essential for building a more equitable, resilient and empowered society.',
    },
  ],
  leadership: [
    {
      name: 'Sudhir Dhir',
      role: 'Founder & Trustee',
      bio: 'Visionary leader behind Sangati Foundation and driver of the 6,500 km Sangati Yatra. Champion of independent mobility, accessible tourism, and disability rights across India.',
      image: '/images/team/sudhir-dhir.jpg',
    },
    {
      name: 'Alka Selot Asthana',
      role: 'Founder Trustee',
      bio: 'Technology & Public Policy Leader (Global Head - Regulatory, Tata Communications). Drives strategic governance, accessibility policy, digital empowerment, and sustainable social impact.',
      image: '/images/team/alka-selot-asthana.jpg',
    },
  ],
  timelinePreview: [
    { year: 2019, event: 'Sangati Foundation registered as a charitable trust on 14 February.' },
    { year: 2020, event: 'First accessible public toilet launched in Sector 29 Gurgaon; laptop repair course started.' },
    { year: 2021, event: 'COVID relief meals for 500+ daily; Project Pehchaan UDID drive; Sangati Star Awards.' },
    { year: 2022, event: 'Jodhpur Skill Centre opened; Bathri medical camp reached 500+ villagers.' },
    { year: 2023, event: '170 candidates assessed; 25 runners at Delhi Half-Marathon; World Book Fair booth.' },
    { year: 2024, event: 'Hazrat Nizamuddin Station made accessible; Cancer camp; 6,500 km Sangati Yatra flagged off.' },
    { year: 2025, event: 'Sangati Yatra completed on 3 January 2025 in New Delhi.' },
  ],
};
