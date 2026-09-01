import React, { useState } from 'react';
import { SPONSORS, SEMINAR_DETAILS } from '../data/seminarData';
import { NavigationPage } from '../types';
import { TsiLogo } from '../components/TsiLogo';
import { Building2, Globe, Mail, Phone, ShieldCheck, Sparkles, Send, CheckCircle2, ArrowRight, HeartHandshake } from 'lucide-react';

interface AboutPageProps {
  onOpenRegister: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenRegister, onNavigate }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('corporate');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentInquiry, setSentInquiry] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) return;
    setSentInquiry(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setSentInquiry(false);
    }, 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-script text-3xl sm:text-4xl text-[#d90429] font-bold block -mb-1">
          Kizuna (絆) Initiative
        </span>
        <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
          ABOUT THE SEMINAR & ORGANIZERS
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          “Kizuna” (絆) represents the enduring bond of friendship, trust, and shared prosperity between the people of Japan and Bangladesh.
        </p>
      </div>

      {/* BILATERAL FRIENDSHIP STORY CARD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
              Bilateral Strategic Partnership
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Connecting Okayama & Bangladesh
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Japan was one of the earliest countries to recognize the independence of Bangladesh in 1972. Over more than five decades, this relationship has matured into a Comprehensive Strategic Partnership anchored in deep mutual respect, development cooperation, and cultural affinity.
          </p>
          <p>
            Today, as Bangladesh thrives as a high-growth South Asian economic hub with an energetic youth demographic, Okayama Prefecture offers unparalleled industrial expertise, distinguished academic institutions, and an active business environment ready to welcome global talents and collaborative ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="font-headline text-2xl sm:text-3xl font-bold text-indigo-600">
              50+ Years
            </div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">
              Diplomatic Friendship & Trust
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="font-headline text-2xl sm:text-3xl font-bold text-slate-900">
              170 Million+
            </div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">
              Dynamic Population & Talent
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="font-headline text-2xl sm:text-3xl font-bold text-[#d90429]">
              3 Pillars
            </div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">
              Education, Human Resources, Trade
            </div>
          </div>
        </div>
      </div>

      {/* HOST & SPONSORS PROFILES */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Host & Sponsoring Organizations
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            The pioneering corporations and diplomatic institutions making Kizuna 2026 possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPONSORS.map((sponsor, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {sponsor.role}
                  </span>

                  {sponsor.type === 'host' && (
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-2xs">
                      <TsiLogo size="sm" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-headline text-2xl font-bold text-slate-900 uppercase tracking-tight">
                    {sponsor.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-indigo-600 font-semibold">
                  Official Kizuna 2026 Partner
                </span>
                <button
                  onClick={onOpenRegister}
                  className="text-xs font-bold text-[#d90429] hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Connect at Seminar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECRETARIAT CONTACT / B2B INQUIRY FORM */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-bold uppercase">
              <Mail className="w-3.5 h-3.5" />
              <span>Seminar Secretariat</span>
            </div>
            <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Contact Organizing Committee
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For corporate delegations, sponsorship inquiries, press credentials, or academic collaboration inquiries, please reach out to the Kizuna 2026 Secretariat.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>info@kizuna2026-okayama.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+81 86-256-2914 (Okayama Secretariat Office)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Tokyo Office: TSI Limited Japan Liaison</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmitInquiry} className="space-y-3 bg-slate-950/90 p-6 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-300 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Kenji Sato / Dr. Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-300 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden focus:border-indigo-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-1">
                  Inquiry Category
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden focus:border-indigo-400"
                >
                  <option value="corporate">Corporate B2B Matchmaking</option>
                  <option value="academic">University / School Exchange Inquiry</option>
                  <option value="media">Press & Media Accreditation</option>
                  <option value="diplomatic">VIP / Diplomatic Delegation</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-1">
                  Message Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Describe your inquiry or matchmaking proposal..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden focus:border-indigo-400 placeholder:text-slate-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {sentInquiry ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inquiry sent! The Secretariat will respond within 24 hours.</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Direct reply from the Organizing Committee.
                  </span>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};
