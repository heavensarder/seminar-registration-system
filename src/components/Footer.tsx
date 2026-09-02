import React from 'react';
import { SEMINAR_DETAILS } from '../data/seminarData';
import { TsiLogo } from './TsiLogo';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenVenue: () => void;
  onOpenOrganizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onOpenVenue, onOpenOrganizer }) => {
  return (
    <footer className="bg-[#041e1d] text-teal-200/80 border-t border-[#0e3b38] py-8 print:hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pb-6 border-b border-[#0f4440]">
          
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="flex flex-col">
              <span className="font-script text-2xl text-[#e62b32] font-bold">
                Kizuna 2026
              </span>
              <span className="font-headline text-xs font-bold text-white tracking-wider uppercase">
                Okayama-Bangladesh Partnership Seminar
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2 text-[11px] text-teal-300/60 text-center sm:text-left">
          <div className="leading-relaxed px-4 sm:px-0">
            © 2026 All right reserved by TSI Group.
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-1 sm:mt-0">
            <span>Saturday, Sept 19, 2026</span>
            <span className="hidden sm:block">•</span>
            <span className="text-teal-300/50 sm:text-teal-300/60">Okayama International Exchange Center</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
