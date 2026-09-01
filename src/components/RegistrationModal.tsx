import React, { useState } from 'react';
import { X, CheckCircle2, Ticket, Building2, Mail, Phone, User, Globe, AlertCircle } from 'lucide-react';
import { RegistrationFormData, ConfirmedTicket } from '../types';
import confetti from 'canvas-confetti';
import { SEMINAR_DETAILS } from '../data/seminarData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (ticket: ConfirmedTicket) => void;
  remainingSeats: number;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  remainingSeats,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    roleOrField: '',
    attendeeType: 'student',
    attendanceMode: 'in_person',
    interests: ['study'],
    translationNeeded: true,
    languagePreference: 'en',
    questionsForSpeakers: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your full name and valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate instant confirmation & ticket generation
    setTimeout(() => {
      const randomTicketNum = `KZ26-OKB-${Math.floor(1000 + Math.random() * 9000)}`;
      const zones = ['VIP-Front Row', 'Zone A (Main Floor)', 'Zone B (Center)', 'Zone C (Executive)'];
      const seatZone = formData.attendanceMode === 'in_person' 
        ? zones[Math.floor(Math.random() * zones.length)] 
        : 'Virtual Stream Access Pass';

      const newTicket: ConfirmedTicket = {
        ticketNumber: randomTicketNum,
        attendee: formData,
        registeredAt: new Date().toISOString(),
        seatZone,
        qrValue: `https://kizuna2026.okayama-bangladesh.org/verify?ticket=${randomTicketNum}&name=${encodeURIComponent(formData.fullName)}`,
      };

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e62b32', '#083331', '#79ded7', '#ffffff'],
        });
      } catch (err) {
        // Safe fallback
      }

      setIsSubmitting(false);
      onSuccess(newTicket);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-[#083331]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#083331] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e62b32] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wide">
                Kizuna 2026 • Free Registration
              </h2>
              <p className="text-xs text-[#9ce7e2]">
                September 19, 2026 • Okayama International Exchange Center
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

        {/* Seat Counter Warning */}
        <div className="bg-[#f0fbfb] px-6 py-2.5 border-b border-[#b2e5e1] flex items-center justify-between text-xs text-[#083331] shrink-0">
          <span className="font-medium">
            Admission: <strong className="text-emerald-700">100% Free</strong> (Includes simultaneous interpretation headset)
          </span>
          <span className="font-bold text-[#e62b32] bg-white px-2.5 py-0.5 rounded-full border border-[#e62b32]/30 shadow-2xs">
            {remainingSeats} seats left
          </span>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Personal Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#083331] text-xs uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#e62b32]" />
              <span>1. Attendee Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name <span className="text-[#e62b32]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kenji Tanaka / Tahmina Akter"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#083331] focus:ring-2 focus:ring-[#083331]/20 outline-none text-slate-900 transition-all text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Email Address <span className="text-[#e62b32]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#083331] focus:ring-2 focus:ring-[#083331]/20 outline-none text-slate-900 transition-all text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Organization / University / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. Okayama University / Company Name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#083331] focus:ring-2 focus:ring-[#083331]/20 outline-none text-slate-900 transition-all text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+81 90-XXXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#083331] focus:ring-2 focus:ring-[#083331]/20 outline-none text-slate-900 transition-all text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Attendance Mode & Category */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-[#083331] text-xs uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#e62b32]" />
              <span>2. Participation Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Attendance Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendanceMode: 'in_person' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.attendanceMode === 'in_person'
                        ? 'bg-[#083331] text-white border-[#083331]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🏢 In-Person (Okayama)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendanceMode: 'online' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.attendanceMode === 'online'
                        ? 'bg-[#083331] text-white border-[#083331]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    💻 Live Stream
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Attendee Category
                </label>
                <select
                  value={formData.attendeeType}
                  onChange={(e) => setFormData({ ...formData, attendeeType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#083331] focus:ring-2 focus:ring-[#083331]/20 outline-none text-slate-900 text-xs sm:text-sm bg-white"
                >
                  <option value="student">Student / Academic Researcher</option>
                  <option value="business">Business Representative / Executive</option>
                  <option value="government">Diplomat / Government Official</option>
                  <option value="educator">Educator / Language Instructor</option>
                  <option value="general">General Public / Community Member</option>
                </select>
              </div>
            </div>

            {/* Interest checkboxes */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-slate-700">
                Primary Interests (Select all that apply):
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'study', label: '🎓 Study in Japan & Scholarships' },
                  { id: 'human-resources', label: '👥 IT & Engineering Talent' },
                  { id: 'business', label: '📈 Trade & Corporate Matchmaking' },
                  { id: 'culture', label: '🌸 Japanese Cultural Exchange' },
                ].map((tag) => (
                  <button
                    type="button"
                    key={tag.id}
                    onClick={() => toggleInterest(tag.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      formData.interests.includes(tag.id)
                        ? 'bg-[#f0fbfb] border-[#145d58] text-[#083331]'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Simultaneous Interpretation headset */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs sm:text-sm">
                Simultaneous Interpretation Headset (Free)
              </span>
              <input
                type="checkbox"
                checked={formData.translationNeeded}
                onChange={(e) => setFormData({ ...formData, translationNeeded: e.target.checked })}
                className="w-4 h-4 accent-[#083331] rounded-sm cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Live Japanese &amp; English simultaneous translation will be broadcast through dedicated wireless headsets in the main hall.
            </p>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#e62b32] hover:bg-[#cc181f] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Generating Official Pass...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Free Registration</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
