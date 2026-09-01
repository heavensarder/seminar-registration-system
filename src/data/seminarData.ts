import { Speaker, AgendaSession, Sponsor } from '../types';

export const SEMINAR_DETAILS = {
  title: 'Kizuna 2026',
  fullTitle: 'OKAYAMA-BANGLADESH PARTNERSHIP SEMINAR',
  japaneseTitle: '岡山・バングラデシュ パートナーシップセミナー 2026',
  banglaTitle: 'ওকায়ামা-বাংলাদেশ পার্টনারশিপ সেমিনার ২০২৬',
  tagline: 'CONNECTING THE FUTURE OF OKAYAMA AND BANGLADESH',
  subTagline: 'CONNECTING PEOPLE, CREATING OPPORTUNITIES, BUILDING THE FUTURE',
  overview:
    'Bangladesh continues its rapid growth with a young and talented population. From study in Japan, Japanese language education, skilled workforce development, to business and trade opportunities—this seminar will explore how Okayama and Bangladesh can work together in education, human resources, and business for a brighter future.',
  date: 'Saturday, September 19, 2026',
  dateIso: '2026-09-19T14:00:00+09:00',
  time: '14:00 – 16:00 (Doors Open 13:30)',
  scheduleWindow: '13:30 Doors Open | 14:00 - 16:00 Main Seminar | 16:00 - 16:30 Networking Reception',
  venue: {
    name: 'Okayama International Exchange Center',
    japaneseName: '岡山国際交流センター',
    address: '2-2-1 Hokan-cho, Kita-ku, Okayama City, Okayama 700-0026, Japan',
    postalCode: '700-0026',
    hall: '2F International Conference Hall (国際会議場)',
    access: '3-minute walk from JR Okayama Station (West Exit / 西口)',
    lat: 34.6678,
    lng: 133.9168,
  },
  capacity: 180,
  initialRegistered: 138,
};

