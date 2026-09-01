import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Settings2 } from 'lucide-react';

interface AdminEventSettingsPageProps {
  onLogout: () => void;
}

export const AdminEventSettingsPage: React.FC<AdminEventSettingsPageProps> = ({ onLogout }) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isSavingSetting, setIsSavingSetting] = useState(false);

  const fetchEventSettings = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/settings/event`);
      if (response.ok) {
        const data = await response.json();
        setIsRegistrationOpen(data.registrationOpen);
      }
    } catch (error) {
      console.error('Failed to fetch event settings:', error);
    }
  };

  useEffect(() => {
    fetchEventSettings();
  }, []);

  const handleToggleRegistration = async () => {
    setIsSavingSetting(true);
    const newValue = !isRegistrationOpen;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/settings/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationOpen: newValue }),
      });
      if (response.ok) {
        setIsRegistrationOpen(newValue);
      }
    } catch (error) {
      console.error('Failed to update event setting:', error);
      alert('Failed to update event settings.');
    } finally {
      setIsSavingSetting(false);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Event Settings */}
        <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl p-8 relative overflow-hidden shadow-xl">
          <h3 className="font-headline font-bold text-white tracking-widest uppercase text-xl mb-6 flex items-center gap-3">
            <Settings2 className="w-6 h-6 text-[#79ded7]" />
            Event Settings
          </h3>
          <div className="bg-[#083331] border border-[#16605b] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-lg mb-1">Public Registration</div>
              <div className="text-teal-100/60 text-sm">
                Control whether the public can submit new registrations. If disabled, a "Registration Closed" message will be displayed on the form.
              </div>
            </div>
            
            <button
              onClick={handleToggleRegistration}
              disabled={isSavingSetting}
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
                isRegistrationOpen ? 'bg-[#79ded7]' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle Registration</span>
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isRegistrationOpen ? 'translate-x-3' : '-translate-x-3'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
