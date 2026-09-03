import React, { useState } from 'react';
import { SPEAKERS } from '../data/seminarData';
import { Speaker, NavigationPage } from '../types';
import { Award, Clock, Building2, User, Sparkles, MessageSquare, CheckCircle2, Send, ArrowRight, ExternalLink } from 'lucide-react';

interface SpeakersPageProps {
  onOpenRegister: () => void;
  onNavigate: (page: NavigationPage) => void;
  highlightedSpeakerId?: string;
}

export const SpeakersPage: React.FC<SpeakersPageProps> = ({
  onOpenRegister,
  onNavigate,
  highlightedSpeakerId,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeSpeakerForQuestion, setActiveSpeakerForQuestion] = useState<Speaker | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const categories = [
    { id: 'all', label: 'All Speakers (8)' },
    { id: 'keynote', label: 'Keynote Presenter' },
    { id: 'government_diplomatic', label: 'Parliamentary & Diplomatic' },
    { id: 'business', label: 'Business & Trade' },
    { id: 'education_culture', label: 'Education & Cultural Exchange' },
  ];

  const filteredSpeakers = SPEAKERS.filter((speaker) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'keynote') return speaker.isKeynote;
    if (filterCategory === 'government_diplomatic') return speaker.category === 'government' || speaker.category === 'diplomatic';
    if (filterCategory === 'business') return speaker.category === 'business';
    if (filterCategory === 'education_culture') return speaker.category === 'education' || speaker.category === 'culture';
    return true;
  });

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setSubmittedMessage(true);
    setTimeout(() => {
      setQuestionText('');
      setUserEmail('');
      setSubmittedMessage(false);
      setActiveSpeakerForQuestion(null);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-script text-3xl sm:text-4xl text-[#d90429] font-bold block -mb-1">
          Our Honored
        </span>
        <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
          GUEST SPEAKERS & KEYNOTE
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Meet the visionary statesmen, diplomats, educational leaders, and corporate pioneers shaping the next chapter of Okayama-Bangladesh cooperation.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${filterCategory === cat.id
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* KEYNOTE SPOTLIGHT */}
      {SPEAKERS.filter((s) => s.isKeynote).map((keynote) => (
        <div
          key={keynote.id}
          className="relative bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 flex-1">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d90429] text-white text-xs font-headline font-bold uppercase tracking-wider shadow-md">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Keynote Speaker & Presenter</span>
              </div>

              {/* Name and Title */}
              <div>
                <h2 className="font-headline text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  {keynote.name}
                </h2>
                <div className="text-base font-bold text-indigo-300 mt-1">
                  {keynote.role}, <span className="text-white">{keynote.organization}</span>
                </div>
              </div>

              {/* Topic */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
                <div className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                  Keynote Speech Topic
                </div>
                <div className="font-headline text-lg sm:text-xl font-bold text-white mt-1">
                  {keynote.topic}
                </div>

              </div>

              {/* Bio */}
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {keynote.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveSpeakerForQuestion(keynote)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Ask Syed Ruhul Huq a Question</span>
                </button>

                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <span>Attend Keynote &rarr;</span>
                </button>
              </div>

            </div>

            {/* Avatar / Badge Visual */}
            <div className="w-full lg:w-72 shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-600 to-rose-600 p-1 mb-4 shadow-xl">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <User className="w-14 h-14 text-indigo-200" />
                </div>
              </div>
              <div className="font-headline text-lg font-bold text-white uppercase">
                {keynote.name}
              </div>
              <div className="text-xs text-indigo-300 font-semibold">
                Managing Director, TSI Limited
              </div>
              <div className="mt-3 text-[11px] text-slate-400">
                Leading the 2026-2030 Roadmap Presentation
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* HONORED SPEAKERS DIRECTORY */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h3 className="font-headline text-2xl font-bold text-slate-900 uppercase tracking-tight">
            Distinguished Guest Speakers
          </h3>
          <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            {filteredSpeakers.filter((s) => !s.isKeynote).length} Speakers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSpeakers
            .filter((s) => !s.isKeynote)
            .map((speaker) => {
              const isTargeted = highlightedSpeakerId === speaker.id;

              return (
                <div
                  key={speaker.id}
                  className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all hover:border-indigo-400 hover:shadow-md ${isTargeted ? 'border-indigo-500 ring-2 ring-indigo-400/30 bg-indigo-50/20' : 'border-slate-200'
                    }`}
                >
                  <div className="space-y-3">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-headline text-xl font-bold text-slate-900 uppercase tracking-wide">
                            {speaker.name}
                          </h4>
                          <div className="text-xs font-semibold text-indigo-600">
                            {speaker.role}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {speaker.organization}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Speech topic */}
                    {speaker.topic && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                        <div className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                          Address Topic
                        </div>
                        <div className="font-semibold text-slate-900 mt-0.5">
                          {speaker.topic}
                        </div>

                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {speaker.bio}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveSpeakerForQuestion(speaker)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Submit Question</span>
                    </button>

                    <button
                      onClick={onOpenRegister}
                      className="text-xs font-bold text-[#d90429] hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Join Session</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* QUESTION MODAL FOR SPECIFIC SPEAKER */}
      {activeSpeakerForQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-900">
            <h3 className="font-headline text-xl font-bold text-slate-900 uppercase">
              Submit Question to {activeSpeakerForQuestion.name}
            </h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              {activeSpeakerForQuestion.role}, {activeSpeakerForQuestion.organization}
            </p>

            <form onSubmit={handleSendQuestion} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Email (for response / follow-up)
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-hidden focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Question
                </label>
                <textarea
                  rows={4}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder={`Write your question for ${activeSpeakerForQuestion.name}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-hidden focus:border-indigo-500 focus:bg-white placeholder:text-slate-400"
                />
              </div>

              {submittedMessage ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Question submitted successfully to the seminar moderator!</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSpeakerForQuestion(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Question</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