export const SPEAKERS: Speaker[] = [
  {
    id: 'ichiro-aisawa',
    name: 'Mr. Ichiro Aisawa',
    nameJa: '逢沢 一郎 氏',
    role: 'Member of the House of Representatives',
    organization: 'Okayama 1st District',
    category: 'government',
    bio: 'Distinguished statesman representing Okayama 1st District in the House of Representatives of Japan. Former Senior Vice-Minister for Foreign Affairs, long-time champion of international exchange, youth education, and strengthening diplomatic ties between Japan and South Asian economies.',
    topic: 'Welcome Address: Regional Vitalization through Japan-Bangladesh Strategic Cooperation',
    speechTime: '14:05 – 14:15',
  },
  {
    id: 'daud-ali',
    name: 'H.E. Mr. Md. Daud Ali',
    nameJa: 'ダウド・アリ 閣下',
    role: 'Ambassador of Bangladesh to Japan',
    organization: '',
    category: 'diplomatic',
    bio: 'Eminent diplomat leading the Bangladesh Mission in Tokyo. Devoted to advancing bilateral economic partnerships, promoting high-skilled human resource mobility, and establishing regional manufacturing and trade corridors between Japanese prefectures and Bangladesh.',
    topic: 'Key Perspectives: Bangladesh’s Economic Transformation and Bilateral Ties with Japan',
    speechTime: '14:15 – 14:25',
  },
  {
    id: 'zoynal-abedin',
    name: 'Mr. Md. Zoynal Abedin',
    nameJa: 'ゾイナル・アベディン 氏',
    role: 'Counsellor (Labour & Welfare)',
    organization: 'Embassy of Bangladesh in Tokyo',
    category: 'diplomatic',
    bio: 'Senior diplomatic officer specializing in economic diplomacy, bilateral labor agreements, student welfare, and technological collaboration between Bangladesh and Japanese regional industrial centers like Okayama.',
    topic: 'Fostering Cultural Synergy and Higher Education Linkages',
    speechTime: '14:25 – 14:35',
  },
  {
    id: 'syed-mahmudul-huq',
    name: 'Mr. Syed Mahmudul Huq',
    nameJa: 'サイエド・マハムドゥル・ハク 氏',
    role: 'Chairman',
    organization: 'TSI Group, Bangladesh',
    category: 'business',
    bio: 'Prominent industrialist and business leader. Chairman of TSI Group, Bangladesh, with decades of expertise in international commerce, cross-border joint ventures, logistics, and fostering high-impact corporate partnerships between Japan and Bangladesh.',
    topic: 'Bilateral Trade and Private Sector Opportunities in Emerging Sectors',
    speechTime: '14:35 – 14:45',
  },
  {
    id: 'kyohei-yamamoto',
    name: 'Mr. Kyohei Yamamoto',
    nameJa: '山本 恭平 氏',
    role: 'Executive Director, TSI Limited, Bangladesh &',
    organization: 'Former Deputy Head, PR & Cultural Section, Embassy of Japan in Bangladesh',
    category: 'culture',
    bio: 'Renowned cultural diplomat and educator who served extensively at the Embassy of Japan in Dhaka. Expert in Japanese language pedagogy, cross-cultural training, and bridging educational aspirations of Bangladeshi youth with Japanese institutional standards.',
    topic: 'Japanese Language Education and Cultural Adaptation for Youth Success in Japan',
    speechTime: '14:45 – 14:55',
  },
  {
    id: 'yasuhiro-kawamoto',
    name: 'Mr. Yasuhiro Kawamoto',
    nameJa: '河本 保弘 氏',
    role: 'CEO',
    organization: 'ZenmiraiJapan Co., Ltd.',
    category: 'business',
    bio: 'Visionary entrepreneur spearheading global talent acquisition, professional placement, and human resource development pipelines. Dedicated to connecting talented Bangladeshi software engineers, technical interns, and skilled workers with Okayama businesses.',
    topic: 'Building Sustainable Human Resource Pipelines: Okayama & Bangladesh',
    speechTime: '14:55 – 15:05',
  },
  {
    id: 'hiroko-katayama',
    name: 'Ms. Hiroko Katayama',
    nameJa: '片山 浩子 氏',
    role: 'Chairperson',
    organization: 'Okayama Gairo Gakuin',
    category: 'education',
    bio: 'Distinguished educator and Chairperson of Okayama Gairo Gakuin. Pioneer in international student education in Chugoku region, providing comprehensive Japanese language programs, university prep, and career pathway mentoring.',
    topic: 'Study in Japan: Educational Pathways, Student Life, and Local Community Integration in Okayama',
    speechTime: '15:05 – 15:15',
  },
  {
    id: 'syed-ruhul-huq',
    name: 'SYED RUHUL HUQ',
    nameJa: 'サイエド・ルフル・ハク 氏',
    role: 'Managing Director',
    organization: 'TSI Limited',
    isKeynote: true,
    category: 'business',
    bio: 'Keynote Speaker & Presenter for Kizuna 2026. Managing Director of TSI Limited. A visionary leader at the forefront of international trade, IT innovations, and skilled workforce bridges between Tokyo, Okayama, and Dhaka. His keynote presents an actionable roadmap for 2026–2030.',
    topic: 'Keynote Address: Connecting the Future of Okayama and Bangladesh — A 2026-2030 Action Roadmap for Talent, Tech & Trade',
    speechTime: '15:15 – 15:40',
  },
];

