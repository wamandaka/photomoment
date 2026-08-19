import React, { useState } from 'react';
import { Download, Copy, Share2, RotateCcw, Check, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { downloadPhotoStrip, copyPhotoStripToClipboard, sharePhotoStrip } from '../utils/downloadImage';

export default function DownloadButton({
  photoStripRef,
  onTakeAnother,
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleDownload = async () => {
    if (!photoStripRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const filename = await downloadPhotoStrip(photoStripRef.current);
      showToast(`Tersimpan sebagai ${filename}! 📸✨`);
    } catch (err) {
      console.error(err);
      showToast('Gagal mengunduh gambar. Silakan coba lagi.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    if (!photoStripRef.current || isExporting) return;
    try {
      setIsExporting(true);
      await copyPhotoStripToClipboard(photoStripRef.current);
      showToast('Gambar berhasil disalin ke Clipboard! 📋');
    } catch (err) {
      console.error(err);
      showToast('Browser tidak mendukung copy gambar langsung.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!photoStripRef.current || isExporting) return;
    try {
      setIsExporting(true);
      await sharePhotoStrip(photoStripRef.current);
      showToast('Dibagikan! 🎉');
    } catch (err) {
      if (err.name !== 'AbortError') {
        showToast('Fitur share tidak didukung pada browser ini.', 'error');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`alert shadow-neo border-2 border-base-content rounded-2xl flex items-center gap-2 text-sm font-bold ${
              toastType === 'success'
                ? 'bg-success text-success-content'
                : 'bg-error text-error-content'
            }`}
          >
            {toastType === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Download CTA */}
      <button
        onClick={handleDownload}
        disabled={isExporting}
        id="download-final-png-btn"
        className="btn btn-lg btn-neo-primary w-full rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-neo-lg"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Memproses Foto HD...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" strokeWidth={2.5} />
            <span>Download Photo Strip (.PNG)</span>
          </>
        )}
      </button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopy}
          disabled={isExporting}
          className="btn btn-md btn-neo-ghost rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          <span>Copy Image</span>
        </button>

        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleShare}
            disabled={isExporting}
            className="btn btn-md btn-neo-ghost rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        )}

        <button
          onClick={onTakeAnother}
          className="btn btn-md btn-neo-secondary rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 col-span-2 sm:col-span-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Take Another</span>
        </button>
      </div>

    </div>
  );
}
