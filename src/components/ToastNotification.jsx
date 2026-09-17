import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function ToastNotification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="glass-panel border-zinc-300 p-4 rounded-2xl shadow-xl flex items-center gap-3 bg-white/95 backdrop-blur-md max-w-md">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="text-xs text-zinc-900 font-bold leading-tight">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-black p-1 ml-auto shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
