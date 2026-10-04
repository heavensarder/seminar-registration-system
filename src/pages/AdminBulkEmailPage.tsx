import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminBulkEmailPageProps {
  onLogout: () => void;
}

export const AdminBulkEmailPage: React.FC<AdminBulkEmailPageProps> = ({ onLogout }) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

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

  const sendBulkEmail = async (ids: number[] | 'all') => {
    if (!subject.trim() || !emailBody.trim()) {
      setErrorMsg('Subject and Email Body are required.');
      return;
    }

    setIsSending(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/admin/send-bulk-emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantIds: ids, subject, body: emailBody }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || 'Emails sent successfully.');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg(data.error || 'Failed to send emails.');
      }
    } catch (error) {
      console.error('Failed to send bulk email:', error);
      setErrorMsg('A network error occurred.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl p-8 shadow-xl">
          <h3 className="font-headline font-bold text-white tracking-widest uppercase text-xl mb-4 flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#79ded7]" />
            Bulk Email Sender
          </h3>
          <p className="text-teal-100/70 text-sm max-w-2xl mb-6">
            Compose and send emails to confirmed participants. You can use HTML formatting in the body. Use <code>{`{{fullName}}`}</code> to inject the participant's name.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-teal-100 text-sm font-bold mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                className="w-full bg-[#041e1d] text-white border border-[#16605b] rounded-xl px-4 py-3 focus:outline-none focus:border-[#79ded7] transition-colors"
              />
            </div>
            <div>
              <label className="block text-teal-100 text-sm font-bold mb-2">Email Body (Text or HTML)</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Enter email body... e.g. <p>Hello {{fullName}},</p>"
                rows={10}
                className="w-full bg-[#041e1d] text-white border border-[#16605b] rounded-xl px-4 py-3 focus:outline-none focus:border-[#79ded7] transition-colors font-mono text-sm"
              ></textarea>
              <p className="mt-2 text-xs text-teal-100/60 flex items-center gap-1">
                <span className="font-bold text-teal-100/90">Available Variables:</span>
                <code className="bg-[#083331] text-[#79ded7] px-1.5 py-0.5 rounded border border-[#16605b]/50">
                  {`{{fullName}}`}
                </code>
              </p>
            </div>
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
                        <button
                          onClick={() => sendBulkEmail([reg.id])}
                          disabled={isSending}
                          className="bg-[#083331] text-white border border-[#16605b] hover:bg-[#16605b] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Send Individually
                        </button>
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
