import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

interface AdminOpinionEmailsPageProps {
  onLogout: () => void;
}

export const AdminOpinionEmailsPage: React.FC<AdminOpinionEmailsPageProps> = ({ onLogout }) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchConfirmedRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/registrations`);
      const data = await response.json();
      setRegistrations(data.filter((r: any) => r.status === 'Confirmed'));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfirmedRegistrations();
  }, []);

  const sendOpinionEmail = async (ids: number[] | 'all') => {
    setIsSending(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/admin/send-opinion-emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantIds: ids }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || 'Emails sent successfully.');
        setTimeout(() => setSuccessMsg(''), 5000);
        await fetchConfirmedRegistrations();
      } else {
        setErrorMsg(data.error || 'Failed to send emails.');
      }
    } catch (error) {
      console.error('Failed to send opinion email:', error);
      setErrorMsg('A network error occurred.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        <div className="flex justify-between items-center bg-[#052322] border border-[#16605b]/50 rounded-3xl p-8 shadow-xl">
          <div>
            <h3 className="font-headline font-bold text-white tracking-widest uppercase text-xl mb-2 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#79ded7]" />
              Opinion Management
            </h3>
            <p className="text-teal-100/70 text-sm max-w-xl">
              Send the Opinion Form link to confirmed participants. Ensure you have configured the template in Mail Configuration first.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => sendOpinionEmail('all')}
              disabled={isSending || registrations.length === 0}
              className="bg-[#e62b32] hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wider text-sm cursor-pointer"
            >
              {isSending ? 'Sending...' : 'Send to All Confirmed'}
              <Send className="w-4 h-4 ml-2" />
            </button>
            <a
              href="/opinion"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#041e1d] hover:bg-black/20 text-teal-100 border border-[#16605b] font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 uppercase tracking-wider text-sm text-center"
            >
              Preview Form Page
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errorMsg}
          </div>
        )}

        <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[#16605b]/30 flex justify-between items-center">
            <h3 className="font-headline font-bold text-white tracking-widest uppercase">Confirmed Participants ({registrations.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-teal-100">
              <thead className="bg-[#083331] text-xs uppercase font-headline tracking-wider text-teal-100/60">
                <tr>
                  <th className="px-6 py-4 font-bold">PASS ID</th>
                  <th className="px-6 py-4 font-bold">Attendee</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16605b]/30">
                {loading ? (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-teal-100/50">Loading participants...</td></tr>
                ) : registrations.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-teal-100/50">No confirmed participants found.</td></tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-[#79ded7] text-xs font-semibold">{reg.passId || `Kizuna ${3000 + reg.id}`}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{reg.fullName}</div>
                        <div className="text-teal-100/60 text-xs">{reg.email}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {!!reg.opinionEmailSent && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Sent
                            </span>
                          )}
                          <button
                            onClick={() => sendOpinionEmail([reg.id])}
                            disabled={isSending}
                            className={`${reg.opinionEmailSent ? 'bg-transparent text-[#79ded7] border-[#79ded7]/30 hover:bg-[#79ded7]/10' : 'bg-[#083331] text-white border-[#16605b] hover:bg-[#16605b]'} border px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer`}
                          >
                            {reg.opinionEmailSent ? 'Resend' : 'Send Individually'}
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
