import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Mail, KeyRound, Save, CheckCircle, Code, Eye, EyeOff } from 'lucide-react';

interface AdminMailConfigPageProps {
  onLogout: () => void;
}

export const AdminMailConfigPage: React.FC<AdminMailConfigPageProps> = ({ onLogout }) => {
  const [host, setHost] = useState('smtp.hostinger.com');
  const [port, setPort] = useState('465');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [template, setTemplate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');

  const fetchPreview = async (htmlTemplate: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/settings/mail/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: htmlTemplate })
      });
      if (res.ok) {
        const html = await res.text();
        setPreviewHtml(html);
      }
    } catch (error) {
      console.error('Failed to fetch preview', error);
    }
  };

  useEffect(() => {
    // Fetch existing settings
    const fetchSettings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/settings/mail`);
        if (res.ok) {
          const data = await res.json();
          if (data.host) setHost(data.host);
          if (data.port) setPort(data.port);
          if (data.email) setEmail(data.email);
          if (data.password) setPassword(data.password);
          if (data.template) {
            setTemplate(data.template);
            fetchPreview(data.template);
          }
        }
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };
    fetchSettings();
  }, []);

  // Update preview whenever template changes
  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTemplate(val);
    fetchPreview(val);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/settings/mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, port, email, password, template }),
      });
      
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to save settings.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        <div className="grid xl:grid-cols-2 gap-8">
          
          {/* Settings Form */}
          <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl overflow-hidden shadow-xl p-8 h-fit flex flex-col">
            <h3 className="font-headline font-bold text-white tracking-widest uppercase text-xl mb-2 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#79ded7]" />
              SMTP Mail Configuration
            </h3>
            <p className="text-teal-100/70 text-sm mb-8">
              Configure your business email SMTP system. Defaulted for Hostinger, but you can use any provider (like Gmail, AWS SES, or SendGrid).
            </p>

            <form onSubmit={handleSave} className="space-y-6 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-teal-100 uppercase tracking-widest mb-2">SMTP Host</label>
                  <input 
                    type="text"
                    required
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="smtp.hostinger.com"
                    className="w-full bg-[#083331] border border-[#16605b] text-white px-4 py-3.5 rounded-xl outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-teal-100 uppercase tracking-widest mb-2">SMTP Port</label>
                  <input 
                    type="text"
                    required
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    placeholder="465"
                    className="w-full bg-[#083331] border border-[#16605b] text-white px-4 py-3.5 rounded-xl outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-100 uppercase tracking-widest mb-2">Sender Email Address / Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-teal-100/40" />
                  </div>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. event@kizuna2026.org"
                    className="w-full bg-[#083331] border border-[#16605b] text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-100 uppercase tracking-widest mb-2">Google App Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="w-5 h-5 text-teal-100/40" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="16-character App Password"
                    className="w-full bg-[#083331] border border-[#16605b] text-white pl-12 pr-12 py-3.5 rounded-xl outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-all font-mono"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-teal-100/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[10px] text-teal-100/50 mt-2">
                  Enter the password for this specific email account. (For Gmail, you must use an App Password).
                </p>
              </div>

              <div className="flex-1 min-h-[300px] flex flex-col">
                <label className="block text-xs font-bold text-teal-100 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  HTML Email Template
                </label>
                <textarea 
                  value={template}
                  onChange={handleTemplateChange}
                  className="w-full flex-1 bg-[#041e1d] border border-[#16605b] text-teal-100 p-4 rounded-xl outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-all font-mono text-xs resize-none"
                  placeholder="Paste your HTML template here..."
                />
                <p className="text-[10px] text-teal-100/50 mt-2">
                  Available placeholders: <code className="text-[#79ded7] bg-[#041e1d] px-1 rounded">{`{{fullName}}`}</code> and <code className="text-[#79ded7] bg-[#041e1d] px-1 rounded">{`{{passId}}`}</code>.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#16605b]/30">
                <div>
                  {saved && (
                    <span className="flex items-center gap-2 text-emerald-400 text-sm font-medium animate-pulse">
                      <CheckCircle className="w-4 h-4" />
                      Settings Saved
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#e62b32] hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider text-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>

          {/* Template Preview */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-[#083331] flex flex-col min-h-[700px]">
            <div className="bg-gray-100 border-b p-3 flex items-center gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <div className="ml-4 text-xs font-mono text-gray-500 tracking-wide font-medium">Live Email Preview</div>
            </div>
            <div className="flex-1 bg-white p-4 overflow-y-auto w-full">
              {previewHtml ? (
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} className="w-full h-full" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">Loading preview...</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};
