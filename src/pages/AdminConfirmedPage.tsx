import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';

import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/exportUtils';

interface AdminConfirmedPageProps {
  onLogout: () => void;
}

export const AdminConfirmedPage: React.FC<AdminConfirmedPageProps> = ({ onLogout }) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/registrations`);
      const data = await response.json();
      
      // Filter only confirmed and sort by ID ascending (serial)
      const confirmedData = data.filter((reg: any) => reg.status === 'Confirmed').sort((a: any, b: any) => a.id - b.id);
      
      setRegistrations(confirmedData);
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
        // If status is no longer confirmed, remove from this list
        setRegistrations(prev => prev.filter(reg => reg.id !== id));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-[#16605b]/50 flex justify-between items-center">
            <h3 className="font-headline font-bold text-white tracking-widest uppercase text-sm flex items-center gap-3">
              Confirmed List
              {!loading && (
                <span className="bg-[#e62b32] text-white px-2 py-0.5 rounded-full text-[10px]">
                  Total: {registrations.length}
                </span>
              )}
            </h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchRegistrations}
                className="text-xs text-[#79ded7] hover:text-white transition-colors cursor-pointer font-medium px-3 py-1.5 rounded-lg bg-[#083331] border border-[#16605b]"
              >
                Refresh Data ↻
              </button>

              {/* Export Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                  className="flex items-center gap-2 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer font-medium px-3 py-1.5 rounded-lg bg-[#0d4643] border border-[#16605b]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
                
                {isExportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#083331] border border-[#16605b] rounded-xl shadow-2xl z-50 overflow-hidden">
                    <button
                      onClick={() => { exportToPDF(registrations); setIsExportMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer border-b border-[#16605b]/50 text-left"
                    >
                      <FileText className="w-4 h-4 text-rose-400" />
                      Export as PDF
                    </button>
                    <button
                      onClick={() => { exportToExcel(registrations); setIsExportMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer border-b border-[#16605b]/50 text-left"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => { exportToCSV(registrations); setIsExportMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
                    >
                      <FileJson className="w-4 h-4 text-sky-400" />
                      Export as CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
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
                    <td colSpan={6} className="px-6 py-8 text-center text-teal-100/50">No confirmed registrations found.</td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors border-b border-[#16605b]/20 last:border-0 group">
                      <td className="px-6 py-4 font-mono text-[#79ded7] text-xs font-semibold">
                        Kizuna {3000 + reg.id}
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
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          Confirmed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleUpdateStatus(reg.id, 'Hold')}
                            className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 text-[10px] font-bold uppercase cursor-pointer transition-colors"
                          >
                            Hold
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(reg.id, 'Rejected')}
                            className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 hover:bg-amber-500/40 text-[10px] font-bold uppercase cursor-pointer transition-colors"
                          >
                            Reject
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
