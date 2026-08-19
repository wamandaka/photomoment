import React, { useState } from 'react';
import { Download, Copy, Share2, RotateCcw, Check, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { downloadPhotoStrip, copyPhotoStripToClipboard, sharePhotoStrip } from '../utils/downloadImage';

export default function DownloadButton({
  photoStripRef,
  onTakeAnother,
  onBeforeExport,
  onAfterExport,
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
      onBeforeExport?.();
      // Allow DOM to update and remove selection handles
      await new Promise((r) => setTimeout(r, 60));
      const filename = await downloadPhotoStrip(photoStripRef.current);
      showToast(`Tersimpan sebagai ${filename}! 📸✨`);
    } catch (err) {
      console.error(err);
      showToast('Gagal mengunduh gambar. Silakan coba lagi.', 'error');
    } finally {
      setIsExporting(false);
      onAfterExport?.();
    }
  };

  const handleCopy = async () => {
    if (!photoStripRef.current || isExporting) return;
    try {
      setIsExporting(true);
      onBeforeExport?.();
      await new Promise((r) => setTimeout(r, 60));
      await copyPhotoStripToClipboard(photoStripRef.current);
      showToast('Gambar berhasil disalin ke Clipboard! 📋');
    } catch (err) {
      console.error(err);
      showToast('Browser tidak mendukung copy gambar langsung.', 'error');
    } finally {
      setIsExporting(false);
      onAfterExport?.();
    }
  };

  const handleShare = async () => {
    if (!photoStripRef.current || isExporting) return;
    try {
      setIsExporting(true);
      onBeforeExport?.();
      await new Promise((r) => setTimeout(r, 60));
      await sharePhotoStrip(photoStripRef.current);
      showToast('Dibagikan! 🎉');
    } catch (err) {
      if (err.name !== 'AbortError') {
        showToast('Fitur share tidak didukung pada browser ini.', 'error');
      }
    } finally {
      setIsExporting(false);
      onAfterExport?.();
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-sm mx-auto sm:mx-0 animate-bounce">
          <div
            className={`alert shadow-neo border-2 border-base-content rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-bold ${
              toastType === 'success'
                ? 'bg-success text-success-content'
                : 'bg-error text-error-content'
            }`}
          >
            {toastType === 'success' ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            )}
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Download CTA */}
      <button
        onClick={handleDownload}
        disabled={isExporting}
        id="download-final-png-btn"
        className="btn btn-md sm:btn-lg btn-neo-primary w-full rounded-2xl font-extrabold text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-2.5 shadow-neo-lg"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            <span>Memproses Foto HD...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            <span>Download Photo Strip (.PNG)</span>
          </>
        )}
      </button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        <button
          onClick={handleCopy}
          disabled={isExporting}
          className="btn btn-sm sm:btn-md btn-neo-ghost rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Copy</span>
        </button>

        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleShare}
            disabled={isExporting}
            className="btn btn-sm sm:btn-md btn-neo-ghost rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Share</span>
          </button>
        )}

        <button
          onClick={onTakeAnother}
          className={`btn btn-sm sm:btn-md btn-neo-secondary rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 ${
            typeof navigator !== 'undefined' && navigator.share
              ? 'col-span-2 sm:col-span-1'
              : 'col-span-1'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Take Another</span>
        </button>
      </div>

    </div>
  );
}
