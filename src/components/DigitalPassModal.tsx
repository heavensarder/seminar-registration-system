import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmedTicket } from '../types';
import { X, Printer, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { SEMINAR_DETAILS } from '../data/seminarData';
import { TsiLogo } from './TsiLogo';
import { QrCodeBadge } from './QrCodeBadge';

interface DigitalPassModalProps {
  ticket: ConfirmedTicket | null;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ ticket, onClose }) => {
  const passRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8">
        
        {/* Close Button Top */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-teal-200 hover:text-white bg-[#083331]/80 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border border-[#16605b] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close Pass</span>
          </button>
        </div>

        {/* PENDING CONFIRMATION CARD */}
        <div className="bg-white text-[#083331] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative p-5 sm:p-10 md:p-12 text-center space-y-5 sm:space-y-6 mx-4 sm:mx-0">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-[#f0fbfb] rounded-full flex items-center justify-center border border-[#b2e5e1]">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#083331]" />
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-headline text-lg sm:text-2xl font-bold tracking-wide text-[#083331] leading-tight">
              Your reservation request has been received.
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Thank you for your interest in joining the seminar. Please check your email, including your spam or junk folder, for a confirmation message containing your reservation number.
            </p>
          </div>

          <div className="w-12 h-px bg-slate-300 mx-auto my-3 sm:my-4"></div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-headline text-lg sm:text-xl font-bold tracking-wide text-[#083331] leading-tight">
              ご予約リクエストを受け付けました。
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              セミナーへのご参加にご関心をお寄せいただき、ありがとうございます。ご予約番号を記載した確認メールをお送りしましたので、迷惑メールフォルダも含めてご確認ください。
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="mt-2 sm:mt-4 px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-[#e62b32] hover:bg-[#cc181f] text-white text-sm sm:text-base font-bold shadow-md transition-all cursor-pointer"
          >
            Return to Home
          </button>
        </div>

      </div>
    </div>
  );
};
