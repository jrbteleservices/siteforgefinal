// src/components/chat/AiConciergeWidget.tsx
import { useState } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { processConciergeMessage } from '../../api/chat';

interface AiConciergeProps {
  websiteId: string;
  siteData: any;
  brandingConfig?: {
    botName?: string;
    welcomeMessage?: string;
    showBranding?: boolean;
  };
}

export default function AiConciergeWidget({ websiteId, siteData, brandingConfig }: AiConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: brandingConfig?.welcomeMessage || `Hi! 👋 I'm the virtual assistant for ${siteData.businessName}. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const updated = [...messages, { sender: 'user' as const, text: userMsg }];
    setMessages(updated);
    setInput('');
    setLoading(true);

    const response = await processConciergeMessage(websiteId, 'session-123', userMsg, siteData);
    setMessages([...updated, { sender: 'bot' as const, text: response.reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[365px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{brandingConfig?.botName || `${siteData.businessName} Assistant`}</h4>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1">● Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-slate-500 text-[10px] italic">Assistant is typing...</div>}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about price, services, hours..." 
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {brandingConfig?.showBranding !== false && (
            <div className="bg-slate-950 py-1.5 px-3 text-center border-t border-slate-900 text-[9px] text-slate-500">
              Powered by <span className="font-bold text-slate-400">SiteForge</span>
            </div>
          )}
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group relative"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg font-semibold pointer-events-none">
          AI Concierge
        </span>
      </button>
    </div>
  );
}