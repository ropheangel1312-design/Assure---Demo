import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const icons = {
          info: <Info className="w-4 h-4 text-[#3A6FD8] shrink-0" />,
          success: <CheckCircle className="w-4 h-4 text-[#2E9268] shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-[#C8922F] shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-[#C4483F] shrink-0" />,
        };

        const borderColors = {
          info: 'border-[#3A6FD8]/40',
          success: 'border-[#2E9268]/40',
          warning: 'border-[#C8922F]/40',
          error: 'border-[#C4483F]/40',
        };

        return (
          <div
            key={t.id}
            className={`pointer-events-auto bg-[#12161B] border ${borderColors[t.type]} p-4 rounded-lg shadow-xl text-xs text-[#E9EEF4] flex items-start gap-3 animate-slideIn`}
          >
            {icons[t.type]}
            <div className="flex-1 space-y-0.5">
              <div className="font-semibold text-[#E9EEF4]">{t.title}</div>
              <div className="text-[#9AA6B4] leading-relaxed">{t.message}</div>
              {t.undoAction && (
                <button
                  type="button"
                  onClick={t.undoAction}
                  className="mt-1.5 text-[#3A6FD8] hover:underline font-semibold cursor-pointer"
                >
                  Undo Action
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-[#667486] hover:text-[#E9EEF4] p-1 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
