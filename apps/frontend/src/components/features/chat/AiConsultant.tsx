"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: "0",
  role: "bot",
  content: "Здравствуйте! Я виртуальный консультант портала колледжей Алматинской области. Могу помочь вам с выбором колледжа, рассказать о специальностях или условиях поступления на грант. Какой у вас вопрос?"
};

export function AiConsultant() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
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
        content: "Спасибо за ваш вопрос! На данный момент я работаю в демонстрационном режиме. В будущем я смогу подключиться к базе данных портала и предоставить точный ответ на ваш запрос, опираясь на официальные правила приема и данные колледжей."
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
    <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-primary-900 text-white p-4 sm:p-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-primary-900 rounded-full" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl">AI-Консультант</h2>
            <p className="text-primary-200 text-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> На базе ИИ
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary-100 text-primary-600" : "bg-primary-900 text-white"}`}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-primary-500 text-white rounded-tr-none" : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none shadow-sm"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 flex-row">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-900 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white border border-neutral-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
              <span className="text-neutral-500 text-sm">Печатает ответ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-neutral-200 flex-shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Спросите меня о поступлении..."
            className="w-full pl-6 pr-14 py-4 bg-neutral-100 border-transparent focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500 rounded-2xl transition-all"
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
        <p className="text-center text-xs text-neutral-400 mt-3">
          AI-Консультант может ошибаться. Уточняйте важную информацию в приемной комиссии.
        </p>
      </div>
    </div>
  );
}
