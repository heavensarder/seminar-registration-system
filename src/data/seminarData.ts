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
    japaneseAddress: '〒700-0026 岡山県岡山市北区奉還町2丁目2-1',
    postalCode: '700-0026',
    hall: '2F International Conference Hall (国際会議場)',
    japaneseHall: '2F 国際会議場',
    access: '3-minute walk from JR Okayama Station (West Exit / 西口)',
    lat: 34.6678,
    lng: 133.9168,
  },
  capacity: 180,
  initialRegistered: 138,
};

export const SPEAKERS: Speaker[] = [

  {
    id: 'daud-ali',
    name: 'H.E. Mr. Md. Daud Ali',
    nameJa: 'ダウド・アリ閣下',
    role: 'Ambassador of Bangladesh to Japan',
    roleJa: '駐日バングラデシュ大使',
    badge: 'Chief Guest',
    organization: '',
    organizationJa: '',
    category: 'diplomatic',
    bio: 'Eminent diplomat leading the Bangladesh Mission in Tokyo. Devoted to advancing bilateral economic partnerships, promoting high-skilled human resource mobility, and establishing regional manufacturing and trade corridors between Japanese prefectures and Bangladesh.',
    bioJa: '東京のバングラデシュ大使館を率いる著名な外交官。二国間の経済連携の推進、高度な人材の流動性の促進、日本の地方自治体とバングラデシュ間の製造業と貿易の回廊の確立に尽力している。',
    topic: 'Key Perspectives: Bangladesh’s Economic Transformation and Bilateral Ties with Japan',
    topicJa: '重要な視点：バングラデシュの経済変革と日本との二国間関係',
    speechTime: '14:15 – 14:25',
  },
  {
    id: 'hiroko-katayama',
    name: 'Ms. Hiroko Katayama',
    nameJa: '片山 浩子 氏',
    role: 'Chairperson',
    roleJa: '理事長',
    organization: 'Okayama Institute of Languages',
    organizationJa: '岡山外語学院',
    category: 'education',
    bio: 'Distinguished educator and Chairperson of Okayama Institute of Languages. Pioneer in international student education in Chugoku region, providing comprehensive Japanese language programs, university prep, and career pathway mentoring.',
    bioJa: '著名な教育者であり、岡山外語学院の理事長。中国地方における留学生教育のパイオニアであり、包括的な日本語プログラム、大学進学準備、キャリアパスのメンタリングを提供している。',
    topic: 'Study in Japan: Educational Pathways, Student Life, and Local Community Integration in Okayama',
    topicJa: '日本留学：教育への道筋、学生生活、岡山での地域社会への統合',
    speechTime: '15:05 – 15:15',
  },
  {
    id: 'syed-mahmudul-huq',
    name: 'Mr. Syed Mahmudul Huq',
    nameJa: 'サイード・マフムドゥル・ハク 氏',
    role: 'Chairman',
    roleJa: '会長',
    organization: 'TSI Group, Bangladesh',
    organizationJa: 'TSIグループ、バングラデシュ',
    category: 'business',
    bio: 'Prominent industrialist and business leader. Chairman of TSI Group, Bangladesh, with decades of expertise in international commerce, cross-border joint ventures, logistics, and fostering high-impact corporate partnerships between Japan and Bangladesh.',
    bioJa: '著名な実業家およびビジネスリーダー。バングラデシュのTSIグループ会長であり、国際商業、国境を越えた合弁事業、ロジスティクス、そして日本とバングラデシュ間の影響力の大きい企業パートナーシップの育成において数十年の専門知識を持つ。',
    topic: 'Bilateral Trade and Private Sector Opportunities in Emerging Sectors',
    topicJa: '新興分野における二国間貿易と民間部門の機会',
    speechTime: '14:35 – 14:45',
  },
  {
    id: 'zoynal-abedin',
    name: 'Mr. Md. Zoynal Abedin',
    nameJa: 'Md. ゾイナル・アベディン 氏',
    role: 'Counsellor (Labour & Welfare)',
    roleJa: '参事官（労働・福祉）',
    organization: 'Embassy of Bangladesh in Tokyo',
    organizationJa: '駐日バングラデシュ大使館',
    category: 'diplomatic',
    bio: 'Senior diplomatic officer specializing in economic diplomacy, bilateral labor agreements, student welfare, and technological collaboration between Bangladesh and Japanese regional industrial centers like Okayama.',
    bioJa: '経済外交、二国間労働協定、学生福祉、バングラデシュと岡山のような日本の地方産業の中心地との間の技術協力に特化した上級外交官。',
    topic: 'Fostering Cultural Synergy and Higher Education Linkages',
    topicJa: '文化的シナジーと高等教育の連携の育成',
    speechTime: '14:25 – 14:35',
  },
  {
    id: 'seiji-ishimoto',
    name: 'Mr. Seiji Ishimoto',
    nameJa: '石本 誠二 氏',
    role: 'WOMC Executive Director, West-Okayama Medical Clinic & Chairman, Hudsonland',
    roleJa: '西岡山医療クリニック 専務理事 兼 Hudsonland 会長',
    organization: '',
    organizationJa: '',
    category: 'business',
    bio: 'Prominent executive in the healthcare and medical sector. Currently serving as WOMC Executive Director at the West-Okayama Medical clinic and Chairman of Hudsonland. He is dedicated to advancing global healthcare standards and exploring bilateral collaboration opportunities in medical technologies and human resources.',
    bioJa: 'ヘルスケアおよび医療分野の著名な幹部。現在、西岡山医療クリニックの専務理事およびHudsonlandの会長を務める。グローバルな医療基準の向上と、医療技術や人材における二国間協力の機会の探求に尽力している。',
    topic: 'Healthcare Collaboration and Talent Development Between Japan and Bangladesh',
    topicJa: '日本とバングラデシュ間のヘルスケアのコラボレーションと人材育成',
    speechTime: '14:45 – 14:55',
  },

  {
    id: 'yasuhiro-kawamoto',
    name: 'Mr. Yasuhiro Kawamoto',
    nameJa: '河本 泰弘 氏',
    role: 'CEO',
    roleJa: 'CEO',
    organization: 'ZenmiraiJapan Co., Ltd.',
    organizationJa: 'ZenmiraiJapan 株式会社',
    category: 'business',
    bio: 'Visionary entrepreneur spearheading global talent acquisition, professional placement, and human resource development pipelines. Dedicated to connecting talented Bangladeshi software engineers, technical interns, and skilled workers with Okayama businesses.',
    bioJa: 'グローバルな人材獲得、専門職の配置、人材育成パイプラインを牽引する先見の明のある起業家。バングラデシュの才能あるソフトウェアエンジニア、技能実習生、熟練労働者と岡山の企業を結びつけることに尽力している。',
    topic: 'Building Sustainable Human Resource Pipelines: Okayama & Bangladesh',
    topicJa: '持続可能な人材パイプラインの構築：岡山とバングラデシュ',
    speechTime: '14:55 – 15:05',
  },
  {
    id: 'syed-ruhul-huq',
    name: 'SYED RUHUL HUQ',
    nameJa: 'サイード・ルフル・ハク',
    role: 'Managing Director',
    roleJa: 'マネージングディレクター',
    organization: 'TSI Limited',
    organizationJa: 'TSI Limited',
    isKeynote: true,
    category: 'business',
    bio: 'Keynote Speaker & Presenter for Kizuna 2026. Managing Director of TSI Limited. A visionary leader at the forefront of international trade, IT innovations, and skilled workforce bridges between Tokyo, Okayama, and Dhaka. His keynote presents an actionable roadmap for 2026–2030.',
    bioJa: 'Kizuna 2026の基調講演者およびプレゼンター。TSI Limitedのマネージングディレクター。国際貿易、IT革新、東京・岡山・ダッカ間の熟練労働者の架け橋の最前線に立つ先見の明のあるリーダー。彼の基調講演は2026-2030年の実行可能なロードマップを提示する。',
    topic: 'Keynote Address: Connecting the Future of Okayama and Bangladesh — A 2026-2030 Action Roadmap for Talent, Tech & Trade',
    topicJa: '基調講演：岡山とバングラデシュの未来をつなぐ — 人材、テクノロジー、貿易のための2026-2030年アクションロードマップ',
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
    title: 'Opening Ceremony',
    speakerIds: [],
    theme: 'general',
    description:
      'Official opening greetings and welcome address by seminar organizers.',
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
    speakerIds: ['hiroko-katayama'],
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
    speakerIds: ['daud-ali', 'syed-ruhul-huq', 'yasuhiro-kawamoto'],
    theme: 'business',
    description:
      'Informal networking reception with light Japanese and Bangladeshi refreshments, one-on-one business matchmaking, student consultations, and media interviews.',
    room: 'Reception Hall & Exhibition Lounge',
  },
];

