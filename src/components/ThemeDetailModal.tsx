import React from 'react';
import { X, CheckCircle2, GraduationCap, Users, TrendingUp, Sparkles } from 'lucide-react';
import { SEMINAR_THEMES } from '../data/seminarData';

interface ThemeDetailModalProps {
  themeId: string | null;
  onClose: () => void;
  onOpenRegister: () => void;
  isJa?: boolean;
}

export const ThemeDetailModal: React.FC<ThemeDetailModalProps> = ({
  themeId,
  onClose,
  onOpenRegister,
  isJa = false,
}) => {
  if (!themeId) return null;
  const theme = SEMINAR_THEMES.find((t) => t.id === themeId);
  if (!theme) return null;

  const icons = {
    study: <GraduationCap className="w-6 h-6 text-[#083331]" />,
    'human-resources': <Users className="w-6 h-6 text-[#083331]" />,
    business: <TrendingUp className="w-6 h-6 text-[#083331]" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-[#083331] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#083331] text-white flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#083331] shrink-0 shadow-md">
              {icons[theme.id as keyof typeof icons] || <Sparkles className="w-6 h-6 text-[#083331]" />}
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold text-[#79ded7] tracking-wider block">
                {isJa ? 'セミナーの柱' : 'Seminar Pillar'}
              </span>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold uppercase tracking-wide">
                {isJa && (theme as any).titleJa ? (theme as any).titleJa : theme.title}
              </h2>
            </div>
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
          <div>
            <h3 className="font-bold text-[#083331] text-sm sm:text-base mb-1">
              {isJa && (theme as any).subtitleJa ? (theme as any).subtitleJa : theme.subtitle}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {isJa && (theme as any).descriptionJa ? (theme as any).descriptionJa : theme.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3 bg-[#f0fbfb] border border-[#b2e5e1] rounded-2xl p-4 sm:p-5">
            <div className="text-xs font-bold text-[#083331] uppercase tracking-wider">
              {isJa ? '主な論点と機会' : 'Key Discussion Points & Opportunities'}
            </div>
            <div className="space-y-2">
              {(isJa && (theme as any).highlightsJa ? (theme as any).highlightsJa : theme.highlights).map((highlight: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#e62b32] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {isJa ? '閉じる' : 'Close'}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#e62b32] hover:bg-[#cc181f] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            {isJa ? 'このセッションに登録する →' : 'Register for this Session →'}
          </button>
        </div>

      </div>
    </div>
  );
};
