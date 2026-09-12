import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { MessageSquare, Calendar, X, Eye } from 'lucide-react';

interface AdminOpinionsListPageProps {
  onLogout: () => void;
}

export const AdminOpinionsListPage: React.FC<AdminOpinionsListPageProps> = ({ onLogout }) => {
  const [opinions, setOpinions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpinion, setSelectedOpinion] = useState<any | null>(null);

  const fetchOpinions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/opinions`);
      const data = await response.json();
      setOpinions(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch opinions:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true
    }).format(d);
  };

  const renderAreasOfInterest = (areasJson: any, otherInterest: string) => {
    try {
      let areas = [];
      if (typeof areasJson === 'string') {
        areas = JSON.parse(areasJson);
      } else if (Array.isArray(areasJson)) {
        areas = areasJson;
      }
      
      return (
        <ul className="list-disc pl-5 mt-1">
          {areas.map((area: string, i: number) => (
            <li key={i}>{area === 'Other' && otherInterest ? `Other: ${otherInterest}` : area}</li>
          ))}
        </ul>
      );
    } catch (e) {
      return <span>N/A</span>;
    }
  };

  const handleViewOpinion = async (op: any) => {
    setSelectedOpinion(op);
    
    if (!op.isRead) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        await fetch(`${apiUrl}/opinions/${op.id}/read`, { method: 'PATCH' });
        
        // Update local state to mark as read immediately
        setOpinions(prev => prev.map(o => o.id === op.id ? { ...o, isRead: 1 } : o));
      } catch (e) {
        console.error('Failed to mark as read', e);
      }
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        <div className="bg-gradient-to-r from-[#083331] to-[#0a423e] border border-[#16605b] rounded-3xl p-8 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#e62b32]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-[#052322] p-4 rounded-2xl border border-[#16605b]">
              <MessageSquare className="w-8 h-8 text-[#79ded7]" />
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold uppercase tracking-widest text-white mb-2">
                All Opinions & Feedback
              </h2>
              <p className="text-teal-100/70 text-sm max-w-xl leading-relaxed">
                Review detailed feedback submitted by participants through the post-seminar response form.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#052322] border border-[#16605b]/50 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[#16605b]/30">
            <h3 className="font-headline font-bold text-white tracking-widest uppercase">Submitted Responses ({opinions.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-teal-100">
              <thead className="bg-[#083331] text-xs uppercase font-headline tracking-wider text-teal-100/60">
                <tr>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Participant</th>
                  <th className="px-6 py-4 font-bold">Company</th>
                  <th className="px-6 py-4 font-bold">Satisfaction</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16605b]/30">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-teal-100/50">Loading opinions...</td></tr>
                ) : opinions.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-teal-100/50">No opinions submitted yet.</td></tr>
                ) : (
                  opinions.map((op) => (
                    <tr key={op.id} className="hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => handleViewOpinion(op)}>
                      <td className="px-6 py-4 text-xs whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-teal-100/40" />
                          {formatDate(op.submittedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white whitespace-nowrap">{op.name || 'Anonymous'}</span>
                          {!op.isRead && (
                            <span className="bg-[#e62b32] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm shadow-rose-900/50">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-teal-50 truncate max-w-[200px]">{op.company || '-'}</td>
                      <td className="px-6 py-4 text-teal-50">{op.satisfaction || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-[#16605b]/30 hover:bg-[#16605b] text-white p-2 rounded-lg transition-colors inline-flex items-center gap-2 group-hover:bg-[#16605b]">
                          <Eye className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">View</span>
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

      {/* Detailed View Modal */}
      {selectedOpinion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#052322] border border-[#16605b] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
            <div className="p-6 border-b border-[#16605b] flex justify-between items-center bg-[#041e1d] sticky top-0 z-10">
              <h3 className="text-xl font-headline font-bold text-white tracking-widest uppercase">
                Detailed Feedback: {selectedOpinion.name}
              </h3>
              <button 
                onClick={() => setSelectedOpinion(null)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-teal-50 text-sm">
              
              {/* Participant Information */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="text-[#79ded7] font-bold uppercase tracking-widest text-xs mb-4">1. Participant Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/50 block text-xs mb-1">Name</span>
                    <strong className="text-lg">{selectedOpinion.name}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block text-xs mb-1">Company/Org</span>
                    <strong>{selectedOpinion.company || '-'}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block text-xs mb-1">Position</span>
                    <strong>{selectedOpinion.position || '-'}</strong>
                  </div>
                  <div>
                    <span className="text-white/50 block text-xs mb-1">Contact Info</span>
                    <strong>{selectedOpinion.contactInfo || '-'}</strong>
                  </div>
                </div>
              </div>

              {/* Evaluation & Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-[#79ded7] font-bold uppercase tracking-widest text-xs mb-4">2. Overall Evaluation</h4>
                  <div className="text-lg font-bold">{selectedOpinion.satisfaction || 'Not provided'}</div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-[#79ded7] font-bold uppercase tracking-widest text-xs mb-4">3. Areas of Interest</h4>
                  {renderAreasOfInterest(selectedOpinion.areasOfInterest, selectedOpinion.otherInterest)}
                </div>
              </div>

              {/* Future Cooperation & Follow-Up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-[#79ded7] font-bold uppercase tracking-widest text-xs mb-4">4. Future Cooperation</h4>
                  <p className="font-bold mb-2">{selectedOpinion.futureCooperation || 'Not provided'}</p>
                  {selectedOpinion.futureCooperationDetails && (
                    <div className="bg-black/20 p-3 rounded-lg text-white/80 italic">
                      {selectedOpinion.futureCooperationDetails}
                    </div>
                  )}
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-[#79ded7] font-bold uppercase tracking-widest text-xs mb-4">5. Follow-up Meeting</h4>
                  <p className="font-bold mb-2">{selectedOpinion.followUpMeeting || 'Not provided'}</p>
                  {selectedOpinion.preferredTopic && (
                    <div className="bg-black/20 p-3 rounded-lg text-white/80 italic">
                      <span className="text-white/50 block text-xs mb-1 not-italic">Preferred Topic:</span>
                      {selectedOpinion.preferredTopic}
                    </div>
                  )}
                </div>
              </div>

              {/* Comments */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
                <h4 className="text-[#79ded7] font-bold uppercase tracking-widest text-xs mb-4">6. Comments & Suggestions</h4>
                
                <div>
                  <span className="text-white/50 block text-xs mb-2">Most valuable part of the seminar:</span>
                  <div className="bg-black/20 p-4 rounded-lg text-white/90 whitespace-pre-wrap">
                    {selectedOpinion.mostValuablePart || '-'}
                  </div>
                </div>
                
                <div>
                  <span className="text-white/50 block text-xs mb-2">Comments or suggestions for future programmes:</span>
                  <div className="bg-black/20 p-4 rounded-lg text-white/90 whitespace-pre-wrap">
                    {selectedOpinion.commentsSuggestions || '-'}
                  </div>
                </div>
              </div>

              <div className="text-center text-white/30 text-xs">
                Submitted on: {formatDate(selectedOpinion.submittedAt)}
                <br />
                Consent provided: {selectedOpinion.consent ? 'Yes' : 'No'}
              </div>

            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