export const SPONSORS: Sponsor[] = [
  {
    name: 'TSI Group / TSI Limited',
    nameJa: 'TSIグループ / TSI Limited',
    role: 'Host & Primary Organizer',
    roleJa: '主催者',
    description:
      'A leading global conglomerate bridging Bangladesh and international markets through enterprise technology, international trade, supply chain management, and talent development initiatives.',
    descriptionJa: '企業向け技術、国際貿易、サプライチェーン管理、人材開発イニシアチブを通じて、バングラデシュと国際市場を結ぶ世界的なコングロマリット。',
    type: 'host',
    logoText: 'TSI',
    websiteUrl: 'https://tsigroup.com',
  },
  {
    name: 'ZENMIRAI JAPAN',
    nameJa: 'ZENMIRAI JAPAN',
    role: 'Co-Organizer & Strategic Partner',
    roleJa: '共催および戦略的パートナー',
    description:
      'Prominent Japanese human resources and global consulting firm dedicated to cross-border recruitment, language coaching, and intercultural onboarding for top enterprises in Japan.',
    descriptionJa: '国境を越えた採用、語学コーチング、および日本のトップ企業向けの異文化オンボーディングに特化した、著名な日本の人事およびグローバルコンサルティング会社。',
    type: 'sponsor',
    logoText: 'ZENMIRAI',
    websiteUrl: 'https://zenmiraijapan.com',
  },
  {
    name: 'Hudsonland Bangladesh Ltd.',
    nameJa: 'Hudsonland Bangladesh Ltd.',
    role: 'Official Sponsor',
    roleJa: '公式スポンサー',
    description:
      'Strategic advisory and trade development corporation facilitating direct Japanese investments, infrastructure projects, and industrial partnerships in Bangladesh.',
    descriptionJa: '日本からの直接投資、インフラプロジェクト、およびバングラデシュにおける産業パートナーシップを促進する戦略的アドバイザリーおよび貿易開発法人。',
    type: 'sponsor',
    logoText: 'HUDSONLAND',
    websiteUrl: 'https://hudsonland.com',
  },

];