export const AGENDA_SESSIONS: AgendaSession[] = [
  {
    time: '13:30 – 14:00',
    title: 'Doors Open & Registration / Welcome Networking',
    speakerIds: [],
    theme: 'general',
    description:
      'Attendee reception, distribution of seminar materials, simultaneous translation headset checkout, and open networking in the 2F Foyer.',
    room: 'Main Foyer, 2F',
  },
  {
    time: '14:00 – 14:15',
    title: 'Opening Ceremony & Parliamentary Welcome',
    speakerIds: ['ichiro-aisawa'],
    theme: 'general',
    description:
      'Official opening greetings by seminar organizers followed by special welcome address from Honorable Mr. Ichiro Aisawa, Member of the House of Representatives.',
    room: 'International Conference Hall',
  },
  {
    time: '14:15 – 14:35',
    title: 'Diplomatic Address: Bilateral Horizons',
    speakerIds: ['daud-ali', 'zoynal-abedin'],
    theme: 'general',
    description:
      'Key insights into the growing strategic partnership between Japan and Bangladesh, focusing on regional collaboration in Chugoku and Okayama.',
    room: 'International Conference Hall',
  },
  {
    time: '14:35 – 15:05',
    title: 'Panel Session 1: Study in Japan & Japanese Language Education',
    speakerIds: ['hiroko-katayama', 'kyohei-yamamoto'],
    theme: 'study',
    description:
      'Exploration of university degree programs, language schooling in Okayama, MEXT and private scholarships, student visa support, and cultural immersion strategies for Bangladeshi students.',
    room: 'International Conference Hall',
  },
  {
    time: '15:05 – 15:35',
    title: 'Panel Session 2: Skilled Workforce & Industrial Human Resources Bridge',
    speakerIds: ['yasuhiro-kawamoto', 'syed-mahmudul-huq'],
    theme: 'human-resources',
    description:
      'Developing sustainable talent pipelines for IT engineering, manufacturing, healthcare, and Specified Skilled Workers (SSW). Practical advice for Okayama companies hiring foreign talent.',
    room: 'International Conference Hall',
  },
  {
    time: '15:35 – 15:55',
    title: 'KEYNOTE PRESENTATION: Building the Okayama-Bangladesh Future',
    speakerIds: ['syed-ruhul-huq'],
    theme: 'business',
    description:
      'Comprehensive keynote address outlining concrete business matching, bilateral investments, export-import corridors, and technological collaborations for 2026 and beyond.',
    room: 'International Conference Hall',
  },
  {
    time: '15:55 – 16:00',
    title: 'Closing Declaration & Commemorative Photo Session',
    speakerIds: [],
    theme: 'general',
    description:
      'Summary of joint resolutions and official group photography with all distinguished guests, speakers, and participants.',
    room: 'International Conference Hall',
  },
  {
    time: '16:00 – 16:30',
    title: 'Exclusive B2B Exchange & Academic Networking Reception',
    speakerIds: ['ichiro-aisawa', 'daud-ali', 'syed-ruhul-huq', 'yasuhiro-kawamoto'],
    theme: 'business',
    description:
      'Informal networking reception with light Japanese and Bangladeshi refreshments, one-on-one business matchmaking, student consultations, and media interviews.',
    room: 'Reception Hall & Exhibition Lounge',
  },
];

export const SPONSORS: Sponsor[] = [
  {
    name: 'TSI Group / TSI Limited',
    role: 'Host & Primary Organizer',
    description:
      'A leading global conglomerate bridging Bangladesh and international markets through enterprise technology, international trade, supply chain management, and talent development initiatives.',
    type: 'host',
    logoText: 'TSI',
    websiteUrl: 'https://tsigroup.com',
  },
  {
    name: 'ZENMIRAI JAPAN',
    role: 'Co-Organizer & Strategic Partner',
    description:
      'Prominent Japanese human resources and global consulting firm dedicated to cross-border recruitment, language coaching, and intercultural onboarding for top enterprises in Japan.',
    type: 'sponsor',
    logoText: 'ZENMIRAI',
    websiteUrl: 'https://zenmiraijapan.com',
  },
  {
    name: 'Hudsonland Bangladesh Ltd.',
    role: 'Official Sponsor',
    description:
      'Strategic advisory and trade development corporation facilitating direct Japanese investments, infrastructure projects, and industrial partnerships in Bangladesh.',
    type: 'sponsor',
    logoText: 'HUDSONLAND',
    websiteUrl: 'https://hudsonland.com',
  },
  {
    name: 'Embassy of Bangladesh in Japan',
    role: 'Patronage & Diplomatic Support',
    description:
      'The diplomatic mission of Bangladesh in Tokyo, actively promoting friendship, educational exchange, bilateral commercial partnerships, and welfare of the Bangladeshi diaspora in Japan.',
    type: 'embassy',
    logoText: 'BANGLADESH EMBASSY',
    websiteUrl: 'https://tokyo.mofa.gov.bd',
  },
];

