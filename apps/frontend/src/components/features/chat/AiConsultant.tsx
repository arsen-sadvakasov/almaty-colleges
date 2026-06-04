"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

export function AiConsultant() {
  const t = useTranslations('AiConsultant');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "bot",
      content: t('initialMessage')
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: t('mockResponse')
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col h-[600px] overflow-hidden transition-colors">
      {/* Header */}
      <div className="bg-primary-900 dark:bg-neutral-800 text-white p-4 sm:p-6 flex items-center justify-between flex-shrink-0 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-primary-900 rounded-full" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl">{t('title')}</h2>
            <p className="text-primary-200 text-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {t('aiPowered')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50 dark:bg-neutral-950 space-y-6 transition-colors">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary-100 text-primary-600" : "bg-primary-900 text-white"}`}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-primary-500 text-white rounded-tr-none" : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-tl-none shadow-sm transition-colors"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 flex-row">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-900 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 transition-colors">
              <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">{t('typing')}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex-shrink-0 transition-colors">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            className="w-full pl-6 pr-14 py-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-neutral-100 rounded-2xl transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-3">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}
