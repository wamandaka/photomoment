import React from 'react';
import { AlertCircle, RotateCcw, X } from 'lucide-react';

export default function RetakeModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="card-neo max-w-md w-full p-6 bg-base-100 space-y-4 relative">
        <button
          onClick={onClose}
          className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-warning/20 text-warning flex items-center justify-center border-2 border-warning shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-base-content font-display">
              {title || 'Retake Photos?'}
            </h3>
            <p className="text-xs text-base-content/70">
              {message || 'Foto saat ini akan direset dan Anda dapat mengambil ulang foto baru.'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-base-content/10">
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost rounded-xl font-bold"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm btn-neo-primary rounded-xl font-bold gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ya, Ambil Ulang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
