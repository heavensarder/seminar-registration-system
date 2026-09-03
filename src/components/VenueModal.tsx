import React from 'react';
import { X, MapPin, Train, Building2, ExternalLink } from 'lucide-react';
import { SEMINAR_DETAILS } from '../data/seminarData';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  isJa?: boolean;
}

export const VenueModal: React.FC<VenueModalProps> = ({ isOpen, onClose, isJa = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-[#083331] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#083331] text-white flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e62b32] flex items-center justify-center text-white shrink-0 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wide">
                {isJa ? '会場とアクセス案内' : 'Venue & Access Guide'}
              </h2>
              <p className="text-xs text-[#9ce7e2] font-medium">
                {isJa ? SEMINAR_DETAILS.venue.japaneseName : SEMINAR_DETAILS.venue.name}
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
          
          {/* Main Address Card */}
          <div className="bg-[#f0fbfb] border border-[#b2e5e1] rounded-2xl p-4 space-y-2">
            <div className="text-[11px] font-bold text-[#0d4643] uppercase tracking-wider">
              {isJa ? '詳細な場所とホール' : 'Exact Location & Hall'}
            </div>
            <div className="font-bold text-[#083331] text-base">
              {SEMINAR_DETAILS.venue.name} ({SEMINAR_DETAILS.venue.japaneseName})
            </div>
            <p className="text-slate-600 text-xs sm:text-sm">
              {isJa ? SEMINAR_DETAILS.venue.japaneseAddress : SEMINAR_DETAILS.venue.address}
            </p>
            <div className="inline-block px-2.5 py-1 rounded-lg bg-white border border-[#b2e5e1] text-[#083331] font-semibold text-xs mt-1">
              📍 {isJa ? SEMINAR_DETAILS.venue.japaneseHall : SEMINAR_DETAILS.venue.hall}
            </div>
          </div>

          {/* Access Directions */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#083331] text-xs uppercase tracking-wider">
              {isJa ? '交通アクセスと徒歩での行き方' : 'Transit & Walking Directions'}
            </h3>
            
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
              <Train className="w-5 h-5 text-[#e62b32] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#083331] block text-xs sm:text-sm">
                  {isJa ? 'JR岡山駅から徒歩3分' : '3-Minute Walk from JR Okayama Station'}
                </span>
                <span className="text-xs text-slate-600 mt-0.5 block">
                  {isJa ? '2階コンコースの西口を出て、奉還町方面へ横断歩道橋を渡ってください。センターは駅前広場に隣接しています。' : 'Exit via the West Exit (西口 / Nishi-guchi) on the 2F concourse. Cross the pedestrian deck toward the Hokan-cho district. The center is adjacent to the station plaza.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
              <Building2 className="w-5 h-5 text-[#0d4643] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#083331] block text-xs sm:text-sm">
                  {isJa ? '階数と受付デスク' : 'Floor & Check-in Desk'}
                </span>
                <span className="text-xs text-slate-600 mt-0.5 block">
                  {isJa ? '中央エレベーターまたはエスカレーターで2階へお上がりください。セミナーの受付と同時通訳用ヘッドセットの貸し出しは13:30から開始します。' : 'Take the central elevator or escalators to the 2nd Floor. The seminar reception and simultaneous interpretation headset checkout desk open at 13:30.'}
                </span>
              </div>
            </div>
          </div>

          {/* External Map Action */}
          <div className="pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SEMINAR_DETAILS.venue.name + ' ' + SEMINAR_DETAILS.venue.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#083331] hover:bg-[#0d4643] text-white font-bold text-xs transition-colors shadow-md"
            >
              <span>{isJa ? 'Googleマップで開く' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-4 h-4 text-[#79ded7]" />
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            {isJa ? '完了' : 'Done'}
          </button>
        </div>

      </div>
    </div>
  );
};
