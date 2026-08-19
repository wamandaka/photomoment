import React from 'react';
import { Camera, Sparkles, Loader2 } from 'lucide-react';

export default function CaptureButton({
  onCapture,
  isCapturing,
  disabled = false,
  currentCount = 0,
  totalCount = 4
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      
      {/* Big Circular Capture Button */}
      <button
        onClick={onCapture}
        disabled={disabled || isCapturing}
        id="capture-main-btn"
        className={`group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-150 border-4 border-base-content shadow-neo-lg select-none ${
          disabled || isCapturing
            ? 'bg-base-300 opacity-60 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90 text-primary-content hover:scale-105 active:scale-95 active:shadow-neo-sm cursor-pointer'
        }`}
        title={isCapturing ? 'Taking photos...' : 'Take photos!'}
        aria-label="Capture Photos"
      >
        {/* Subtle inner ring */}
        <span className="absolute inset-1.5 rounded-full border-2 border-white/40 pointer-events-none" />

        {isCapturing ? (
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-white" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform group-hover:scale-110" strokeWidth={2.2} />
          </div>
        )}
      </button>

      {/* Button Helper Label */}
      <div className="text-center">
        <p className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-base-content flex items-center gap-1.5 justify-center">
          {isCapturing ? (
            <span className="text-primary flex items-center gap-1">
              <Sparkles className="w-4 h-4 animate-spin" /> Capturing {currentCount + 1} of {totalCount}...
            </span>
          ) : (
            <span>Click to Capture Sequence</span>
          )}
        </p>
        <p className="text-[11px] font-medium text-base-content/60">
          Takes {totalCount} poses automatically with countdown
        </p>
      </div>

    </div>
  );
}
