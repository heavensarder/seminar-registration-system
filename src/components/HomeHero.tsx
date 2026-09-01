import React, { useState } from 'react';
import { Calendar, Clock, MapPin, GraduationCap, Users, TrendingUp, ArrowRight, Languages } from 'lucide-react';
import { SPEAKERS } from '../data/seminarData';
import { TsiLogo } from './TsiLogo';

interface HomeHeroProps {
  onOpenRegister: () => void;
  onSelectSpeaker: (speakerId: string) => void;
  onOpenVenue: () => void;
  onOpenTheme: (themeId: string) => void;
  onOpenOrganizer: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onOpenRegister,
  onSelectSpeaker,
  onOpenVenue,
  onOpenTheme,
  onOpenOrganizer,
}) => {
  const [isJa, setIsJa] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#052322] py-4 sm:py-8">
      {/* Main Poster Container */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 relative">
        {/* Language Toggle Button */}
        <div className="absolute top-4 right-4 sm:top-2 sm:right-8 z-50">
          <button
            onClick={() => setIsJa(!isJa)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-xs font-bold transition-colors backdrop-blur-sm shadow-lg cursor-pointer"
          >
            <Languages className="w-4 h-4" />
            <span>{isJa ? 'EN' : '日本語'}</span>
          </button>
        </div>

        {/* POSTER FLYER CANVAS - EXACT COLOR SCHEMA MATCHING FLYER */}
        <div className="relative bg-[#083331] text-white rounded-3xl shadow-2xl shadow-black/60 overflow-hidden border border-[#165a55] print:border-none print:shadow-none print:rounded-none">
          
          {/* ======================================================== */}
          {/* TOP SECTION: Deep Forest Teal with Castle Watermark       */}
          {/* ======================================================== */}
          <div className="relative bg-gradient-to-b from-[#072d2b] to-[#0c403d] p-6 sm:p-10 lg:p-12 pb-14 sm:pb-16 overflow-hidden">
            
            {/* Japanese Pagoda / Okayama Castle Silhouette Watermark in Top Right */}
            <div className="absolute -top-6 -right-6 w-72 sm:w-96 h-72 sm:h-96 opacity-15 pointer-events-none select-none">
              <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-100" fill="currentColor">
                {/* Spire / Pagoda Finial */}
                <rect x="98" y="10" width="4" height="30" />
                <circle cx="100" cy="18" r="4" />
                <circle cx="100" cy="26" r="5" />
                <circle cx="100" cy="34" r="6" />
                {/* Top tier roof */}
                <path d="M 60 55 Q 100 48 140 55 L 132 45 Q 100 40 68 45 Z" />
                <rect x="85" y="55" width="30" height="15" />
                {/* Tier 2 roof */}
                <path d="M 45 78 Q 100 68 155 78 L 145 68 Q 100 60 55 68 Z" />
                <rect x="75" y="78" width="50" height="18" />
                {/* Tier 3 roof */}
                <path d="M 30 105 Q 100 92 170 105 L 158 92 Q 100 82 42 92 Z" />
                <rect x="65" y="105" width="70" height="22" />
                {/* Castle Main Roof & Base */}
                <path d="M 15 138 Q 100 120 185 138 L 172 122 Q 100 110 28 122 Z" />
                <rect x="50" y="138" width="100" height="40" />
                {/* Stone Foundation */}
                <path d="M 30 180 L 170 180 L 180 200 L 20 200 Z" opacity="0.6" />
              </svg>
            </div>

            {/* Kizuna 2026 Script Branding with Red Accent Bar */}
            <div className="flex items-center justify-center gap-3 mb-2 relative z-10 pt-4 sm:pt-0">
              <div className="hidden sm:block w-1.5 h-11 bg-[#e62b32] rounded-full shrink-0"></div>
              <div className="relative">
                <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#e62b32] font-bold tracking-wide select-none drop-shadow-sm">
                  Kizuna 2026
                </span>
                <div className="h-0.5 w-full bg-[#e62b32] mt-0.5 rounded-full opacity-80"></div>
              </div>
            </div>

            {/* Main Seminar Title in Condensed Oswald Display Typography */}
            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mt-4 drop-shadow-md relative z-10 text-center">
              {isJa ? '岡山・バングラデシュ パートナーシップセミナー' : 'OKAYAMA-BANGLADESH PARTNERSHIP SEMINAR'}
            </h1>

            {/* Subtitles */}
            <div className="mt-3 space-y-2 relative z-10 text-center">
              <p className="font-headline text-sm sm:text-lg font-bold text-white tracking-wider uppercase italic">
                {isJa ? '岡山とバングラデシュの未来をつなぐ' : 'CONNECTING THE FUTURE OF OKAYAMA AND BANGLADESH'}
              </p>
              <p className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#d5eeec] uppercase">
                {isJa ? '人をつなぎ、機会を創出し、未来を築く' : 'CONNECTING PEOPLE, CREATING OPPORTUNITIES, BUILDING THE FUTURE'}
              </p>
            </div>

            {/* Overview Description Box */}
            <p className="mt-6 text-xs sm:text-sm text-[#f0fbfb] leading-relaxed max-w-3xl font-normal relative z-10 text-center mx-auto">
              {isJa 
                ? 'バングラデシュは、若く優秀な人材を擁し、急速な成長を続けています。日本への留学、日本語教育、高度人材の育成から、ビジネスや貿易の機会まで、本セミナーでは、岡山とバングラデシュが教育、人材、ビジネスの分野でどのように協力し、明るい未来を築くことができるかを探ります。' 
                : 'Bangladesh continues its rapid growth with a young and talented population. From study in Japan, Japanese language education, skilled workforce development, to business and trade opportunities—this seminar will explore how Okayama and Bangladesh can work together in education, human resources, and business for a brighter future.'}
            </p>

            {/* 3 Event Detail Columns with Circular Icons */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 md:items-start justify-items-center">
              
              {/* DATE - Red circle with white calendar */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-[#e62b32] flex items-center justify-center text-white shrink-0 shadow-md mt-0.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-extrabold text-white uppercase tracking-wider mb-0.5">
                    {isJa ? '日時:' : 'DATE:'}
                  </div>
                  <div className="text-sm text-white font-medium">
                    {isJa ? '2026年9月19日 (土)' : 'Saturday, September 19, 2026'}
                  </div>
                </div>
              </div>

              {/* TIME - White circle with red clock */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#e62b32] shrink-0 shadow-md mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-extrabold text-white uppercase tracking-wider mb-0.5">
                    {isJa ? '時間:' : 'TIME:'}
                  </div>
                  <div className="text-sm text-white font-medium">
                    14:00 – 16:00
                  </div>
                  <div className="text-[11px] text-[#bce7e4]">
                    {isJa ? '(開場 13:30)' : '(Doors Open 13:30)'}
                  </div>
                </div>
              </div>

              {/* VENUE - White circle with red map pin */}
              <div 
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#e62b32] shrink-0 shadow-md mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-extrabold text-white uppercase tracking-wider mb-0.5">
                    {isJa ? '会場:' : 'VENUE:'}
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">
                    {isJa ? '岡山国際交流センター' : 'Okayama International Exchange Center'}
                  </div>
                  <div className="text-[10px] text-[#c5ece9] mt-0.5 max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                    {isJa ? '岡山市北区奉還町2-2-1' : '2-2-1 Hokan-cho, Kita-ku, Okayama City'}
                  </div>
                </div>
              </div>

            </div>

            {/* Downward Wave Curve at the bottom of the header */}
            <div className="absolute -bottom-1 left-0 right-0 h-8 sm:h-10 text-[#cae7e5] overflow-hidden pointer-events-none">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-current">
                <path d="M0,0 C150,90 350,-40 600,40 C850,120 1050,10 1200,60 L1200,120 L0,120 Z"></path>
              </svg>
            </div>

          </div>

          {/* ======================================================== */}
          {/* MIDDLE SECTION: Seafoam / Mint Gradient with Guest Speakers */}
          {/* ======================================================== */}
          <div className="relative bg-gradient-to-b from-[#cae7e5] via-[#aed8d5] to-[#7dbcb9] p-6 sm:p-10 lg:p-12 text-[#053733]">
            
            {/* Harbor / Port Cargo Silhouette Subtle Watermark */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-center">
              <svg viewBox="0 0 800 400" className="w-full h-full text-[#083331]" fill="currentColor">
                {/* Cargo crane */}
                <path d="M100,300 L120,150 L250,120 L280,140 L160,170 L140,300 Z" />
                <path d="M220,125 L350,100 L340,110 L240,130 Z" />
                {/* Ship hull */}
                <path d="M400,280 L750,280 L720,330 L380,330 Z" />
                <rect x="440" y="240" width="40" height="40" />
                <rect x="490" y="220" width="50" height="60" />
                <rect x="550" y="200" width="60" height="80" />
                <rect x="620" y="230" width="40" height="50" />
              </svg>
            </div>

            {/* Section Header: "Our Honored" (cursive red) + "GUEST SPEAKERS" (dark teal) */}
            <div className="text-center mb-6 relative z-10">
              <span className="font-script text-3xl sm:text-4xl text-[#e62b32] font-bold block -mb-2 drop-shadow-xs">
                {isJa ? '特別' : 'Our Honored'}
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#053733] italic uppercase tracking-tight">
                {isJa ? 'ゲストスピーカー' : 'GUEST SPEAKERS'}
              </h2>
            </div>

            {/* List of Honored Guest Speakers matching the exact flyer pills */}
            <div className="space-y-2.5 max-w-3xl mx-auto relative z-10">
              {SPEAKERS.filter((s) => !s.isKeynote).map((speaker) => (
                <div
                  key={speaker.id}
                  onClick={() => onSelectSpeaker(speaker.id)}
                  className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0d4643]/90 hover:bg-[#083331] border border-[#145d58]/60 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  title={isJa ? `略歴を見る: ${speaker.name}` : `View bio: ${speaker.name}`}
                >
                  {/* Crisp Solid White Circle Indicator */}
                  <div className="w-3.5 h-3.5 rounded-full bg-white shrink-0 shadow-xs group-hover:scale-125 transition-transform"></div>

                  {/* Speaker Name & Designation */}
                  <div className="flex flex-wrap items-baseline gap-x-2 text-left min-w-0">
                    <span className="font-headline font-bold text-white text-xs sm:text-sm md:text-base tracking-wide">
                      {isJa && speaker.nameJa ? speaker.nameJa : speaker.name},
                    </span>
                    <span className="text-xs sm:text-sm text-[#d4f2f0] font-normal truncate">
                      {isJa 
                        ? (speaker.role === 'Member of the House of Representatives' ? '衆議院議員' : 
                           speaker.role === 'Ambassador of Bangladesh to Japan' ? '駐日バングラデシュ大使' : 
                           speaker.role === 'Counsellor (Labour & Welfare)' ? '参事官（労働・福祉）' : 
                           speaker.role === 'Chairman' ? '会長' : 
                           speaker.role === 'Executive Director, TSI Limited, Bangladesh &' ? 'TSIリミテッド バングラデシュ 専務取締役 兼' : 
                           speaker.role === 'CEO' ? 'CEO' : 
                           speaker.role === 'Chairperson' ? '理事長' : 
                           speaker.role === 'Managing Director' ? '専務取締役' : speaker.role) 
                        : speaker.role}
                      {speaker.organization 
                        ? `, ${isJa 
                            ? (speaker.organization === 'Okayama 1st District' ? '岡山1区' :
                               speaker.organization === 'Embassy of Bangladesh in Tokyo' ? '在東京バングラデシュ大使館' :
                               speaker.organization === 'TSI Group, Bangladesh' ? 'TSIグループ・バングラデシュ' :
                               speaker.organization === 'Former Deputy Head, PR & Cultural Section, Embassy of Japan in Bangladesh' ? '元 在バングラデシュ日本国大使館 広報文化部長' :
                               speaker.organization === 'ZenmiraiJapan Co., Ltd.' ? '株式会社ZenmiraiJapan' :
                               speaker.organization === 'Okayama Gairo Gakuin' ? '岡山外語学院' :
                               speaker.organization === 'TSI Limited' ? 'TSIリミテッド' : speaker.organization)
                            : speaker.organization}` 
                        : ''}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#79ded7] ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              ))}

              {/* Special Keynote Speaker Pill: White background with red badge */}
              {SPEAKERS.filter((s) => s.isKeynote).map((keynote) => (
                <div
                  key={keynote.id}
                  onClick={() => onSelectSpeaker(keynote.id)}
                  className="group flex flex-col sm:flex-row sm:items-center items-center gap-2.5 p-2 sm:p-2 sm:pr-5 rounded-3xl sm:rounded-full bg-white shadow-xl hover:shadow-2xl border-2 border-white hover:border-[#e62b32] transition-all duration-200 cursor-pointer mt-3"
                  title={isJa ? "基調講演の詳細を見る" : "Click to view Keynote details"}
                >
                  {/* Red Rounded Capsule Badge */}
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#e62b32] text-white text-xs sm:text-sm font-headline font-bold uppercase tracking-wider shrink-0 shadow-xs text-center sm:text-left w-full sm:w-auto">
                    {isJa ? '基調講演 & プレゼンター' : 'KEYNOTE SPEAKER & PRESENTER'}
                  </div>

                  {/* Keynote Name & Title */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline items-center gap-x-2 px-2 text-center sm:text-left min-w-0">
                    <span className="font-headline font-black text-[#083331] text-sm sm:text-base md:text-lg tracking-wide uppercase">
                      {isJa && keynote.nameJa ? keynote.nameJa : keynote.name},
                    </span>
                    <span className="text-xs sm:text-sm text-[#0f4e4b] font-semibold">
                      {isJa ? (keynote.role === 'Managing Director' ? '専務取締役' : keynote.role) : keynote.role}, {isJa ? (keynote.organization === 'TSI Limited' ? 'TSIリミテッド' : keynote.organization) : keynote.organization}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#e62b32] ml-auto hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              ))}
            </div>

          </div>

          {/* ======================================================== */}
          {/* LOWER SECTION: Deep Forest Teal with Seminar Themes      */}
          {/* ======================================================== */}
          <div className="p-6 sm:p-10 lg:p-12 border-t border-[#1a645f] bg-gradient-to-b from-[#0d4643] to-[#072f2d] text-white">
            
            {/* Header: SEMINAR THEMES (Italic white font) */}
            <div className="text-center mb-8">
              <h2 className="font-headline text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tight">
                {isJa ? 'セミナーテーマ' : 'SEMINAR THEMES'}
              </h2>
            </div>

            {/* 3 Columns separated by vertical white hairline dividers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 max-w-3xl mx-auto items-center">
              
              {/* THEME 1: STUDY IN JAPAN */}
              <div
                onClick={() => onOpenTheme('study')}
                className="flex flex-col md:flex-row items-center justify-center gap-3.5 md:px-4 md:border-r md:border-white/30 cursor-pointer group hover:opacity-90 transition-opacity"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#083331] shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6 text-[#083331]" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-headline text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-[#9feae4]">
                    {isJa ? '日本留学' : <><span className="hidden md:inline">STUDY IN JAPAN</span><span className="md:hidden">STUDY</span><span className="md:hidden block">IN JAPAN</span></>}
                  </h3>
                </div>
              </div>

              {/* THEME 2: HUMAN RESOURCES */}
              <div
                onClick={() => onOpenTheme('human-resources')}
                className="flex flex-col md:flex-row items-center justify-center gap-3.5 md:px-4 md:border-r md:border-white/30 cursor-pointer group hover:opacity-90 transition-opacity"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#083331] shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#083331]" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-headline text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-[#9feae4]">
                    {isJa ? '人材' : <><span className="hidden md:inline">HUMAN RESOURCES</span><span className="md:hidden">HUMAN</span><span className="md:hidden block">RESOURCES</span></>}
                  </h3>
                </div>
              </div>

              {/* THEME 3: BUSINESS & TRADE */}
              <div
                onClick={() => onOpenTheme('business')}
                className="flex flex-col md:flex-row items-center justify-center gap-3.5 md:px-4 cursor-pointer group hover:opacity-90 transition-opacity"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#083331] shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6 text-[#083331]" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-headline text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-[#9feae4]">
                    {isJa ? 'ビジネス & 貿易' : <><span className="hidden md:inline">BUSINESS &amp; TRADE</span><span className="md:hidden">BUSINESS</span><span className="md:hidden block">&amp; TRADE</span></>}
                  </h3>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* BOTTOM CARDS: Register Box (QR) & Host / Sponsors Card    */}
          {/* ======================================================== */}
          <div className="p-6 sm:p-10 lg:p-12 bg-[#052624] border-t border-[#13504c]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
              
              {/* LEFT CARD: REGISTER NOW (BUTTON ONLY) */}
              <div className="flex flex-col justify-between items-center p-5 sm:p-6 rounded-3xl bg-[#083331] border border-[#16605b] shadow-xl text-center">
                <div className="space-y-2.5 flex flex-col items-center">
                  <div className="inline-block px-3 py-0.5 rounded-full bg-[#e62b32] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    {isJa ? '座席数に限りがあります' : 'LIMITED SEATS AVAILABLE'}
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-black italic text-white tracking-tight">
                    {isJa ? '今すぐ登録' : 'REGISTER NOW'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b8ebe7] leading-relaxed max-w-[280px]">
                    {isJa ? '岡山・バングラデシュ パートナーシップセミナー 2026 の無料パスをご予約ください。' : 'Reserve your complimentary pass for the Okayama-Bangladesh Partnership Seminar 2026.'}
                  </p>
                </div>

                <div className="pt-4 w-full">
                  <button
                    id="poster-register-btn"
                    onClick={onOpenRegister}
                    className="w-full px-6 py-3 rounded-2xl bg-[#e62b32] hover:bg-[#cc181f] text-white font-headline font-black italic tracking-wide text-base sm:text-lg shadow-lg hover:shadow-red-900/40 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>{isJa ? '今すぐ登録' : 'REGISTER NOW'}</span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* RIGHT CARD: Host & Sponsors Card */}
              <div 
                onClick={onOpenOrganizer}
                className="bg-white text-slate-900 rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200 cursor-pointer hover:border-teal-400 transition-colors flex flex-col justify-between group"
                title={isJa ? "主催と協賛の詳細を見る" : "Click to view host and sponsors details"}
              >
                <div className="text-center italic font-serif text-xs text-slate-700 font-medium mb-3">
                  {isJa ? '主催 & 協賛' : 'Host & Sponsors'}
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  
                  {/* TSI Logo */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <TsiLogo size="lg" />
                  </div>

                  {/* Sponsor Names List matching flyer */}
                  <div className="space-y-1 text-xs text-left">
                    <div className="font-bold text-slate-900 tracking-tight leading-tight">
                      ZENMIRAI JAPAN
                    </div>
                    <div className="font-medium text-slate-700 tracking-tight leading-tight">
                      Hudsonland Bangladesh Ltd.
                    </div>
                    <div className="font-medium text-slate-700 tracking-tight leading-tight">
                      Embassy of Bangladesh in Japan
                    </div>
                  </div>

                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{isJa ? '二国間組織パートナー' : 'Bilateral Organizing Partners'}</span>
                  <span className="text-[#083331] font-bold group-hover:underline">
                    {isJa ? '詳細を見る \u2192' : 'View Details \u2192'}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