export const SEMINAR_THEMES = [
  {
    id: 'study',
    title: 'STUDY IN JAPAN',
    titleJa: '日本留学',
    subtitle: 'Education, Language & Academic Scholarships',
    subtitleJa: '教育、言語、および学術奨学金',
    icon: 'GraduationCap',
    color: 'from-teal-500 to-emerald-700',
    highlights: [
      'Comprehensive Japanese language education programs at Okayama institutions',
      'Undergraduate, Master’s, and Doctoral pathways at Okayama University & regional colleges',
      'Scholarship opportunities (MEXT, JASSO, and private foundation grants)',
      'Living support, part-time work regulations, and cultural adaptation in Okayama',
    ],
    highlightsJa: [
      '岡山の教育機関における包括的な日本語教育プログラム',
      '岡山大学および地方大学での学士、修士、博士号取得への道筋',
      '奨学金の機会（文部科学省、JASSO、および民間財団の助成金）',
      '岡山での生活支援、アルバイトの規制、および文化への適応',
    ],
    description:
      'Opening doors for ambitious Bangladeshi students to access world-class higher education, specialized vocational diplomas, and cutting-edge research laboratories in Okayama prefecture.',
    descriptionJa: '野心的なバングラデシュの学生が、岡山県の世界クラスの高等教育、専門的な職業訓練の学位、および最先端の研究室にアクセスするための扉を開きます。',
  },
  {
    id: 'human-resources',
    title: 'HUMAN RESOURCES',
    titleJa: '人材',
    subtitle: 'Skilled Workforce, IT Engineering & Training',
    subtitleJa: '熟練した労働力、ITエンジニアリング、およびトレーニング',
    icon: 'Users',
    color: 'from-cyan-600 to-teal-800',
    highlights: [
      'Specified Skilled Worker (SSW / 特定技能) system implementation',
      'Software engineering, cloud, and AI talent placement from Bangladesh to Japan',
      'Technical intern training programs (TITP) with fair compliance and welfare',
      'Dual-qualification training centers established in Dhaka and Chittagong',
    ],
    highlightsJa: [
      '特定技能（SSW）制度の導入',
      'バングラデシュから日本へのソフトウェアエンジニアリング、クラウド、AI人材の配置',
      '公正なコンプライアンスと福利厚生を備えた技能実習制度（TITP）',
      'ダッカとチッタゴンに設立された二重資格トレーニングセンター',
    ],
    description:
      'Harnessing Bangladesh’s young, tech-savvy demographic to solve Japan’s critical demographic and technical talent shortages while providing high-value career mobility.',
    descriptionJa: 'バングラデシュの若く技術に精通した人口動態を活用して、日本の深刻な人口動態および技術人材の不足を解決すると同時に、付加価値の高いキャリアの流動性を提供します。',
  },
  {
    id: 'business',
    title: 'BUSINESS & TRADE',
    titleJa: 'ビジネス & 貿易',
    subtitle: 'Bilateral Investments, Joint Ventures & Market Access',
    subtitleJa: '二国間投資、合弁事業、および市場アクセス',
    icon: 'TrendingUp',
    color: 'from-amber-600 to-red-700',
    highlights: [
      'Direct business matching between Okayama manufacturing / SME leaders and Bangladeshi companies',
      'Export-import corridors: textiles, agricultural produce, machinery, and precision tools',
      'Special Economic Zones (SEZs) incentives in Bangladesh for Japanese investors',
      'Legal, tax, and regulatory roadmaps for cross-border enterprise partnerships',
    ],
    highlightsJa: [
      '岡山の製造業/SMEリーダーとバングラデシュ企業間の直接ビジネスマッチング',
      '輸出入回廊：繊維、農産物、機械、および精密工具',
      '日本の投資家向けのバングラデシュの経済特区（SEZ）インセンティブ',
      '国境を越えた企業パートナーシップのための法的、税務、および規制のロードマップ',
    ],
    description:
      'Fostering robust commercial synergy, supply chain diversification, and collaborative venture creation between Okayama’s robust manufacturing heritage and Bangladesh’s dynamic market.',
    descriptionJa: '岡山の強固な製造業の伝統とバングラデシュのダイナミックな市場との間で、強力な商業的相乗効果、サプライチェーンの多様化、および共同ベンチャーの創出を促進します。',
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
