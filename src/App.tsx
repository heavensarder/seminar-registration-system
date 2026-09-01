/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ConfirmedTicket, Speaker } from './types';
import { HomeHero } from './components/HomeHero';
import { CountdownTimer } from './components/CountdownTimer';
import { Footer } from './components/Footer';
import { DigitalPassModal } from './components/DigitalPassModal';
import { SpeakerBioModal } from './components/SpeakerBioModal';
import { VenueModal } from './components/VenueModal';
import { ThemeDetailModal } from './components/ThemeDetailModal';
import { OrganizerModal } from './components/OrganizerModal';
import { SEMINAR_DETAILS, SPEAKERS } from './data/seminarData';
import { RegisterPage } from './pages/RegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminRegistrationsPage } from './pages/AdminRegistrationsPage';
import { AdminConfirmedPage } from './pages/AdminConfirmedPage';
import { AdminMailConfigPage } from './pages/AdminMailConfigPage';
import { AdminEventSettingsPage } from './pages/AdminEventSettingsPage';

function Home() {
  const navigate = useNavigate();
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);

  const handleSelectSpeaker = (speakerId: string) => {
    const speaker = SPEAKERS.find((s) => s.id === speakerId) || null;
    setSelectedSpeaker(speaker);
  };

  const handleOpenRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#052322] text-white font-sans selection:bg-[#e62b32] selection:text-white">
      
      {/* Main Single-View Poster Application */}
      <main className="flex-1 py-2 sm:py-6">
        
        {/* Master Seminar Poster Flyer with 1:1 color schema */}
        <HomeHero
          onOpenRegister={handleOpenRegister}
          onSelectSpeaker={handleSelectSpeaker}
          onOpenVenue={() => setIsVenueModalOpen(true)}
          onOpenTheme={(themeId) => setSelectedThemeId(themeId)}
          onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
        />

        {/* Live Countdown Clock Bar directly supporting the poster */}
        <div className="max-w-4xl mx-auto px-3 sm:px-6 mt-3 mb-8 print:hidden">
          <CountdownTimer />
        </div>

      </main>

      {/* Clean Poster Footer matching color schema */}
      <Footer
        onOpenRegister={handleOpenRegister}
        onOpenVenue={() => setIsVenueModalOpen(true)}
        onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
      />

      {/* Speaker Biography Popover Modal */}
      <SpeakerBioModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
        onOpenRegister={handleOpenRegister}
      />

      {/* Venue & Access Directions Modal */}
      <VenueModal
        isOpen={isVenueModalOpen}
        onClose={() => setIsVenueModalOpen(false)}
      />

      {/* Seminar Theme Highlights Modal */}
      <ThemeDetailModal
        themeId={selectedThemeId}
        onClose={() => setSelectedThemeId(null)}
        onOpenRegister={handleOpenRegister}
      />

      {/* Host & Sponsors Modal */}
      <OrganizerModal
        isOpen={isOrganizerModalOpen}
        onClose={() => setIsOrganizerModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [confirmedTicket, setConfirmedTicket] = useState<ConfirmedTicket | null>(null);
  const [remainingSeats, setRemainingSeats] = useState(
    SEMINAR_DETAILS.capacity - SEMINAR_DETAILS.initialRegistered
  );

  const handleLoginSuccess = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdminLoggedIn(false);
  };

  const handleRegistrationSuccess = (ticket: ConfirmedTicket) => {
    setConfirmedTicket(ticket);
    setRemainingSeats((prev) => Math.max(1, prev - 1));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/register" 
          element={
            <RegisterPage 
              onSuccess={handleRegistrationSuccess} 
              remainingSeats={remainingSeats} 
            />
          } 
        />
        <Route 
          path="/admin/login" 
          element={<AdminLoginPage onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            isAdminLoggedIn ? (
              <AdminDashboardPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
        <Route 
          path="/admin/registrations" 
          element={
            isAdminLoggedIn ? (
              <AdminRegistrationsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
        <Route 
          path="/admin/confirmed" 
          element={
            isAdminLoggedIn ? (
              <AdminConfirmedPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
        <Route 
          path="/admin/mail-config" 
          element={
            isAdminLoggedIn ? (
              <AdminMailConfigPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
        <Route 
          path="/admin/event-settings" 
          element={
            isAdminLoggedIn ? (
              <AdminEventSettingsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
      </Routes>

      {/* Official Printable Digital Pass / E-Badge Modal */}
      <DigitalPassModal
        ticket={confirmedTicket}
        onClose={() => setConfirmedTicket(null)}
      />
    </>
  );
}
