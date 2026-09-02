import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';

interface AdminRegistrationsPageProps {
  onLogout: () => void;
}

export const AdminRegistrationsPage: React.FC<AdminRegistrationsPageProps> = ({ onLogout }) => {
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
    
    // Set up polling for live updates every 5 seconds
    const intervalId = setInterval(() => {
      fetchRegistrations();
    }, 5000);

    return () => clearInterval(intervalId);
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
        setRegistrations(prev => 
          prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg)
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this registration? This cannot be undone.')) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/registrations/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setRegistrations(prev => prev.filter(reg => reg.id !== id));
      } else {
        alert('Failed to delete registration. Please try again.');
      }
    } catch (error) {
      console.error('Failed to delete registration:', error);
      alert('An error occurred while deleting.');
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-[#16605b]/50 flex justify-between items-center">
            <h3 className="font-headline font-bold text-white tracking-widest uppercase text-sm flex items-center gap-3">
              Live Registrations Management
              {!loading && (
                <span className="bg-[#e62b32] text-white px-2 py-0.5 rounded-full text-[10px]">
                  Total: {registrations.length}
                </span>
              )}
            </h3>
            <button 
              onClick={fetchRegistrations}
              className="text-xs text-[#79ded7] hover:text-white transition-colors cursor-pointer font-medium px-3 py-1.5 rounded-lg bg-[#083331] border border-[#16605b]"
            >
              Refresh Data ↻
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#083331]/50 text-xs uppercase tracking-widest text-teal-100/50">
                  <th className="px-6 py-4 font-semibold border-b border-[#16605b]/30">Pass ID</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#16605b]/30">Attendee</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#16605b]/30">Contact</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#16605b]/30">Organization</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#16605b]/30">Status</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#16605b]/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-teal-100/50">Loading records...</td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-teal-100/50">No registrations found yet.</td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors border-b border-[#16605b]/20 last:border-0 group">
                      <td className="px-6 py-4 font-mono text-xs font-semibold">
                        {reg.status === 'Confirmed' ? (
                          <span className="text-[#79ded7]">{reg.passId || `Kizuna ${3000 + reg.id}`}</span>
                        ) : (
                          <span className="text-teal-100/30 italic">Generated on Confirm</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{reg.fullName}</div>
                        <div className="text-xs text-teal-100/50 mt-0.5">{reg.email}</div>
                      </td>
                      <td className="px-6 py-4 text-teal-100/70 text-xs">
                        {reg.phone}
                      </td>
                      <td className="px-6 py-4 text-teal-100/70">
                        <div className="font-medium text-white">{reg.organization || 'Independent'}</div>
                        <div className="text-xs">{reg.roleOrField || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          reg.status === 'Confirmed' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : reg.status === 'Rejected'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : reg.status === 'Hold'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          {reg.status !== 'Confirmed' && (
                            <button 
                              onClick={() => handleUpdateStatus(reg.id, 'Confirmed')}
                              className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 text-[10px] font-bold uppercase cursor-pointer transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {reg.status !== 'Hold' && (
                            <button 
                              onClick={() => handleUpdateStatus(reg.id, 'Hold')}
                              className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 text-[10px] font-bold uppercase cursor-pointer transition-colors"
                            >
                              Hold
                            </button>
                          )}
                          {reg.status !== 'Rejected' && (
                            <button 
                              onClick={() => handleUpdateStatus(reg.id, 'Rejected')}
                              className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 hover:bg-amber-500/40 text-[10px] font-bold uppercase cursor-pointer transition-colors"
                            >
                              Reject
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(reg.id)}
                            className="px-2 py-1 rounded-md bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 text-[10px] font-bold uppercase cursor-pointer transition-colors ml-1"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
