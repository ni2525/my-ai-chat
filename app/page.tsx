'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `「${input}」についての回答です（ここにAIの回答が入ります）。` },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-zinc-950 text-gray-100">
      {/* ヘッダー */}
      <header className="border-b border-zinc-800 p-4 text-center bg-zinc-900 shadow-sm">
        <h1 className="text-lg font-bold text-gray-200">AI カスタマーサポート</h1>
      </header>

      {/* チャット履歴エリア */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl w-full mx-auto">
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-20">
            <p className="text-lg font-medium">何か質問はありますか？</p>
            <p className="text-sm mt-1">下の入力欄からメッセージを送信してください。</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="border-t border-zinc-800 p-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="メッセージを入力..."
            className="flex-1 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-800 text-white placeholder-zinc-400"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}