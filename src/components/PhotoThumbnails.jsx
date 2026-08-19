import React from 'react';
import { Camera, RotateCcw, Check, Sparkles, Trash2 } from 'lucide-react';

export default function PhotoThumbnails({
  photos = [],
  totalShots = 4,
  currentShotIndex = 0,
  isCapturing = false,
  onRetakeSingle,
  onClearAll
}) {
  return (
    <div className="w-full space-y-4">
      
      {/* Progress Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-xs sm:badge-sm badge-secondary font-bold uppercase text-[9px] sm:text-[10px] tracking-wider border-base-content/20 shrink-0">
            Progress
          </span>
          <span className="font-mono text-[11px] sm:text-xs md:text-sm font-extrabold text-base-content tracking-wider truncate">
            {photos.length === totalShots ? (
              <span className="text-success flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> ALL {totalShots} SHOTS READY!
              </span>
            ) : isCapturing ? (
              `TAKING PHOTO ${photos.length + 1} OF ${totalShots}`
            ) : (
              `${photos.length} OF ${totalShots} SHOTS`
            )}
          </span>
        </div>

        {photos.length > 0 && !isCapturing && (
          <button
            onClick={onClearAll}
            className="btn btn-ghost btn-xs text-error font-bold flex items-center gap-1 hover:bg-error/10 rounded-lg text-[11px]"
            title="Clear all photos and restart"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {Array.from({ length: totalShots }).map((_, index) => {
          const isDone = index < photos.length;
          const isCurrent = index === photos.length && isCapturing;

          return (
            <div
              key={index}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                isDone
                  ? 'w-6 sm:w-8 bg-primary shadow-neo-sm'
                  : isCurrent
                  ? 'w-6 sm:w-8 bg-secondary animate-pulse'
                  : 'w-3 sm:w-4 bg-base-300'
              }`}
            />
          );
        })}
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {Array.from({ length: totalShots }).map((_, idx) => {
          const photoUrl = photos[idx];
          const isSlotActive = idx === photos.length && isCapturing;

          return (
            <div
              key={idx}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-200 group ${
                photoUrl
                  ? 'border-base-content/40 bg-base-200 shadow-neo-sm'
                  : isSlotActive
                  ? 'border-secondary border-dashed bg-secondary/10 animate-pulse'
                  : 'border-base-content/20 border-dashed bg-base-200/50'
              }`}
            >
              {photoUrl ? (
                <>
                  <img
                    src={photoUrl}
                    alt={`Shot ${idx + 1}`}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  
                  {/* Badge Number */}
                  <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center justify-center">
                    0{idx + 1}
                  </div>

                  {/* Single Retake Hover Action */}
                  {!isCapturing && onRetakeSingle && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => onRetakeSingle(idx)}
                        className="btn btn-circle btn-xs btn-primary text-white shadow-neo-sm"
                        title={`Retake photo ${idx + 1}`}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-base-content/40 space-y-1">
                  <Camera className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-semibold">Shot {idx + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
