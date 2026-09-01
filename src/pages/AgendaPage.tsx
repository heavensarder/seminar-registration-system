import React, { useState } from 'react';
import { AGENDA_SESSIONS, SEMINAR_THEMES, SPEAKERS } from '../data/seminarData';
import { NavigationPage } from '../types';
import { Clock, MapPin, GraduationCap, Users, TrendingUp, Sparkles, CheckCircle2, User, Printer, Download, Calendar } from 'lucide-react';

interface AgendaPageProps {
  onOpenRegister: () => void;
  onNavigate: (page: NavigationPage) => void;
  onSelectSpeaker?: (speakerId: string) => void;
}

export const AgendaPage: React.FC<AgendaPageProps> = ({
  onOpenRegister,
  onNavigate,
  onSelectSpeaker,
}) => {
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('all');

  const filteredSessions = AGENDA_SESSIONS.filter((session) => {
    if (selectedThemeFilter === 'all') return true;
    return session.theme === selectedThemeFilter || session.theme === 'general';
  });

  const getSpeakerById = (id: string) => SPEAKERS.find((s) => s.id === id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-script text-3xl sm:text-4xl text-[#d90429] font-bold block -mb-1">
          Kizuna 2026 Program
        </span>
        <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
          SEMINAR THEMES & TIMELINE
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Saturday, September 19, 2026 • 14:00 – 16:00 JST (Doors Open 13:30) • Okayama International Exchange Center
        </p>
      </div>

      {/* 3 CORE THEMES DEEP DIVE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEMINAR_THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-all ${
              selectedThemeFilter === theme.id ? 'border-indigo-600 ring-2 ring-indigo-400/30 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
                  {theme.id === 'study' && <GraduationCap className="w-6 h-6 text-indigo-600" />}
                  {theme.id === 'human-resources' && <Users className="w-6 h-6 text-indigo-600" />}
                  {theme.id === 'business' && <TrendingUp className="w-6 h-6 text-amber-600" />}
                </div>
                <button
                  onClick={() => setSelectedThemeFilter(selectedThemeFilter === theme.id ? 'all' : theme.id)}
                  className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    selectedThemeFilter === theme.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {selectedThemeFilter === theme.id ? 'Active Filter' : 'Filter Agenda'}
                </button>
              </div>

              <h3 className="font-headline text-2xl font-black text-slate-900 uppercase tracking-tight">
                {theme.title}
              </h3>
              <p className="text-xs font-bold text-indigo-600 mt-0.5">
                {theme.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {theme.description}
              </p>

              {/* Highlights */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  Key Focus Areas
                </span>
                {theme.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED SCHEDULE TIMELINE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md space-y-8">
        
        {/* Timeline Header & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Official Program Schedule</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight mt-1">
              Timeline of Events
            </h2>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedThemeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedThemeFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Sessions ({AGENDA_SESSIONS.length})
            </button>
            <button
              onClick={() => setSelectedThemeFilter('study')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedThemeFilter === 'study'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Study in Japan
            </button>
            <button
              onClick={() => setSelectedThemeFilter('human-resources')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedThemeFilter === 'human-resources'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Human Resources
            </button>
            <button
              onClick={() => setSelectedThemeFilter('business')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedThemeFilter === 'business'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Business & Trade
            </button>
          </div>
        </div>

        {/* Sessions Vertical Stack */}
        <div className="space-y-6">
          {filteredSessions.map((session, index) => {
            const isKeynote = session.title.includes('KEYNOTE');

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all ${
                  isKeynote
                    ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {/* Time Column */}
                <div className="md:w-48 shrink-0 flex flex-col justify-between">
                  <div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      isKeynote ? 'bg-slate-800 text-amber-300 border border-slate-700' : 'bg-white border border-slate-200 text-indigo-700 shadow-2xs'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{session.time}</span>
                    </div>
                    {session.room && (
                      <div className={`text-[11px] font-semibold mt-2 flex items-center gap-1 ${
                        isKeynote ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <MapPin className="w-3 h-3 text-[#d90429]" />
                        <span>{session.room}</span>
                      </div>
                    )}
                  </div>

                  {session.theme !== 'general' && (
                    <div className="mt-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        isKeynote ? 'bg-slate-800 text-indigo-300 border border-slate-700' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {session.theme.replace('-', ' ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Session Content Column */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {isKeynote && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d90429] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        KEYNOTE
                      </span>
                    )}
                    <h3 className={`font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight ${
                      isKeynote ? 'text-white' : 'text-slate-900'
                    }`}>
                      {session.title}
                    </h3>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isKeynote ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {session.description}
                  </p>

                  {/* Associated Speakers */}
                  {session.speakerIds.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-bold uppercase mr-1 ${
                        isKeynote ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>
                        Presenting:
                      </span>
                      {session.speakerIds.map((spId) => {
                        const sp = getSpeakerById(spId);
                        if (!sp) return null;
                        return (
                          <div
                            key={spId}
                            onClick={() => {
                              if (onSelectSpeaker) onSelectSpeaker(spId);
                              onNavigate('speakers');
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                              isKeynote
                                ? 'bg-slate-800 border border-slate-700 hover:border-indigo-400 text-slate-200'
                                : 'bg-white border border-slate-200 hover:border-indigo-400 text-slate-800 shadow-2xs'
                            }`}
                          >
                            <User className="w-3 h-3 text-indigo-500" />
                            <span>{sp.name}</span>
                            <span className={`text-[10px] ${isKeynote ? 'text-slate-400' : 'text-slate-500'}`}>({sp.organization})</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-700">
            <span className="font-bold text-slate-900 block">Simultaneous Interpretation:</span>
            Japanese, English, and Bengali headsets available for all panel sessions.
          </div>
          <button
            onClick={onOpenRegister}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Register for Seminar
          </button>
        </div>

      </div>

    </div>
  );
};
