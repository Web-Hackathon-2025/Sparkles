import React, { useState, useEffect, useRef } from 'react';
import { Send, User, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { formatDate } from '../../utils/helpers';

const ChatBox = ({ booking }) => {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Initialize with default operational messages if history is empty
        const initialMessages = [
            {
                id: 1,
                sender: 'System',
                text: 'Operational terminal initialized. Secure E2E tunnel established.',
                time: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
                type: 'system'
            },
            {
                id: 2,
                sender: 'System',
                text: `Booking #${booking.id.toString().padStart(5, '0')} has been matched with ${booking.customerName}.`,
                time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                type: 'system'
            }
        ];
        setMessages(initialMessages);
        scrollToBottom();
    }, [booking]);

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            sender: user.name,
            text: newMessage,
            time: new Date().toISOString(),
            isMe: true
        };

        setMessages(prev => [...prev, msg]);
        setNewMessage('');

        // Simulate a provider/seeker response after a 1.5s delay
        setIsTyping(true);
        setTimeout(() => {
            const response = {
                id: Date.now() + 1,
                sender: user.role === 'customer' ? 'Expert Provider' : booking.customerName,
                text: user.role === 'customer'
                    ? "Received. I am currently analyzing the logistic requirements for this job. Will update shortly."
                    : "Excellent. I will prepare the site for your arrival. Let me know if you need specific parking instructions.",
                time: new Date().toISOString(),
                isMe: false
            };
            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-[#F8F5F0]">
            {/* Chat Flow Header Info */}
            <div className="bg-[#2C475C]/5 p-4 border-b border-[#2C475C]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase text-[#2C475C]/40 tracking-widest">Signal: Optimal</span>
                </div>
                <div className="flex items-center gap-2 text-[#2C475C]/40">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Terminal</span>
                </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.type === 'system' ? 'justify-center' : (msg.isMe ? 'justify-end' : 'justify-start')}`}
                    >
                        {msg.type === 'system' ? (
                            <div className="bg-[#2C475C]/5 px-4 py-1.5 rounded-full border border-[#2C475C]/10">
                                <p className="text-[10px] font-black uppercase text-[#2C475C]/30 tracking-widest text-center">
                                    {msg.text}
                                </p>
                            </div>
                        ) : (
                            <div className={`max-w-[80%] flex items-end gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center border-2 ${msg.isMe ? 'bg-[#2C475C] border-white' : 'bg-white border-[#F8F5F0]'} shadow-sm`}>
                                    {msg.isMe ? (
                                        <div className="text-white text-xs font-black uppercase">{user.name.charAt(0)}</div>
                                    ) : (
                                        <User className="h-5 w-5 text-[#2C475C]/20" />
                                    )}
                                </div>
                                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-4 rounded-[1.5rem] shadow-sm ${msg.isMe ? 'bg-[#2C475C] text-white rounded-tr-none' : 'bg-white text-[#2C475C] rounded-tl-none border border-[#2C475C]/5'}`}>
                                        <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 px-1">
                                        <span className="text-[10px] font-bold text-[#2C475C]/30 uppercase tracking-tighter">
                                            {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {msg.isMe && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[#2C475C]/5 px-5 py-3 rounded-[1.5rem] rounded-tl-none flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 bg-[#F97B27]/40 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-[#F97B27]/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-1.5 h-1.5 bg-[#F97B27]/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Intelligence */}
            <div className="p-6 bg-white border-t border-[#2C475C]/10">
                <form onSubmit={handleSendMessage} className="relative group">
                    <input
                        type="text"
                        placeholder="Type operational message..."
                        className="w-full bg-[#F8F5F0] border-2 border-transparent rounded-[2rem] pl-6 pr-16 py-5 focus:bg-white focus:border-[#F97B27] focus:ring-0 transition-all duration-300 text-[#2C475C] font-medium placeholder:text-[#2C475C]/40"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-[#F97B27] hover:bg-[#e66a16] text-white rounded-full flex items-center justify-center shadow-lg transform active:scale-90 transition-all group-hover:rotate-12"
                    >
                        <Send className="h-6 w-6" />
                    </button>
                </form>
                <div className="flex justify-between items-center mt-4 px-4">
                    <p className="text-[9px] font-black uppercase text-[#2C475C]/30 tracking-[0.2em]">Escrow Protection Active</p>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-[#2C475C]/20" />
                        <span className="text-[9px] font-bold text-[#2C475C]/30 uppercase">Latency: 14ms</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
