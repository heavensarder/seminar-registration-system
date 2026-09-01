import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Users, Ticket, CheckCircle2, AlertCircle, Settings2 } from 'lucide-react';
import { SEMINAR_DETAILS } from '../data/seminarData';

interface AdminDashboardPageProps {
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/registrations`);
      const data = await response.json();
      setRegistrations(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/registrations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        // Optimistically update the state
        setRegistrations(prev => 
          prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg)
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const totalRegistrations = registrations.length;
  const confirmedCount = registrations.filter(r => r.status === 'Confirmed').length;
  const pendingCount = registrations.filter(r => r.status === 'Pending').length;
  const vipCount = registrations.filter(r => r.seatZone?.includes('VIP')).length;

  const stats = [
    { title: 'Total Registrations', value: totalRegistrations.toString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Confirmed Attendees', value: confirmedCount.toString(), icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'VIP Seats Assigned', value: vipCount.toString(), icon: Ticket, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Pending Review', value: pendingCount.toString(), icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#083331] to-[#0a423e] border border-[#16605b] rounded-3xl p-8 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#e62b32]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-headline font-bold uppercase tracking-widest text-white mb-2">
              Welcome back, main_admin
            </h2>
            <p className="text-teal-100/70 text-sm max-w-xl leading-relaxed">
              Here is what's happening with the Kizuna 2026 Seminar registrations today. Monitor ticket limits and verify attendee details below.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`rounded-2xl border p-6 flex flex-col justify-between h-32 ${stat.bg} shadow-lg backdrop-blur-sm`}>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-100/60">{stat.title}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-headline font-extrabold text-white">
                {loading ? '-' : stat.value}
              </div>
            </div>
          ))}
        </div>



      </div>
    </AdminLayout>
  );
};
