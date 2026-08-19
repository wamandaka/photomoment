import React, { forwardRef } from 'react';
import { Camera, Sparkles, Heart, Star } from 'lucide-react';
import { FRAME_COLORS } from '../data/frames';

const PhotoStrip = forwardRef(function PhotoStrip(
  {
    photos = [],
    templateId = 'classic',
    filterClass = 'filter-original',
    frameId = 'white',
    caption = 'Our little moment ♡',
    dateText = '19 AUG 2026',
    showDate = true,
    stickers = [],
    isDemo = false,
  },
  ref
) {
  const currentFrame = FRAME_COLORS.find((f) => f.id === frameId) || FRAME_COLORS[0];
  const isDarkFrame = frameId === 'black' || frameId === 'film-black';

  return (
    <div
      ref={ref}
      id="export-photo-strip"
      style={{
        backgroundColor: currentFrame.hex,
        color: currentFrame.textHex,
      }}
      className={`photo-strip-container w-[280px] sm:w-[320px] mx-auto p-4 sm:p-5 rounded-3xl border-3 border-black shadow-neo-xl transition-all duration-300 relative select-none ${
        templateId === 'retro' ? 'font-mono' : ''
      }`}
    >
      {/* 1. RETRO FILM SPROCKETS (Only for retro template) */}
      {templateId === 'retro' && (
        <>
          <div className="absolute left-1 top-4 bottom-4 w-3.5 flex flex-col justify-between items-center opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-2 h-2.5 rounded-xs bg-amber-400/80" />
            ))}
          </div>
          <div className="absolute right-1 top-4 bottom-4 w-3.5 flex flex-col justify-between items-center opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-2 h-2.5 rounded-xs bg-amber-400/80" />
            ))}
          </div>
        </>
      )}

      {/* 2. POLAROID TOP TAPE ACCENT */}
      {templateId === 'polaroid' && (
        <div className="w-16 h-4 bg-amber-100/70 border border-amber-300/40 rounded-xs mx-auto -mt-2 mb-3 rotate-[-1deg] shadow-xs" />
      )}

      {/* 3. HEADER SECTION */}
      {templateId === 'classic' && (
        <div className="text-center pb-2.5 border-b border-current/15 mb-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-widest uppercase font-display">
            <Camera className="w-3.5 h-3.5 text-primary" />
            <span>PHOTOMOMENT STUDIO</span>
          </div>
          <div className="text-[9px] font-mono opacity-60 tracking-wider">
            MEMORIES CAPTURED LIVE
          </div>
        </div>
      )}

      {templateId === 'retro' && (
        <div className="text-center pb-2 border-b border-orange-500/30 mb-3 px-3">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-orange-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC
            </span>
            <span>ISO 400</span>
            <span>35MM FILM</span>
          </div>
        </div>
      )}

      {templateId === 'minimal' && (
        <div className="text-center pb-2 mb-3">
          <p className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-70">
            — STUDIO MEMORY —
          </p>
        </div>
      )}

      {templateId === 'cute' && (
        <div className="text-center pb-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-200/60 text-pink-600 text-xs font-extrabold tracking-wider border border-pink-300">
            <span>✿</span> Y2K PHOTO CLUB <span>✿</span>
          </div>
        </div>
      )}

      {templateId === 'grid' && (
        <div className="text-center pb-2 mb-2">
          <div className="text-[11px] font-black tracking-widest uppercase font-display">
            ★ PHOTOMOMENT 2x2 ★
          </div>
        </div>
      )}

      {/* 4. PHOTOS SECTION */}
      <div
        className={`w-full ${
          templateId === 'grid'
            ? 'grid grid-cols-2 gap-2.5'
            : templateId === 'retro'
            ? 'px-3 space-y-2.5'
            : 'space-y-3'
        }`}
      >
        {photos.map((photoUrl, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden border-2 transition-all ${
              templateId === 'cute'
                ? 'rounded-2xl border-pink-300 shadow-sm aspect-square'
                : templateId === 'polaroid'
                ? 'rounded-md border-black/10 shadow-inner aspect-square'
                : templateId === 'retro'
                ? 'rounded-sm border-orange-500/40 bg-black aspect-[3/2]'
                : templateId === 'minimal'
                ? 'rounded-none border-black/10 aspect-[4/3]'
                : 'rounded-xl border-black/20 aspect-[4/3]'
            } bg-base-200`}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`Photo ${idx + 1}`}
                className={`w-full h-full object-cover ${filterClass}`}
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-xs opacity-40">
                <Camera className="w-6 h-6 mb-1" />
                <span>Slot 0{idx + 1}</span>
              </div>
            )}

            {/* Template Specific Photo Overlays */}
            {templateId === 'retro' && (
              <div className="absolute bottom-1 right-2 text-[9px] font-mono text-orange-400/90 drop-shadow-sm">
                '26 08 19
              </div>
            )}

            {templateId === 'classic' && (
              <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-white backdrop-blur-xs">
                0{idx + 1}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5. STICKERS OVERLAY TRAY */}
      {stickers && stickers.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
          {stickers.map((stk, sIdx) => {
            if (stk.isBadge) {
              return (
                <span
                  key={sIdx}
                  style={{ backgroundColor: stk.bg, color: stk.textCol }}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold border border-black/30 shadow-xs rotate-[-2deg]"
                >
                  {stk.text}
                </span>
              );
            }
            return (
              <span
                key={sIdx}
                style={{ color: stk.color || 'inherit' }}
                className="text-base sm:text-lg animate-bounce drop-shadow-xs"
              >
                {stk.emoji || stk.text}
              </span>
            );
          })}
        </div>
      )}

      {/* 6. BOTTOM CAPTION & DATE FOOTER */}
      <div className="pt-3.5 text-center space-y-1">
        {caption && (
          <p
            className={`font-bold leading-tight ${
              templateId === 'polaroid'
                ? 'font-handwriting text-xl sm:text-2xl text-base-content'
                : templateId === 'cute'
                ? 'font-display text-sm text-pink-600 font-extrabold'
                : templateId === 'retro'
                ? 'font-mono text-xs text-orange-400 font-extrabold uppercase'
                : templateId === 'minimal'
                ? 'font-mono text-xs uppercase tracking-widest'
                : 'font-handwriting text-lg sm:text-xl text-primary font-extrabold'
            }`}
          >
            {caption}
          </p>
        )}

        {showDate && dateText && (
          <div className="flex items-center justify-center gap-1 text-[10px] font-mono font-bold tracking-wider opacity-70">
            <span>{dateText}</span>
            <span>•</span>
            <span>PHOTOMOMENT</span>
          </div>
        )}
      </div>

    </div>
  );
});

export default PhotoStrip;
