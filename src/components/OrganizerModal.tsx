import React from 'react';
import { X, Building2 } from 'lucide-react';
import { SPONSORS } from '../data/seminarData';
import { TsiLogo } from './TsiLogo';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isJa?: boolean;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({ isOpen, onClose, isJa = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-[#083331] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#083331] text-white flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e62b32] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wide">
                {isJa ? '主催およびパートナー組織' : 'Host & Partner Organizations'}
              </h2>
              <p className="text-xs text-[#9ce7e2] font-medium">
                {isJa ? 'Kizuna 2026 実行委員会' : 'Organizing Committee for Kizuna 2026'}
              </p>
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
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          {SPONSORS.map((org, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-[#16605b] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {org.type === 'host' && (
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs">
                      <TsiLogo size="sm" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[#083331] text-sm sm:text-base">
                      {isJa && org.nameJa ? org.nameJa : org.name}
                    </h3>
                    <span className="inline-block text-[11px] font-bold text-[#0d534e] uppercase tracking-wider">
                      {isJa && org.roleJa ? org.roleJa : org.role}
                    </span>
                  </div>
                </div>

                {org.type === 'host' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f0fbfb] border border-[#b2e5e1] text-[#083331] text-[10px] font-bold uppercase">
                    {isJa ? '主催' : 'Host'}
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                {isJa && org.descriptionJa ? org.descriptionJa : org.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            {isJa ? '閉じる' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
