import React, { useState } from 'react';
import { SEMINAR_DETAILS } from '../data/seminarData';
import { NavigationPage } from '../types';
import { MapPin, Navigation, Train, Plane, Building, Car, Clock, Phone, ExternalLink, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

interface VenuePageProps {
  onOpenRegister: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const VenuePage: React.FC<VenuePageProps> = ({ onOpenRegister, onNavigate }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${SEMINAR_DETAILS.venue.name}, ${SEMINAR_DETAILS.venue.address} (${SEMINAR_DETAILS.venue.japaneseName})`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent('Okayama International Exchange Center 岡山国際交流センター 2-2-1 Hokan-cho Kita-ku Okayama');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-script text-3xl sm:text-4xl text-[#d90429] font-bold block -mb-1">
          Venue & Access
        </span>
        <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
          OKAYAMA INTERNATIONAL EXCHANGE CENTER
        </h1>
        <p className="text-base text-indigo-700 font-jp font-semibold">
          岡山国際交流センター (2F 国際会議場)
        </p>
        <p className="text-xs sm:text-sm text-slate-600">
          2-2-1 Hokan-cho, Kita-ku, Okayama City, Okayama 700-0026, Japan
        </p>
      </div>

      {/* QUICK STATS & LOCATION CARD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>3-Minute Walk from JR Okayama Station</span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Central Location in the Heart of Okayama
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Okayama International Exchange Center is the premier hub for cultural and economic diplomacy in the Chugoku region. Located right next to the West Exit (西口) of JR Okayama Station, the venue features world-class acoustic engineering, simultaneous interpretation booths, and spacious foyer lounges for high-level bilateral networking.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-bold text-slate-900 w-28">Japanese:</span>
                <span>〒700-0026 岡山県岡山市北区奉還町2-2-1</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-bold text-slate-900 w-28">Conference Hall:</span>
                <span>2F International Conference Hall (国際会議場)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-bold text-slate-900 w-28">Doors Open:</span>
                <span className="text-indigo-700 font-bold">13:30 JST (Seminar 14:00 – 16:00)</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={openGoogleMaps}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-1 text-indigo-200" />
              </button>

              <button
                onClick={handleCopyAddress}
                className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedAddress ? 'Address Copied! ✓' : 'Copy Japanese Address'}
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Simulator */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-inner text-white">
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center text-center p-6 group cursor-pointer" onClick={openGoogleMaps}>
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Center Map Pin */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#d90429] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 animate-bounce" />
              </div>

              <div className="relative z-10 mt-3 font-headline text-lg font-bold text-white uppercase">
                Okayama Int'l Exchange Center
              </div>
              <div className="relative z-10 text-[11px] text-indigo-300 font-semibold">
                Lat: 34.6678° N, Long: 133.9168° E
              </div>
              <div className="relative z-10 text-[10px] text-slate-400 mt-1">
                Click to open interactive navigation
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>JR Okayama Station West Exit</span>
              <span className="text-emerald-400 font-bold">🚶 3 min walk</span>
            </div>
          </div>

        </div>
      </div>

      {/* ACCESS & TRANSIT GUIDE */}
      <div className="space-y-6">
        <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
          How to Reach the Venue
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Shinkansen / Train */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="font-headline text-xl font-bold text-slate-900 uppercase">
              By Shinkansen (Bullet Train)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              JR Okayama Station is a primary hub on the Sanyo Shinkansen line with direct Nozomi, Sakura, and Hikari services.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">From Shin-Osaka:</span>
                <span className="font-bold text-slate-900">45 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">From Hiroshima:</span>
                <span className="font-bold text-slate-900">35 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">From Tokyo:</span>
                <span className="font-bold text-slate-900">3 hrs 15 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">From Hakata (Fukuoka):</span>
                <span className="font-bold text-slate-900">1 hr 45 mins</span>
              </div>
            </div>
          </div>

          {/* Airport Bus */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="font-headline text-xl font-bold text-slate-900 uppercase">
              By Okayama Airport (OKJ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Okayama Momotaro Airport connects Tokyo (Haneda), Sapporo, Okinawa, and international flights.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Limousine Bus:</span>
                <span className="font-bold text-slate-900">30 mins to West Exit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bus Fare:</span>
                <span className="font-bold text-slate-900">¥780 one-way</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Taxi Ride:</span>
                <span className="font-bold text-slate-900">Approx. 35 mins</span>
              </div>
            </div>
          </div>

          {/* Walking from Station & Parking */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="font-headline text-xl font-bold text-slate-900 uppercase">
              Walking & Parking
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Exit JR Okayama Station via the West Exit (2F deck), walk straight down the pedestrian skywalk toward Hokan-cho.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Walking Distance:</span>
                <span className="font-bold text-slate-900">Approx. 250 meters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Accessibility:</span>
                <span className="font-bold text-slate-900">Elevator & Barrier-Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Public Parking:</span>
                <span className="font-bold text-slate-900">Adjacent Paid Lots</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* VENUE FACILITIES & AMENITIES */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md">
        <h3 className="font-headline text-2xl font-bold text-slate-900 uppercase mb-6">
          Venue Facilities & Amenities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 text-sm">2F Conference Hall</div>
            <p className="text-xs text-slate-600">Tiered professional auditorium with high-definition projection & audio.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 text-sm">Interpretation Booths</div>
            <p className="text-xs text-slate-600">Simultaneous translation in Japanese, English, and Bengali.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 text-sm">Foyer & B2B Lounge</div>
            <p className="text-xs text-slate-600">Spacious exhibition foyer for post-seminar exchange & refreshments.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 text-sm">High-Speed Wi-Fi</div>
            <p className="text-xs text-slate-600">Complimentary gigabit Wi-Fi for all registered participants.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
