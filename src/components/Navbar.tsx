import React, { useState } from 'react';
import { NavigationPage, Language } from '../types';
import { Calendar, MapPin, Users, BookOpen, Clock, Building2, Ticket, Menu, X, Globe, Sparkles } from 'lucide-react';
import { TsiLogo } from './TsiLogo';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRegister: () => void;
  remainingSeats: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  onOpenRegister,
  remainingSeats,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems: { id: NavigationPage; label: string; labelJa: string; labelBn: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', labelJa: 'ホーム', labelBn: 'হোম', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'speakers', label: 'Guest Speakers', labelJa: '登壇者', labelBn: 'অতিথি বক্তা', icon: <Users className="w-4 h-4" /> },
    { id: 'agenda', label: 'Themes & Agenda', labelJa: 'プログラム', labelBn: 'সূচি ও থিম', icon: <Clock className="w-4 h-4" /> },
    { id: 'venue', label: 'Venue & Access', labelJa: '会場アクセス', labelBn: 'ভেন্যু ও যাতায়াত', icon: <MapPin className="w-4 h-4" /> },
    { id: 'about', label: 'About & Sponsors', labelJa: '主催・協賛', labelBn: 'আয়োজক ও স্পন্সর', icon: <Building2 className="w-4 h-4" /> },
  ];

  const getLabel = (item: typeof navItems[0]) => {
    if (language === 'ja') return item.labelJa;
    if (language === 'bn') return item.labelBn;
    return item.label;
  };

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro bar for quick announcement */}
      <div className="bg-slate-900 text-xs text-slate-300 py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d90429] text-white tracking-wide uppercase">
              OFFICIAL
            </span>
            <span className="font-medium text-slate-200">
              Saturday, September 19, 2026 • 14:00 JST • Okayama International Exchange Center
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-amber-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Only {remainingSeats} Seats Left
            </span>
            <button
              onClick={onOpenRegister}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-colors"
            >
              Reserve Seat &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-script text-2xl sm:text-3xl text-[#d90429] tracking-wide font-bold group-hover:text-red-700 transition-colors">
                  Kizuna 2026
                </span>
                <span className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                  SEMINAR
                </span>
              </div>
              <span className="font-headline text-xs sm:text-sm font-bold text-slate-900 tracking-wider uppercase -mt-0.5 group-hover:text-indigo-600 transition-colors">
                Okayama-Bangladesh Partnership
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{getLabel(item)}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors shadow-2xs"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'en' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('ja');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'ja' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>日本語</span>
                    {language === 'ja' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('bn');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'bn' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>বাংলা</span>
                    {language === 'bn' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              id="header-register-btn"
              onClick={onOpenRegister}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-indigo-400" />
              <span>{language === 'ja' ? '参加申込' : language === 'bn' ? 'নিবন্ধন করুন' : 'Register Now'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenRegister}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{getLabel(item)}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
              {(['en', 'ja', 'bn'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLanguageChange(l)}
                  className={`px-3 py-1.5 text-xs rounded-lg uppercase font-bold border ${
                    language === l ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-bold shadow-md"
            >
              Register Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
