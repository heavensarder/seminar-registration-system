import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import { TsiLogo } from '../components/TsiLogo';

export const OpinionPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Section 1: Participant Information
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  
  // Section 2: Overall Evaluation
  const [satisfaction, setSatisfaction] = useState('');
  
  // Section 3: Areas of Interest
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState('');
  
  // Section 4: Future Cooperation
  const [futureCooperation, setFutureCooperation] = useState('');
  const [futureCooperationDetails, setFutureCooperationDetails] = useState('');
  
  // Section 5: Follow-Up Meeting
  const [followUpMeeting, setFollowUpMeeting] = useState('');
  const [preferredTopic, setPreferredTopic] = useState('');
  
  // Section 6: Comments and Suggestions
  const [mostValuablePart, setMostValuablePart] = useState('');
  const [commentsSuggestions, setCommentsSuggestions] = useState('');
  
  // Consent
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAreaChange = (area: string) => {
    setAreasOfInterest(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please agree to the consent before submitting.');
      window.scrollTo(0, 0);
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/opinions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, company, position, contactInfo, 
          satisfaction, areasOfInterest, otherInterest, 
          futureCooperation, futureCooperationDetails, 
          followUpMeeting, preferredTopic, 
          mostValuablePart, commentsSuggestions, consent 
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo(0, 0);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit opinion. Please try again.');
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error(err);
      setError('A network error occurred. Please try again later.');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#052322] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#041e1d] border border-[#16605b] rounded-3xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">Thank You! / ありがとうございました！</h2>
          <p className="text-teal-100/70 mb-8">
            Your feedback has been successfully submitted. We appreciate your valuable response for KIZUNA 2026.
            <br/><br/>
            アンケートへのご協力、誠にありがとうございました。
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#083331] hover:bg-[#16605b] text-white border border-[#16605b] px-6 py-3 rounded-xl font-bold transition-all w-full"
          >
            Return to Homepage / ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full bg-[#083331] border border-[#16605b] rounded-xl px-4 py-3 outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-colors text-white placeholder-teal-100/40 mt-1 dark-autofill";
  const textareaClasses = "w-full bg-[#083331] border border-[#16605b] p-3 rounded-xl outline-none focus:border-[#79ded7] focus:ring-1 focus:ring-[#79ded7] transition-colors text-white min-h-[100px] resize-y mt-2";
  const labelClasses = "block font-bold text-teal-100 mb-1 text-sm";
  const sectionTitleClasses = "text-lg font-headline font-bold text-white uppercase tracking-widest border-b border-[#16605b]/50 pb-2 mb-6 mt-12";
  const radioLabelClasses = "flex items-start gap-3 cursor-pointer group mb-3 text-teal-100/80 hover:text-white transition-colors text-sm";
  const checkboxLabelClasses = "flex items-start gap-3 cursor-pointer group mb-3 text-teal-100/80 hover:text-white transition-colors text-sm";

  return (
    <div className="min-h-screen bg-[#052322] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#e62b32] selection:text-white relative overflow-hidden">
      <style>{`
        .dark-autofill:-webkit-autofill,
        .dark-autofill:-webkit-autofill:hover, 
        .dark-autofill:-webkit-autofill:focus, 
        .dark-autofill:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #083331 inset !important;
            -webkit-text-fill-color: white !important;
            border-color: #16605b !important;
        }
      `}</style>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#79ded7]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e62b32]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto bg-[#041e1d] border border-[#16605b]/50 rounded-3xl p-6 sm:p-10 relative z-10 shadow-2xl">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-headline font-bold text-white uppercase tracking-widest mb-2">KIZUNA 2026</h1>
          <h2 className="text-lg font-bold text-[#79ded7] mb-6">Okayama–Bangladesh Partnership Seminar</h2>
          <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest mb-6 border-b-2 border-[#16605b] pb-4 inline-block">
            Post-Seminar Response Form / セミナー後のアンケート
          </h3>
          <p className="mb-4 leading-relaxed text-sm text-teal-100/70 max-w-2xl mx-auto">
            Thank you for attending KIZUNA 2026. Your feedback will help us improve future programmes and strengthen cooperation between Okayama and Bangladesh.
          </p>
          <p className="leading-relaxed text-sm text-teal-100/70 max-w-2xl mx-auto">
            KIZUNA 2026 にご参加いただき、誠にありがとうございました。今後の企画改善と岡山・バングラデシュ間の連携強化のため、アンケートへのご協力をお願いいたします。
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-sm text-center mb-8">
              {error}
            </div>
          )}

          {/* Section 1: Participant Information */}
          <div className="mb-10 space-y-6">
            <h4 className={sectionTitleClasses}>1. Participant Information / 参加者情報</h4>
            
            <div>
              <label className={labelClasses}>Name / 氏名:</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className={inputClasses} />
            </div>
            
            <div>
              <label className={labelClasses}>Company or organization / 会社・団体名:</label>
              <input type="text" required value={company} onChange={e => setCompany(e.target.value)} className={inputClasses} />
            </div>
            
            <div>
              <label className={labelClasses}>Position / 役職:</label>
              <input type="text" required value={position} onChange={e => setPosition(e.target.value)} className={inputClasses} />
            </div>
            
            <div>
              <label className={labelClasses}>Email or telephone number (optional) / メールアドレスまたは電話番号（任意）:</label>
              <input type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} className={inputClasses} />
            </div>
          </div>

          {/* Section 2: Overall Evaluation */}
          <div className="mb-10">
            <h4 className={sectionTitleClasses}>2. Overall Evaluation / 総合評価</h4>
            <div className="mb-4">
              <p className="font-bold text-white mb-1">How satisfied were you with the seminar?</p>
              <p className="font-bold text-white mb-4">本セミナーにどの程度満足されましたか。</p>
              
              <div className="space-y-1 ml-4">
                {[
                  "Very satisfied / 大変満足",
                  "Satisfied / 満足",
                  "Neutral / 普通",
                  "Dissatisfied / やや不満",
                  "Very dissatisfied / 不満"
                ].map((opt) => (
                  <label key={opt} className={radioLabelClasses}>
                    <input type="radio" name="satisfaction" value={opt} checked={satisfaction === opt} onChange={e => setSatisfaction(e.target.value)} required className="mt-1" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Areas of Interest */}
          <div className="mb-10">
            <h4 className={sectionTitleClasses}>3. Areas of Interest / 関心分野</h4>
            <div className="mb-4">
              <p className="font-bold text-white mb-1">Which areas are you interested in? Please select all that apply.</p>
              <p className="font-bold text-white mb-4">関心のある分野をすべてお選びください。</p>
              
              <div className="space-y-1 ml-4">
                {[
                  "Recruitment of skilled Bangladeshi workers / バングラデシュ人材の採用",
                  "Technical Intern Training / 技能実習",
                  "Specified Skilled Worker programme / 特定技能",
                  "Highly skilled professionals / 高度人材",
                  "Caregiving personnel / 介護人材",
                  "Japanese-language education / 日本語教育",
                  "Study in Japan / 日本留学",
                  "Business partnerships / ビジネス連携",
                  "Trade and investment / 貿易・投資",
                  "Educational cooperation / 教育連携"
                ].map((opt) => (
                  <label key={opt} className={checkboxLabelClasses}>
                    <input type="checkbox" checked={areasOfInterest.includes(opt)} onChange={() => handleAreaChange(opt)} className="mt-1" />
                    <span>{opt}</span>
                  </label>
                ))}
                
                <div className="flex items-center gap-3 mt-3 ml-1 text-teal-100/80 text-sm">
                  <input type="checkbox" checked={areasOfInterest.includes('Other')} onChange={() => handleAreaChange('Other')} />
                  <span className="whitespace-nowrap">Other / その他:</span>
                  <input 
                    type="text" 
                    value={otherInterest} 
                    onChange={e => {
                      setOtherInterest(e.target.value);
                      if (!areasOfInterest.includes('Other') && e.target.value) handleAreaChange('Other');
                    }}
                    className="flex-1 bg-transparent border-b border-[#16605b] outline-none px-2 py-1 text-white focus:border-[#79ded7] transition-colors" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Future Cooperation */}
          <div className="mb-10">
            <h4 className={sectionTitleClasses}>4. Future Cooperation / 今後の連携</h4>
            <div className="mb-6">
              <p className="font-bold text-white mb-1">Would you be interested in discussing future cooperation with TSI Limited or its partners?</p>
              <p className="font-bold text-white mb-4">TSI Limited または関係機関との今後の連携に関心がありますか。</p>
              
              <div className="space-y-1 ml-4">
                {[
                  "Yes / はい",
                  "Maybe; I would like more information / 関心があるため、詳しい情報を希望",
                  "Not at this time / 現時点では希望しない"
                ].map((opt) => (
                  <label key={opt} className={radioLabelClasses}>
                    <input type="radio" name="futureCooperation" value={opt} checked={futureCooperation === opt} onChange={e => setFutureCooperation(e.target.value)} required className="mt-1" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {futureCooperation === 'Yes / はい' && (
              <div className="mt-6">
                <p className="font-bold text-white mb-1">If yes, what type of cooperation interests you?</p>
                <p className="font-bold text-white mb-2">「はい」と回答された方は、希望する連携内容をご記入ください。</p>
                <textarea value={futureCooperationDetails} onChange={e => setFutureCooperationDetails(e.target.value)} className={textareaClasses}></textarea>
              </div>
            )}
          </div>

          {/* Section 5: Follow-Up Meeting */}
          <div className="mb-10">
            <h4 className={sectionTitleClasses}>5. Follow-Up Meeting / 個別相談・面談</h4>
            <div className="mb-6">
              <p className="font-bold text-white mb-1">Would you like us to arrange a follow-up meeting?</p>
              <p className="font-bold text-white mb-4">後日、個別相談または面談を希望されますか。</p>
              
              <div className="space-y-1 ml-4">
                {[
                  "Yes—in person / はい（対面）",
                  "Yes—online / はい（オンライン）",
                  "Please contact me with further information / 詳細情報の送付を希望",
                  "No / いいえ"
                ].map((opt) => (
                  <label key={opt} className={radioLabelClasses}>
                    <input type="radio" name="followUpMeeting" value={opt} checked={followUpMeeting === opt} onChange={e => setFollowUpMeeting(e.target.value)} required className="mt-1" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {followUpMeeting && followUpMeeting !== 'No / いいえ' && (
              <div className="mt-6">
                <label className="font-bold text-white block mb-2">Preferred topic / 希望する相談内容:</label>
                <textarea value={preferredTopic} onChange={e => setPreferredTopic(e.target.value)} className={textareaClasses} rows={2}></textarea>
              </div>
            )}
          </div>

          {/* Section 6: Comments and Suggestions */}
          <div className="mb-10">
            <h4 className={sectionTitleClasses}>6. Comments and Suggestions / ご意見・ご感想</h4>
            
            <div className="mb-6">
              <p className="font-bold text-white mb-1">What was the most valuable part of the seminar?</p>
              <p className="font-bold text-white mb-2">本セミナーで最も有意義だった内容をお聞かせください。</p>
              <textarea value={mostValuablePart} onChange={e => setMostValuablePart(e.target.value)} className={textareaClasses}></textarea>
            </div>
            
            <div>
              <p className="font-bold text-white mb-1">Please share any comments or suggestions for future programmes.</p>
              <p className="font-bold text-white mb-2">今後の企画に対するご意見・ご要望をお聞かせください。</p>
              <textarea value={commentsSuggestions} onChange={e => setCommentsSuggestions(e.target.value)} className={textareaClasses}></textarea>
            </div>
          </div>

          {/* Consent */}
          <div className="mb-10">
            <h4 className={sectionTitleClasses}>Consent / 同意</h4>
            
            <label className="flex items-start gap-3 cursor-pointer p-4 bg-[#083331] border border-[#16605b] rounded-xl ml-4 hover:border-[#79ded7] transition-colors group">
              <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />
              <span className="text-sm text-teal-100 group-hover:text-white transition-colors">
                I agree that the organizers may contact me regarding the interests indicated above.<br/>
                上記の関心事項について、主催者から連絡を受けることに同意します。
              </span>
            </label>
          </div>

          <div className="pt-8 border-t border-[#16605b] text-center">
            <p className="mb-2 text-teal-100">Thank you for your valuable feedback and participation.</p>
            <p className="mb-8 text-teal-100">貴重なご意見とご参加に心より御礼申し上げます。</p>
            
            <p className="font-bold text-white font-headline tracking-wider">KIZUNA 2026 Organizing Team</p>
            <p className="font-bold text-white font-headline tracking-wider mb-8">TSI Limited</p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto mx-auto bg-[#e62b32] hover:bg-rose-600 text-white font-bold py-4 px-12 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg shadow-rose-900/20 cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form / 送信'}
              <Send className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
