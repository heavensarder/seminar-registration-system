import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormData, ConfirmedTicket } from '../types';
import { Ticket, Building2, Mail, Phone, User, Briefcase, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TsiLogo } from '../components/TsiLogo';

interface RegisterPageProps {
  onSuccess: (ticket: ConfirmedTicket) => void;
  remainingSeats: number;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess, remainingSeats }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    roleOrField: '',
    attendeeType: 'business_exec', // default for this sleek form
    attendanceMode: 'in_person',
    interests: [],
    translationNeeded: true,
    languagePreference: 'en',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/settings/event`);
        if (response.ok) {
          const data = await response.json();
          setIsRegistrationOpen(data.registrationOpen);
        }
      } catch (error) {
        console.error('Failed to fetch event status:', error);
      } finally {
        setIsLoadingStatus(false);
      }
    };
    fetchStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const newTicket = await response.json();

      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#e62b32', '#083331', '#79ded7', '#ffffff'],
        });
      } catch (err) {}

      setIsSubmitting(false);
      onSuccess(newTicket);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('An error occurred while submitting your registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#052322] flex flex-col items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden text-white font-sans selection:bg-[#e62b32] selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#083331]/80 to-transparent z-0"></div>

      <div className="w-full max-w-3xl z-10 relative">
        
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-teal-200 hover:text-white transition-colors text-sm font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Seminar Details
        </button>

        {/* Card Container */}
        <div className="bg-[#083331]/70 backdrop-blur-xl border border-[#16605b] rounded-3xl shadow-2xl overflow-hidden relative">
          
          {/* Header */}
          <div className="p-8 sm:p-10 border-b border-[#16605b]/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e62b32]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="flex justify-between items-start">
              <div>
                <span className="font-script text-3xl sm:text-4xl text-[#e62b32] font-bold block mb-1">
                  Reserve Your Seat
                </span>
                <h1 className="font-headline text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-2">
                  Official Registration
                </h1>
                <p className="text-teal-100/70 text-sm sm:text-base font-medium max-w-lg">
                  Secure your entry pass for the Kizuna 2026 Seminar. Only <strong className="text-white">{remainingSeats}</strong> seats remaining.
                </p>
              </div>
              <div className="hidden sm:block bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                <TsiLogo size="sm" />
              </div>
            </div>
          </div>

          {/* Form or Closed Message */}
          {isLoadingStatus ? (
            <div className="p-8 sm:p-10 flex justify-center">
              <span className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></span>
            </div>
          ) : !isRegistrationOpen ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-rose-500" />
              </div>
              <h2 className="text-2xl font-headline font-bold text-white mb-3 uppercase tracking-wider">Registration is Closed</h2>
              <p className="text-teal-100/70 max-w-md mx-auto">
                Thank you for your interest in the Kizuna 2026 Okayama-Bangladesh Partnership Seminar. Registration is currently closed. Please check back later or contact the organizers for more information.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1.5 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                  Full Name / 氏名 <span className="text-[#e62b32]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Kenji Tanaka"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                  Email Address / メールアドレス <span className="text-[#e62b32]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1.5 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                  Company Name / 会社名
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Company Name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="space-y-1.5 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                  Designation / 役職
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    value={formData.roleOrField}
                    onChange={(e) => setFormData({ ...formData, roleOrField: e.target.value })}
                    placeholder="Job Title / Role"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5 group sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-teal-100/70 group-focus-within:text-white transition-colors">
                  Mobile Number / 電話番号
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-teal-300/50 group-focus-within:text-white transition-colors" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+81 90-XXXX-XXXX"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#79ded7] focus:bg-white/10 text-white placeholder:text-teal-100/30 font-medium outline-hidden transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 mt-4 border-t border-[#16605b]/50">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#e62b32] hover:bg-[#cc181f] text-white font-headline text-lg font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,43,50,0.4)] hover:shadow-[0_0_30px_rgba(230,43,50,0.6)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-70 disabled:active:scale-100 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Submitting / 送信中...</span>
                  </>
                ) : (
                  <span>Submit / 送信</span>
                )}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};
