import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <aside aria-label="Notification" className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 text-xs font-medium tracking-wide">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </aside>
  );
};
