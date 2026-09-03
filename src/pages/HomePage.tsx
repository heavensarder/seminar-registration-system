import React, { useState } from 'react';
import { HomeHero } from '../components/HomeHero';
import { CountdownTimer } from '../components/CountdownTimer';
import { NavigationPage, Language } from '../types';
import { SEMINAR_DETAILS, SPEAKERS, SEMINAR_THEMES, FAQS } from '../data/seminarData';
import { ArrowRight, Sparkles, CheckCircle2, MessageSquare, HelpCircle, Send, Award, BookOpen, Users, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onOpenRegister: () => void;
  onNavigate: (page: NavigationPage) => void;
  onSelectSpeaker?: (speakerId: string) => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenRegister,
  onNavigate,
  onSelectSpeaker,
  language,
}) => {
  const [quickQuestion, setQuickQuestion] = useState('');
  const [selectedTargetSpeaker, setSelectedTargetSpeaker] = useState(SPEAKERS[0].id);
  const [questionSent, setQuestionSent] = useState(false);

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    setQuestionSent(true);
    setTimeout(() => {
      setQuickQuestion('');
      setQuestionSent(false);
    }, 4000);
  };

  return (
    <div className="space-y-12">
      
      {/* POSTER HERO COMPONENT (Homage to uploaded seminar design) */}
      <HomeHero
        onOpenRegister={onOpenRegister}
        onNavigate={onNavigate}
        onSelectSpeaker={onSelectSpeaker}
      />

      {/* COUNTDOWN & CALENDAR SYNC SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <CountdownTimer isJa={language === 'ja'} />
      </div>

      {/* WHY ATTEND / SEMINAR IMPACT PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Strategic Bilateral Platform</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            Why Kizuna 2026 Matters
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Bridging Japan’s regional industrial hub of Okayama with Bangladesh’s vibrant, young economy to unlock high-impact partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEMINAR_THEMES.map((theme, idx) => {
            const icons = {
              study: <BookOpen className="w-6 h-6 text-indigo-600" />,
              'human-resources': <Users className="w-6 h-6 text-indigo-600" />,
              business: <TrendingUp className="w-6 h-6 text-amber-600" />,
            };

            return (
              <div
                key={theme.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {icons[theme.id as keyof typeof icons] || <Sparkles className="w-6 h-6 text-indigo-600" />}
                  </div>

                  <h3 className="font-headline text-xl font-bold text-slate-900 uppercase tracking-wide group-hover:text-indigo-600 transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 mt-0.5">
                    {theme.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {theme.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                    {theme.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onNavigate('agenda')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:text-indigo-800 cursor-pointer"
                  >
                    <span>Explore Theme Agenda</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK PRE-SEMINAR QUESTION SUBMISSION BOX */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Interactive Audience Voice</span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                Submit a Question for the Speakers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Have a specific question about higher education in Okayama, engineering visas, or business partnerships? Submit it beforehand so our distinguished panel can address it directly during the live Q&A session.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSendQuestion} className="space-y-3 bg-slate-950/90 p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-inner">
                <div>
                  <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                    Select Honored Speaker
                  </label>
                  <select
                    value={selectedTargetSpeaker}
                    onChange={(e) => setSelectedTargetSpeaker(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden focus:border-indigo-400"
                  >
                    {SPEAKERS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role}, {s.organization})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                    Your Question
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={quickQuestion}
                    onChange={(e) => setQuickQuestion(e.target.value)}
                    placeholder="e.g. What are the key support systems for Bangladeshi technical talent transitioning to Okayama enterprises?"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden focus:border-indigo-400 placeholder:text-slate-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {questionSent ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Question received! Our moderator has queued your inquiry.</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Questions reviewed by the Seminar Secretariat.
                    </span>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Question</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Attendee FAQs</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2.5">
                <span className="text-[#d90429] font-headline font-black text-base">Q.</span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-6 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-script text-3xl sm:text-4xl text-[#ff6b6b] font-bold block">
              Kizuna 2026
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              Shape the Future of Okayama & Bangladesh
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Join distinguished statesmen, diplomats, educational leaders, and corporate visionaries this September 19, 2026.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenRegister}
                className="px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-headline text-base font-bold uppercase tracking-wider shadow-lg hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
              >
                Reserve Your Free Pass
              </button>
              <button
                onClick={() => onNavigate('venue')}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 backdrop-blur-xs transition-colors cursor-pointer"
              >
                View Venue Directions &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