export const SEMINAR_THEMES = [
  {
    id: 'study',
    title: 'STUDY IN JAPAN',
    subtitle: 'Education, Language & Academic Scholarships',
    icon: 'GraduationCap',
    color: 'from-teal-500 to-emerald-700',
    highlights: [
      'Comprehensive Japanese language education programs at Okayama institutions',
      'Undergraduate, Master’s, and Doctoral pathways at Okayama University & regional colleges',
      'Scholarship opportunities (MEXT, JASSO, and private foundation grants)',
      'Living support, part-time work regulations, and cultural adaptation in Okayama',
    ],
    description:
      'Opening doors for ambitious Bangladeshi students to access world-class higher education, specialized vocational diplomas, and cutting-edge research laboratories in Okayama prefecture.',
  },
  {
    id: 'human-resources',
    title: 'HUMAN RESOURCES',
    subtitle: 'Skilled Workforce, IT Engineering & Training',
    icon: 'Users',
    color: 'from-cyan-600 to-teal-800',
    highlights: [
      'Specified Skilled Worker (SSW / 特定技能) system implementation',
      'Software engineering, cloud, and AI talent placement from Bangladesh to Japan',
      'Technical intern training programs (TITP) with fair compliance and welfare',
      'Dual-qualification training centers established in Dhaka and Chittagong',
    ],
    description:
      'Harnessing Bangladesh’s young, tech-savvy demographic to solve Japan’s critical demographic and technical talent shortages while providing high-value career mobility.',
  },
  {
    id: 'business',
    title: 'BUSINESS & TRADE',
    subtitle: 'Bilateral Investments, Joint Ventures & Market Access',
    icon: 'TrendingUp',
    color: 'from-amber-600 to-red-700',
    highlights: [
      'Direct business matching between Okayama manufacturing / SME leaders and Bangladeshi companies',
      'Export-import corridors: textiles, agricultural produce, machinery, and precision tools',
      'Special Economic Zones (SEZs) incentives in Bangladesh for Japanese investors',
      'Legal, tax, and regulatory roadmaps for cross-border enterprise partnerships',
    ],
    description:
      'Fostering robust commercial synergy, supply chain diversification, and collaborative venture creation between Okayama’s robust manufacturing heritage and Bangladesh’s dynamic market.',
  },
];

export const FAQS = [
  {
    question: 'Is attendance at the seminar free of charge?',
    answer:
      'Yes, attendance is completely complimentary for all pre-registered participants. However, seating at the Okayama International Exchange Center is strictly limited, so advance registration is required.',
  },
  {
    question: 'Will translation or interpretation services be available?',
    answer:
      'Yes. Simultaneous and consecutive interpretation headsets will be provided at the reception desk supporting Japanese, English, and Bengali.',
  },
  {
    question: 'Can I join the seminar online if I cannot travel to Okayama?',
    answer:
      'Yes! We are providing a high-definition interactive live stream for international participants, students in Bangladesh, and corporate executives outside Okayama.',
  },
  {
    question: 'How do I reach the venue from Okayama Station?',
    answer:
      'The Okayama International Exchange Center is located just a 3-minute walk from JR Okayama Station (West Exit / 西口). Follow the pedestrian signs toward Hokan-cho.',
  },
  {
    question: 'Can I submit questions in advance for the speakers?',
    answer:
      'Yes, you can submit questions during registration or via our Speakers page. Selected questions will be answered during the panel sessions and Q&A.',
  },
];
