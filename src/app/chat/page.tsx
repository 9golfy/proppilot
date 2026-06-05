'use client';

import { FormEvent, useMemo, useState } from 'react';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const initialPrompt =
  'ช่วยแนะนำตัวหน่อยครับ และบอกข้อดีของการรันผ่าน OpenRouter คืออะไร?';

const modelOptions = [
  {
    label: 'Free Router',
    value: 'openrouter/free',
  },
  {
    label: 'Gemma 4 31B Free',
    value: 'google/gemma-4-31b-it:free',
  },
];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialPrompt);
  const [model, setModel] = useState(modelOptions[0].value);
  const [activeModel, setActiveModel] = useState(modelOptions[0].value);
  const [fallbackReason, setFallbackReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiMessages = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    [messages]
  );

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prompt = input.trim();
    if (!prompt || isLoading) return;

    const userMessage = createMessage('user', prompt);
    const nextMessages = [...apiMessages, { role: 'user' as const, content: prompt }];

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages,
          model,
        }),
      });

      const data = (await response.json()) as {
        text?: string;
        model?: string;
        fallbackReason?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || 'ส่งข้อความไม่สำเร็จ');
      }

      setMessages((current) => [...current, createMessage('assistant', data.text || '')]);
      setActiveModel(data.model || model);
      setFallbackReason(data.fallbackReason || '');
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'เกิดข้อผิดพลาด');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 text-[#0F172A]">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_18px_54px_rgba(15,23,42,0.08)]">
        <header className="border-b border-[#E2E8F0] px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold">OpenRouter Chat Test</h1>
              <p className="mt-1 text-sm text-[#64748B]">Active model: {activeModel}</p>
            </div>

            <label className="flex flex-col gap-1 text-sm font-medium text-[#334155]">
              Model
              <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="h-10 rounded-[10px] border border-[#CBD5E1] bg-white px-3 text-sm outline-none focus:border-[#6C63FF] focus:ring-3 focus:ring-[#6C63FF]/20"
              >
                {modelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {fallbackReason ? (
            <div className="mt-3 rounded-[10px] border border-[#FED7AA] bg-[#FFF7ED] px-3 py-2 text-sm text-[#9A3412]">
              Primary model failed, fallback used: {fallbackReason}
            </div>
          ) : null}
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-sm text-[#475569]">
              ลองกดส่งข้อความตัวอย่าง หรือพิมพ์คำถามใหม่เพื่อทดสอบ Chatbot ผ่าน OpenRouter
            </div>
          ) : (
            messages.map((message) => (
              <article
                key={message.id}
                className={`max-w-[85%] rounded-[12px] px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'ml-auto bg-[#6C63FF] text-white'
                    : 'mr-auto border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]'
                }`}
              >
                <div className="mb-1 text-xs font-semibold opacity-75">
                  {message.role === 'user' ? 'คุณ' : 'Chatbot'}
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </article>
            ))
          )}

          {isLoading ? (
            <div className="mr-auto rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#64748B]">
              กำลังคิดคำตอบ...
            </div>
          ) : null}
        </div>

        <form onSubmit={sendMessage} className="border-t border-[#E2E8F0] p-4">
          {error ? (
            <div className="mb-3 rounded-[10px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-sm text-[#B91C1C]">
              {error}
            </div>
          ) : null}

          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={3}
              className="min-h-[76px] flex-1 resize-none rounded-[10px] border border-[#CBD5E1] bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-[#6C63FF] focus:ring-3 focus:ring-[#6C63FF]/20"
              placeholder="พิมพ์ข้อความ..."
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="self-end rounded-[10px] bg-[#6C63FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5B52E8] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
            >
              ส่ง
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
