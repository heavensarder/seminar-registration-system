import React from 'react';
import { Speaker } from '../types';
import { X, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

interface SpeakerBioModalProps {
  speaker: Speaker | null;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const SpeakerBioModal: React.FC<SpeakerBioModalProps> = ({
  speaker,
  onClose,
  onOpenRegister,
}) => {
  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-[#083331] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header in deep forest teal */}
        <div className="px-6 py-5 bg-[#083331] text-white flex items-start justify-between shrink-0">
          <div>
            {speaker.isKeynote && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#e62b32] text-white font-bold text-[10px] uppercase tracking-wider mb-2 shadow-xs">
                ★ Keynote Speaker &amp; Presenter
              </span>
            )}
            <h2 className="font-headline text-xl sm:text-2xl font-bold tracking-wide uppercase">
              {speaker.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#9ce7e2] font-medium mt-0.5">
              {speaker.role}{speaker.organization ? ` • ${speaker.organization}` : ''}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-teal-200 hover:text-white hover:bg-[#0d4643] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
          {/* Topic Callout */}
          {speaker.topic && (
            <div className="bg-[#f0fbfb] border border-[#b2e5e1] rounded-2xl p-4 space-y-1.5">
              <div className="text-[11px] font-bold text-[#083331] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#e62b32]" />
                <span>Presentation &amp; Discussion Topic</span>
              </div>
              <p className="font-bold text-[#083331] text-sm leading-snug">
                "{speaker.topic}"
              </p>
              {speaker.speechTime && (
                <div className="text-xs text-[#0f534f] font-medium flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 text-[#0d4643]" />
                  <span>Scheduled: {speaker.speechTime} JST</span>
                </div>
              )}
            </div>
          )}

          {/* Biography */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#083331] text-xs uppercase tracking-wider">
              Biography &amp; Leadership Background
            </h3>
            <p className="leading-relaxed text-slate-600 text-sm">
              {speaker.bio}
            </p>
          </div>

          {/* Key focus areas */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-bold text-[#083331] uppercase tracking-wider">
              Seminar Focus Areas
            </div>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e62b32] shrink-0" />
                <span>Bilateral Okayama-Bangladesh strategic collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e62b32] shrink-0" />
                <span>Live interactive Q&amp;A session participation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e62b32] shrink-0" />
                <span>Post-seminar B2B networking and delegate interaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#e62b32] hover:bg-[#cc181f] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            Reserve Free Pass &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
