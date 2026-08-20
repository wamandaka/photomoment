import React, { forwardRef } from 'react';
import { Camera, Sparkles, Heart, Star, MapPin, AlertCircle, FileSearch, Receipt, Gamepad2, Globe, Package, Cpu } from 'lucide-react';
import { FRAME_COLORS } from '../data/frames';
import DraggableItem from './DraggableItem';

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
    randomDecorations = [],
    customDecorations = [],
    selectedDecorationId = null,
    onSelectDecoration,
    onUpdateDecoration,
    onRemoveDecoration,
    isExporting = false,
    personality = null,
    showPersonalityBadge = true,
    isDemo = false,
  },
  ref
) {
  const currentFrame = FRAME_COLORS.find((f) => f.id === frameId) || FRAME_COLORS[0];
  const isDarkFrame = frameId === 'black' || frameId === 'film-black' || frameId === 'cyber-card' || frameId === 'multiverse-dark' || frameId === 'collector-box' || frameId === 'wedding-noir';

  const hasCatEars = currentFrame.hasCatEars || templateId === 'cat';
  const hasTeddyEars = currentFrame.hasTeddyEars || templateId === 'teddy';
  const hasBow = currentFrame.hasBow || templateId === 'kawaii';
  const hasStrawberry = currentFrame.hasStrawberry || templateId === 'strawberry';
  const hasWaxSeal = currentFrame.hasWaxSeal || templateId === 'love-letter';
  const hasFlowers = currentFrame.hasFlowers || templateId === 'flower-garden';
  const hasWashiTape = currentFrame.hasWashiTape || templateId === 'scrapbook';
  const hasCameraStamp = currentFrame.hasCameraStamp || templateId === 'disposable';
  const hasEvidencePin = currentFrame.hasEvidencePin || templateId === 'evidence';
  const hasWeddingRings = currentFrame.hasWeddingRings || templateId === 'wedding-love';

  const isHeartShape = currentFrame.hasHeartShape || templateId === 'wedding-love';

  const hasTopOrnament = hasCatEars || hasTeddyEars || hasBow || hasStrawberry || hasWaxSeal || hasFlowers || hasWashiTape || hasEvidencePin || hasWeddingRings;

  // Multiverse universe variant labels
  const multiverseVariants = [
    'Rockstar You 🎸',
    'Villain You 🦹',
    'CEO You 💼',
    'Sleep-Deprived You ☕',
    'Secret Agent You 🕶️',
    'Time Traveler You ⏳',
  ];

  // Map route checkpoint labels
  const mapCheckpoints = [
    '📍 START: Departure',
    '📍 WAYPOINT: Peak Chaos',
    '📍 PITSTOP: Laughs',
    '🏁 DESTINATION: Joy',
    '📍 BONUS: Memory Core',
    '🏁 THE END',
  ];

  return (
    <div
      ref={ref}
      id="export-photo-strip"
      className={`photo-strip-container w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[320px] mx-auto relative select-none px-2 pb-3 ${
        hasTopOrnament ? 'pt-5 sm:pt-6' : 'pt-2'
      }`}
    >
      {/* SVG ClipPath Definition for Heart Frames (renders inside html-to-image canvas) */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="wedding-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.9 C 0.5, 0.9, 0.08, 0.62, 0.08, 0.35 C 0.08, 0.16, 0.22, 0.05, 0.36, 0.05 C 0.44, 0.05, 0.48, 0.11, 0.5, 0.16 C 0.52, 0.11, 0.56, 0.05, 0.64, 0.05 C 0.78, 0.05, 0.92, 0.16, 0.92, 0.35 C 0.92, 0.62, 0.5, 0.9, 0.5, 0.9 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 0. TOP ORNAMENTS (Fully inside export container bounding box) */}
      
      {/* 0A. CAT EARS */}
      {hasCatEars && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 left-6 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 z-20">
            <div
              style={{
                backgroundColor: currentFrame.earColor || currentFrame.hex,
                borderColor: '#000000',
              }}
              className="w-full h-full border-3 rounded-tl-3xl rounded-tr-md transform -rotate-12 relative overflow-hidden shadow-neo-sm"
            >
              <div
                style={{ backgroundColor: currentFrame.innerEarColor || '#FF85A1' }}
                className="absolute bottom-0 right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-tl-2xl rounded-tr-sm opacity-90"
              />
            </div>
          </div>
          <div className="absolute top-0 right-6 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 z-20">
            <div
              style={{
                backgroundColor: currentFrame.earColor || currentFrame.hex,
                borderColor: '#000000',
              }}
              className="w-full h-full border-3 rounded-tr-3xl rounded-tl-md transform rotate-12 relative overflow-hidden shadow-neo-sm"
            >
              <div
                style={{ backgroundColor: currentFrame.innerEarColor || '#FF85A1' }}
                className="absolute bottom-0 left-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-tr-2xl rounded-tl-sm opacity-90"
              />
            </div>
          </div>
        </div>
      )}

      {/* 0B. TEDDY BEAR EARS */}
      {hasTeddyEars && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 left-5 sm:left-7 w-9 h-9 sm:w-11 sm:h-11 z-20">
            <div
              style={{
                backgroundColor: currentFrame.earColor || '#FDF6EE',
                borderColor: '#000000',
              }}
              className="w-full h-full border-3 rounded-full relative overflow-hidden shadow-neo-sm flex items-center justify-center"
            >
              <div
                style={{ backgroundColor: currentFrame.innerEarColor || '#E6CCB2' }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/20"
              />
            </div>
          </div>
          <div className="absolute top-0 right-5 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 z-20">
            <div
              style={{
                backgroundColor: currentFrame.earColor || '#FDF6EE',
                borderColor: '#000000',
              }}
              className="w-full h-full border-3 rounded-full relative overflow-hidden shadow-neo-sm flex items-center justify-center"
            >
              <div
                style={{ backgroundColor: currentFrame.innerEarColor || '#E6CCB2' }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/20"
              />
            </div>
          </div>
        </div>
      )}

      {/* 0C. KAWAII RIBBON BOW */}
      {hasBow && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
            <div className="px-3 py-0.5 bg-pink-400 border-2 border-black rounded-full shadow-neo-sm flex items-center gap-1 text-xs font-black text-white transform -rotate-1">
              <span>🎀</span>
              <span className="text-[10px] tracking-wider uppercase font-display">KAWAII</span>
              <span>✦</span>
            </div>
          </div>
        </div>
      )}

      {/* 0D. STRAWBERRY ACCENTS */}
      {hasStrawberry && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 left-6 sm:left-8 z-20 text-lg sm:text-xl drop-shadow-sm transform -rotate-12">
            🍓
          </div>
          <div className="absolute top-0 right-6 sm:right-8 z-20 text-lg sm:text-xl drop-shadow-sm transform rotate-12">
            🍓
          </div>
        </div>
      )}

      {/* 0E. LOVE LETTER WAX SEAL */}
      {hasWaxSeal && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 right-6 sm:right-8 z-20">
            <div className="w-8 h-8 rounded-full bg-red-800 text-amber-200 border-2 border-amber-400 shadow-neo-sm flex items-center justify-center text-xs font-serif font-black transform rotate-6">
              💌
            </div>
          </div>
        </div>
      )}

      {/* 0F. FLOWER GARDEN DAISY CROWN */}
      {hasFlowers && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-center gap-2 text-sm sm:text-base drop-shadow-xs">
            <span>🌿</span>
            <span>🌼</span>
            <span>🌸</span>
            <span>🌼</span>
            <span>🌿</span>
          </div>
        </div>
      )}

      {/* 0G. SCRAPBOOK WASHI TAPE */}
      {hasWashiTape && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 left-4 sm:left-6 z-20 w-18 h-5 bg-amber-200/90 border border-amber-900/30 transform -rotate-6 shadow-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-amber-900 tracking-wider">✂️ MEMO</span>
          </div>
        </div>
      )}

      {/* 0H. EVIDENCE BOARD PUSHPIN */}
      {hasEvidencePin && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 left-8 z-20 text-xl drop-shadow-md">
            📌
          </div>
          <div className="absolute top-0 right-8 z-20 text-xl drop-shadow-md">
            📌
          </div>
        </div>
      )}

      {/* 0I. WEDDING RINGS & VEIL */}
      {hasWeddingRings && (
        <div className="w-full relative pointer-events-none">
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-center gap-1.5 drop-shadow-md">
            <div className="px-3 py-0.5 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 border-2 border-amber-700 rounded-full shadow-neo-sm flex items-center gap-1 text-xs font-serif font-black text-amber-950">
              <span>💍</span>
              <span className="text-[9px] tracking-widest uppercase font-bold">JUST MARRIED</span>
              <span>💍</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Card Body */}
      <div
        style={{
          backgroundColor: currentFrame.hex,
          color: currentFrame.textHex,
        }}
        className={`w-full p-3.5 sm:p-5 rounded-3xl border-3 border-black shadow-neo-xl transition-all duration-300 relative ${
          hasTopOrnament ? '-mt-2.5 sm:-mt-3' : ''
        } ${
          templateId === 'wedding-love' || templateId === 'newspaper'
            ? 'font-serif'
            : templateId === 'retro' || templateId === 'disposable' || templateId === 'receipt' || templateId === 'brain-exe'
            ? 'font-mono'
            : ''
        }`}
      >

      {/* FLOATING RANDOM DECORATIONS LAYER (From ✨ DECORATE) */}
      {randomDecorations && randomDecorations.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-30">
          {randomDecorations.map((dec) => (
            <div
              key={dec.id}
              style={{
                top: dec.top,
                left: dec.left,
                right: dec.right,
                transform: `rotate(${dec.rotate}deg) scale(${dec.scale})`,
              }}
              className="absolute select-none drop-shadow-md transition-all duration-300 animate-fade-in"
            >
              {dec.type === 'badge' ? (
                <span
                  style={{ backgroundColor: dec.bg, color: dec.textCol }}
                  className="px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-black border border-black shadow-neo-sm whitespace-nowrap"
                >
                  {dec.text}
                </span>
              ) : (
                <span style={{ color: dec.color }} className={`${dec.size || 'text-lg'}`}>
                  {dec.text}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 1. RETRO FILM SPROCKETS */}
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

      {/* 3. HEADERS */}

      {/* 3A. NEWSPAPER / DAILY GAZETTE */}
      {templateId === 'newspaper' && (
        <div className="space-y-1 pb-1.5 mb-2 select-none">
          {/* Top Special Edition Bar with double borders */}
          <div className="pt-0.5 pb-1 border-t-2 border-b-2 border-black/80 flex items-center justify-between text-[7px] sm:text-[8px] font-serif font-black tracking-widest text-black uppercase">
            <div className="flex items-center gap-1">
              <span className="opacity-90">SPECIAL EDITION</span>
              <span className="text-[8px]">⊛</span>
            </div>

            {/* Center Masthead Logo Badge */}
            <div className="bg-[#FFE01B] border-2 border-black px-1.5 py-0.2 rounded-xs shadow-neo-sm transform -rotate-1 flex flex-col items-center justify-center">
              <div className="text-[10px] sm:text-[11px] font-black text-black tracking-tighter leading-none flex items-center gap-0.5 font-display">
                <span>NEWS</span>
                <span className="text-[#C5221F] font-extrabold text-xs">+</span>
              </div>
              <div className="text-[5px] sm:text-[5.5px] bg-black text-[#FFE01B] font-extrabold px-1 tracking-widest uppercase rounded-2xs mt-0.5">
                PHOTOBOOTH
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[8px]">⊛</span>
              <span className="opacity-90">SPECIAL EDITION</span>
            </div>
          </div>

          {/* Giant Bold Headline "FOTO KITA BLUR" */}
          <div className="text-center pt-0.5 relative">
            <div className="text-2xl sm:text-3xl font-serif font-black tracking-tight uppercase leading-none select-none flex items-center justify-center gap-1.5">
              <span className="text-[#C5221F] drop-shadow-2xs">FOTO</span>
              <span className="text-[#0E2A47] drop-shadow-2xs">KITA BLUR</span>
            </div>
            {/* Overlaid Cursive Subtitle Script */}
            <div className="font-script text-[#0E3B64] italic text-sm sm:text-base font-bold tracking-wide -mt-1.5 sm:-mt-2 text-center drop-shadow-xs">
              Tak Banyak Yang Kulihat
            </div>
          </div>
        </div>
      )}

      {/* 3B. WEDDING LOVE */}
      {templateId === 'wedding-love' && (
        <div className="text-center pb-2 border-b-2 border-amber-500/30 mb-2.5 pt-0.5 font-serif space-y-0.5">
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black tracking-widest text-red-950 uppercase">
            <span>💍</span>
            <span>WEDDING LOVE & VOWS</span>
            <span>💍</span>
          </div>
          <div className="text-[9px] italic text-amber-900/80 tracking-wider">
            ~ Two Hearts • One Soul • Happily Ever After ~
          </div>
        </div>
      )}

      {/* 3B. EVIDENCE BOARD */}
      {templateId === 'evidence' && (
        <div className="pb-2 border-b-2 border-red-900/30 mb-2.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="px-1.5 py-0.5 bg-red-700 text-white font-mono text-[9px] font-black tracking-widest uppercase rounded">
              CONFIDENTIAL
            </span>
            <span className="font-mono text-[9px] font-bold text-red-950">
              CASE #{dateText ? dateText.replace(/\D/g, '').slice(0, 4) : '0826'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono text-red-900/80 font-bold border-t border-red-900/15 pt-1">
            <span>SUBJECT: 01</span>
            <span>STATUS: UNDER WATCH</span>
            <span>PRIORITY: HIGH</span>
          </div>
        </div>
      )}

      {/* 3C. MEMORY RECEIPT */}
      {templateId === 'receipt' && (
        <div className="text-center pb-2 border-b border-dashed border-black/40 mb-2.5 pt-0.5 font-mono space-y-0.5">
          <div className="text-xs font-black tracking-widest uppercase">
            *** MEMORY MART ***
          </div>
          <div className="text-[9px] opacity-70">
            STORE #2026 • REG #01 • CASHIER: BESTIE
          </div>
          <div className="text-[8px] opacity-60">
            {dateText || '2026-08-19'} • 100% HAPPINESS GUARANTEE
          </div>
          <div className="border-t border-dashed border-black/30 pt-1 text-[8px] flex justify-between font-bold">
            <span>QTY  DESCRIPTION</span>
            <span>AMOUNT</span>
          </div>
        </div>
      )}

      {/* 3D. CHARACTER CARD */}
      {templateId === 'character-card' && (
        <div className="pb-2 border-b border-cyan-500/30 mb-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px] font-black tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>PLAYER 01 // LVL 99</span>
            </div>
            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono text-[8px] font-extrabold uppercase rounded-full border border-cyan-400">
              {personality ? personality.badge : '★ LEGENDARY'}
            </span>
          </div>
        </div>
      )}

      {/* 3E. PARALLEL UNIVERSE */}
      {templateId === 'parallel-universe' && (
        <div className="pb-2 border-b border-purple-500/30 mb-2.5 space-y-1 text-center font-mono">
          <div className="flex items-center justify-between text-[9px] text-purple-400 font-bold">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-purple-400" />
              <span>MULTIVERSE D-728</span>
            </span>
            <span className="px-1.5 py-0.2 bg-purple-900/60 rounded text-[8px] text-purple-200 border border-purple-400/40">
              TIMELINE: STABLE
            </span>
          </div>
          <div className="text-[10px] font-black tracking-widest text-purple-300">
            UNIVERSE #728194
          </div>
        </div>
      )}

      {/* 3F. COLLECTIBLE EDITION */}
      {templateId === 'collectible' && (
        <div className="pb-2 border-b border-pink-500/30 mb-2.5 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-yellow-300 font-mono text-[10px] font-black">
              <Package className="w-3.5 h-3.5 text-pink-400" />
              <span>COLLECTIBLE #{dateText ? dateText.replace(/\D/g, '').slice(0, 4) : '0826'}</span>
            </div>
            <span className="px-2 py-0.2 bg-pink-500 text-white font-mono text-[8px] font-black uppercase rounded">
              1ST EDITION
            </span>
          </div>
          <div className="text-[8px] font-mono text-yellow-200/80 flex justify-between font-bold">
            <span>SERIES: 2026</span>
            <span>RARITY: {personality ? personality.rarity.toUpperCase() : 'EPIC'}</span>
            <span>MINT CONDITION</span>
          </div>
        </div>
      )}

      {/* 3G. BRAIN.EXE */}
      {templateId === 'brain-exe' && (
        <div className="pb-2 border-b-2 border-cyan-400 mb-2.5 space-y-1 font-mono">
          <div className="bg-cyan-950/80 text-cyan-200 px-2 py-1 rounded flex items-center justify-between text-[9px] font-bold border border-cyan-400/30">
            <div className="flex items-center gap-1 truncate">
              <Cpu className="w-3 h-3 text-cyan-300" />
              <span className="truncate">Brain.exe [Not Responding]</span>
            </div>
            <div className="flex gap-1 text-[8px] font-bold shrink-0">
              <span className="px-1 bg-cyan-800 rounded">_</span>
              <span className="px-1 bg-cyan-800 rounded">□</span>
              <span className="px-1 bg-red-600 rounded">X</span>
            </div>
          </div>
          <div className="text-[8px] text-cyan-300 flex justify-between px-1 font-bold">
            <span>BATTERY: ████░░ 37%</span>
            <span>MEM SAVED ✓</span>
          </div>
        </div>
      )}

      {/* 3H. MEMORY MAP */}
      {templateId === 'memory-map' && (
        <div className="text-center pb-2 border-b-2 border-amber-900/30 mb-2.5 space-y-1 font-mono">
          <div className="flex items-center justify-between text-[9px] font-bold text-amber-900">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-800" />
              <span>EXPEDITION MAP</span>
            </span>
            <span>LAT 20.26 / LON 08.19</span>
          </div>
          <div className="text-[10px] font-black tracking-wider text-amber-950">
            ROUTE 2026: JOURNEY OF JOY 🧭
          </div>
        </div>
      )}

      {/* 3I. KAWAII */}
      {templateId === 'kawaii' && (
        <div className="text-center pb-2 border-b border-pink-300/40 mb-2.5 pt-0.5">
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs font-black tracking-widest text-pink-600 font-display">
            <span>✦</span>
            <span>KAWAII PHOTO CLUB</span>
            <span>✦</span>
          </div>
          <div className="text-[9px] font-mono text-pink-500/80 tracking-wider font-bold">
            ‧₊˚ SWEETEST MEMORIES ‧₊˚
          </div>
        </div>
      )}

      {/* 3J. STRAWBERRY */}
      {templateId === 'strawberry' && (
        <div className="text-center pb-2 border-b border-red-300/40 mb-2.5 pt-0.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-black tracking-widest text-red-600 font-display">
            <span className="text-xs">🍓</span>
            <span>STRAWBERRY MILK</span>
            <span className="text-xs">🍓</span>
          </div>
          <div className="text-[9px] font-mono text-red-500/80 tracking-wider font-bold">
            ♡ FRESH & SWEET ♡
          </div>
        </div>
      )}

      {/* 3K. TEDDY */}
      {templateId === 'teddy' && (
        <div className="text-center pb-2 border-b border-amber-900/15 mb-2.5 pt-0.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-black tracking-widest text-amber-900 font-display">
            <span className="text-xs">🧸</span>
            <span>TEDDY & YOU</span>
            <span className="text-xs">🧸</span>
          </div>
          <div className="text-[9px] font-mono opacity-70 tracking-wider font-bold">
            WARM COZY MOMENTS
          </div>
        </div>
      )}

      {/* 3L. LOVE LETTER */}
      {templateId === 'love-letter' && (
        <div className="text-center pb-2 border-b border-red-900/20 mb-2.5 pt-0.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-widest text-red-900 font-serif">
            <span>💌</span>
            <span>LOVE & CHERISH</span>
            <span>💌</span>
          </div>
          <div className="text-[9px] font-serif italic text-red-800/70 tracking-wider">
            ~ with all my heart & soul ~
          </div>
        </div>
      )}

      {/* 3M. DISPOSABLE */}
      {templateId === 'disposable' && (
        <div className="text-center pb-2 border-b border-emerald-500/30 mb-2.5 px-2">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 35MM
            </span>
            <span>FLASH ⚡</span>
            <span>EXP. 24</span>
          </div>
        </div>
      )}

      {/* 3N. FLOWER GARDEN */}
      {templateId === 'flower-garden' && (
        <div className="text-center pb-2 border-b border-emerald-700/20 mb-2.5 pt-0.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-black tracking-widest text-emerald-800 font-display">
            <span className="text-xs">🌼</span>
            <span>FLOWER GARDEN</span>
            <span className="text-xs">🌼</span>
          </div>
          <div className="text-[9px] font-mono text-emerald-700/70 tracking-wider font-bold">
            ✿ BLOOMING WITH JOY ✿
          </div>
        </div>
      )}

      {/* 3O. SCRAPBOOK */}
      {templateId === 'scrapbook' && (
        <div className="text-center pb-2 border-b-2 border-dashed border-amber-900/20 mb-2.5 pt-0.5">
          <div className="inline-block px-2 py-0.5 bg-amber-100/90 border border-amber-900/30 text-[10px] sm:text-[11px] font-black tracking-wider text-amber-950 font-mono rotate-[-1deg] shadow-xs">
            ✂️ SCRAPBOOK JOURNAL 📝
          </div>
        </div>
      )}

      {/* 3P. NEKO CAT */}
      {templateId === 'cat' && (
        <div className="text-center pb-2 border-b border-current/15 mb-2.5 pt-0.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-black tracking-widest uppercase font-display">
            <span className="text-xs sm:text-sm animate-bounce">🐾</span>
            <span className="text-primary font-extrabold">NEKO CAT CLUB</span>
            <span className="text-xs sm:text-sm animate-bounce">🐾</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[9px] font-mono opacity-70 tracking-wider font-bold">
            <span>=^•ﻌ•^=</span>
            <span>MEOW MEMORIES</span>
            <span>=^•ﻌ•^=</span>
          </div>
        </div>
      )}

      {/* 3Q. CLASSIC */}
      {templateId === 'classic' && !hasTopOrnament && (
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

      {/* 3R. RETRO */}
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

      {/* 3S. MINIMAL */}
      {templateId === 'minimal' && (
        <div className="text-center pb-2 mb-3">
          <p className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-70">
            — STUDIO MEMORY —
          </p>
        </div>
      )}

      {/* 3T. CUTE Y2K */}
      {templateId === 'cute' && (
        <div className="text-center pb-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-200/60 text-pink-600 text-xs font-extrabold tracking-wider border border-pink-300">
            <span>✿</span> Y2K PHOTO CLUB <span>✿</span>
          </div>
        </div>
      )}

      {/* 3U. GRID */}
      {templateId === 'grid' && (
        <div className="text-center pb-2 mb-2">
          <div className="text-[11px] font-black tracking-widest uppercase font-display">
            ★ PHOTOMOMENT 2x2 ★
          </div>
        </div>
      )}

      {/* 4. PHOTOS SECTION */}
      {templateId === 'newspaper' ? (
        <div className="w-full space-y-2 select-none">
          {/* 1. HERO PRIMARY PHOTO (Slot 1) */}
          <div className="relative">
            <div className="relative overflow-hidden border-2 border-black/90 bg-white p-1 rounded-none shadow-sm aspect-[4/3]">
              {photos[0] ? (
                <img
                  src={photos[0]}
                  alt="Hero Photo"
                  className={`w-full h-full object-cover ${filterClass}`}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-xs opacity-50">
                  <Camera className="w-7 h-7 mb-1 text-black/60" />
                  <span className="font-serif text-[11px] font-bold text-stone-700">Foto Utama 01</span>
                </div>
              )}
            </div>

            {/* Corner Fruit & Bakery Decorations */}
            <div className="absolute -bottom-2 -left-2 text-2xl sm:text-3xl filter drop-shadow-md select-none pointer-events-none transform -rotate-12 z-10">
              🫐
            </div>
            <div className="absolute -bottom-2 -right-2 text-2xl sm:text-3xl filter drop-shadow-md select-none pointer-events-none transform rotate-12 z-10">
              🥐
            </div>
          </div>

          {/* 2. MID-DIVIDER HEADLINE BOX */}
          <div className="border border-black/80 p-0.5 my-1.5">
            <div className="border border-black/80 py-0.5 px-2 bg-stone-100/80 flex items-center justify-center gap-1.5 font-display text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider">
              <span className="text-[#1E3A8A]">KAMU BLUBERRY</span>
              <span className="text-black">&</span>
              <span className="text-[#D97706]">AKU PASTRY</span>
            </div>
          </div>

          {/* 3. TWO-COLUMN EDITORIAL SECTION */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 items-stretch">
            {/* Left Column: Secondary Photo Slot (Slot 2) */}
            <div className="flex flex-col justify-center">
              <div className="relative overflow-hidden border-2 border-black/90 bg-white p-1 rounded-none shadow-sm aspect-square w-full">
                {photos[1] ? (
                  <img
                    src={photos[1]}
                    alt="Photo 2"
                    className={`w-full h-full object-cover ${filterClass}`}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-xs opacity-50">
                    <Camera className="w-5 h-5 mb-0.5 text-black/60" />
                    <span className="font-serif text-[9px] font-bold text-stone-700">Foto Slot 02</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Editorial Paragraph & Spotify Player Card */}
            <div className="flex flex-col justify-between space-y-1.5 text-left">
              {/* Newspaper Column Paragraph */}
              <p className="text-[7px] sm:text-[7.5px] font-serif text-justify leading-[1.3] text-stone-900 tracking-tight">
                Lagu Foto Kita Blur mengingatkan bahwa kenangan terbaik tidak selalu hadir dalam kualitas terbaik. Kadang, foto yang buram justru menjadi bukti bahwa kita benar-benar sedang hidup di dalam momen itu tertawa, bergerak, dan menikmati waktu bersama.
              </p>

              {/* Spotify "NOW PLAYING" Card */}
              <div className="border border-black/80 bg-white/95 p-1 sm:p-1.5 rounded-none shadow-2xs space-y-1 font-sans">
                <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white px-1.5 py-0.5 flex items-center justify-between text-[6.5px] sm:text-[7px] font-extrabold uppercase tracking-wider rounded-2xs">
                  <span>NOW PLAYING:</span>
                  <span className="text-[7.5px] leading-none">▶</span>
                </div>
                
                <div className="text-[7.5px] sm:text-[8px] font-black text-black truncate tracking-tight">
                  FOTO KITA BLUR - SAL PRIADI
                </div>

                <div className="flex items-center gap-1 text-black/90 pt-0.5">
                  <svg className="w-3 h-3 text-[#1DB954] fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  {/* Spotify Soundwave Bars */}
                  <div className="flex items-center gap-[1.5px] h-2.5 opacity-90">
                    <div className="w-[1.5px] h-1.5 bg-black rounded-full" />
                    <div className="w-[1.5px] h-2.5 bg-black rounded-full" />
                    <div className="w-[1.5px] h-1 bg-black rounded-full" />
                    <div className="w-[1.5px] h-3 bg-black rounded-full" />
                    <div className="w-[1.5px] h-2 bg-black rounded-full" />
                    <div className="w-[1.5px] h-3.5 bg-black rounded-full" />
                    <div className="w-[1.5px] h-1.5 bg-black rounded-full" />
                    <div className="w-[1.5px] h-2.5 bg-black rounded-full" />
                    <div className="w-[1.5px] h-1 bg-black rounded-full" />
                    <div className="w-[1.5px] h-3 bg-black rounded-full" />
                    <div className="w-[1.5px] h-2 bg-black rounded-full" />
                    <div className="w-[1.5px] h-1.5 bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full ${
            templateId === 'grid'
              ? 'grid grid-cols-2 gap-2.5'
              : isHeartShape
              ? 'space-y-3 sm:space-y-3.5'
              : templateId === 'retro' || templateId === 'disposable'
              ? 'px-2 sm:px-3 space-y-2.5'
              : 'space-y-2.5 sm:space-y-3'
          }`}
        >
        {photos.map((photoUrl, idx) => (
          <div key={idx} className="space-y-1">
            
            {/* Map Path Line Header */}
            {templateId === 'memory-map' && (
              <div className="flex items-center justify-between text-[8px] font-mono text-amber-900 font-bold px-1">
                <span>{mapCheckpoints[idx % mapCheckpoints.length]}</span>
                <span>───►</span>
              </div>
            )}

            {/* A. HEART-SHAPED PHOTO SLOT */}
            {isHeartShape ? (
              <div className="relative w-full aspect-square flex items-center justify-center p-1">
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Photo with Heart Clip */}
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`Photo ${idx + 1}`}
                      style={{
                        clipPath: 'url(#wedding-heart-clip)',
                        WebkitClipPath: 'url(#wedding-heart-clip)',
                      }}
                      className={`w-full h-full object-cover scale-105 ${filterClass}`}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div
                      style={{ clipPath: 'url(#wedding-heart-clip)' }}
                      className="w-full h-full bg-base-300 flex flex-col items-center justify-center text-xs opacity-50"
                    >
                      <Heart className="w-8 h-8 text-primary fill-current mb-1" />
                      <span>Slot 0{idx + 1}</span>
                    </div>
                  )}

                  {/* Golden Heart Stroke & Pearled Crest Overlay */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
                  >
                    <path
                      d="M 50, 90 C 50, 90, 8, 62, 8, 35 C 8, 16, 22, 5, 36, 5 C 44, 5, 48, 11, 50, 16 C 52, 11, 56, 5, 64, 5 C 78, 5, 92, 16, 92, 35 C 92, 62, 50, 90, 50, 90 Z"
                      fill="none"
                      stroke={currentFrame.strokeColor || '#D4AF37'}
                      strokeWidth="4"
                    />
                    <circle cx="50" cy="16" r="2.2" fill={currentFrame.strokeColor || '#D4AF37'} />
                    <circle cx="50" cy="90" r="2.8" fill={currentFrame.strokeColor || '#D4AF37'} />
                    <circle cx="22" cy="15" r="1.5" fill={currentFrame.strokeColor || '#D4AF37'} />
                    <circle cx="78" cy="15" r="1.5" fill={currentFrame.strokeColor || '#D4AF37'} />
                  </svg>

                  {/* Romantic Vows Badge */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.2 bg-stone-900/85 text-amber-200 border border-amber-400/80 rounded-full font-serif text-[8px] tracking-wider uppercase backdrop-blur-xs flex items-center gap-1 shadow-xs z-10 whitespace-nowrap">
                    <span>💍</span>
                    <span>{idx === 0 ? 'THE VOWS' : idx === 1 ? 'I DO ♡' : idx === 2 ? 'FOREVER' : 'EVER AFTER'}</span>
                    <span>💍</span>
                  </div>

                </div>
              </div>
            ) : (
              /* B. STANDARD & CONCEPTUAL PHOTO SLOTS */
              <div
                className={`relative overflow-hidden border-2 transition-all ${
                  templateId === 'evidence'
                    ? 'rounded-md border-red-950/40 bg-stone-100 shadow-sm aspect-[4/3]'
                    : templateId === 'receipt'
                    ? 'rounded-xs border-black/30 bg-white aspect-[4/3]'
                    : templateId === 'character-card'
                    ? 'rounded-xl border-cyan-400 bg-slate-900 shadow-neo-sm aspect-[4/3]'
                    : templateId === 'parallel-universe'
                    ? 'rounded-xl border-purple-400 bg-slate-950 aspect-[4/3]'
                    : templateId === 'collectible'
                    ? 'rounded-xl border-pink-400 bg-slate-900 aspect-[4/3]'
                    : templateId === 'brain-exe'
                    ? 'rounded-xs border-cyan-400 bg-black aspect-[4/3]'
                    : templateId === 'memory-map'
                    ? `rounded-lg border-amber-900/40 bg-stone-100 shadow-sm aspect-[4/3] ${
                        idx % 2 === 1 ? 'ml-3 sm:ml-4 rotate-[1deg]' : 'mr-3 sm:mr-4 rotate-[-1deg]'
                      }`
                    : templateId === 'kawaii' || currentFrame.hasBow
                    ? 'rounded-2xl border-pink-300 shadow-sm aspect-[4/3]'
                    : templateId === 'strawberry' || currentFrame.hasStrawberry
                    ? 'rounded-2xl border-red-300 shadow-sm aspect-[4/3]'
                    : templateId === 'teddy' || currentFrame.hasTeddyEars
                    ? 'rounded-2xl border-amber-800/30 shadow-sm aspect-[4/3]'
                    : templateId === 'love-letter' || currentFrame.hasWaxSeal
                    ? 'rounded-lg border-red-900/20 shadow-sm aspect-[4/3]'
                    : templateId === 'disposable' || currentFrame.hasCameraStamp
                    ? 'rounded-xs border-emerald-500/40 bg-black aspect-[3/2]'
                    : templateId === 'flower-garden' || currentFrame.hasFlowers
                    ? 'rounded-2xl border-emerald-300 shadow-sm aspect-[4/3]'
                    : templateId === 'scrapbook' || currentFrame.hasWashiTape
                    ? 'rounded-md border-amber-900/20 shadow-xs aspect-square'
                    : templateId === 'cat' || currentFrame.hasCatEars
                    ? 'rounded-2xl border-black/25 shadow-sm aspect-[4/3]'
                    : templateId === 'cute'
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

                {/* Photo Corner Overlays */}
                {templateId === 'evidence' && (
                  <>
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-amber-100 text-red-950 font-mono text-[8px] font-black border border-red-950/30 shadow-xs rotate-[-3deg]">
                      EXHIBIT #0{idx + 1}
                    </div>
                    {idx === 0 && (
                      <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-yellow-200 text-red-950 font-mono text-[8px] font-black border border-black shadow-xs rotate-[4deg]">
                        ⚠️ HIGHLY SUSPICIOUS
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-red-200 text-red-950 font-mono text-[8px] font-black border border-red-900 shadow-xs rotate-[-2deg]">
                        📸 CAUGHT IN 4K
                      </div>
                    )}
                  </>
                )}

                {templateId === 'receipt' && (
                  <div className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/70 text-white font-mono text-[7px] font-bold rounded">
                    ITEM #{idx + 1}
                  </div>
                )}

                {templateId === 'character-card' && (
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-cyan-950/90 text-cyan-300 font-mono text-[8px] font-black border border-cyan-400 rounded">
                    STAGE 0{idx + 1}
                  </div>
                )}

                {templateId === 'parallel-universe' && (
                  <div className="absolute bottom-1 left-1 right-1 px-1.5 py-0.5 bg-black/80 text-purple-300 font-mono text-[8px] font-bold text-center rounded border border-purple-500/30">
                    {multiverseVariants[idx % multiverseVariants.length]}
                  </div>
                )}

                {templateId === 'collectible' && (
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/80 text-yellow-300 font-mono text-[8px] font-bold rounded border border-pink-400">
                    ITEM 0{idx + 1}
                  </div>
                )}

                {templateId === 'brain-exe' && (
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-cyan-900 text-cyan-200 font-mono text-[7px] font-bold border border-cyan-400">
                    LOG_#0{idx + 1}.PNG
                  </div>
                )}

                {(templateId === 'kawaii' || currentFrame.hasBow) && (
                  <div className="absolute top-1 right-1.5 px-1.5 py-0.5 rounded-md bg-pink-500/80 text-[9px] font-mono text-white backdrop-blur-xs flex items-center gap-0.5">
                    <span>🎀</span>
                    <span>0{idx + 1}</span>
                  </div>
                )}

                {(templateId === 'strawberry' || currentFrame.hasStrawberry) && (
                  <div className="absolute top-1 right-1.5 px-1.5 py-0.5 rounded-md bg-red-500/80 text-[9px] font-mono text-white backdrop-blur-xs flex items-center gap-0.5">
                    <span>🍓</span>
                    <span>0{idx + 1}</span>
                  </div>
                )}

                {(templateId === 'teddy' || currentFrame.hasTeddyEars) && (
                  <div className="absolute top-1 right-1.5 px-1.5 py-0.5 rounded-md bg-amber-900/70 text-[9px] font-mono text-white backdrop-blur-xs flex items-center gap-0.5">
                    <span>🧸</span>
                    <span>0{idx + 1}</span>
                  </div>
                )}

                {(templateId === 'love-letter' || currentFrame.hasWaxSeal) && (
                  <div className="absolute top-1 right-1.5 px-1.5 py-0.5 rounded-md bg-red-950/70 text-[9px] font-serif text-amber-200 backdrop-blur-xs flex items-center gap-0.5">
                    <span>💌</span>
                    <span>0{idx + 1}</span>
                  </div>
                )}

                {(templateId === 'disposable' || currentFrame.hasCameraStamp) && (
                  <div className="absolute bottom-1 right-2 text-[10px] font-mono text-amber-400 font-bold drop-shadow-sm">
                    '98 08 19
                  </div>
                )}

                {(templateId === 'flower-garden' || currentFrame.hasFlowers) && (
                  <div className="absolute top-1 right-1.5 px-1.5 py-0.5 rounded-md bg-emerald-700/80 text-[9px] font-mono text-white backdrop-blur-xs flex items-center gap-0.5">
                    <span>🌼</span>
                    <span>0{idx + 1}</span>
                  </div>
                )}

                {(templateId === 'scrapbook' || currentFrame.hasWashiTape) && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-amber-200/90 border border-amber-900/30 text-[8px] font-mono text-amber-950 shadow-xs rotate-[-3deg]">
                    #0{idx + 1}
                  </div>
                )}

                {(templateId === 'cat' || currentFrame.hasCatEars) && (
                  <div className="absolute top-1 right-1.5 px-1.5 py-0.5 rounded-md bg-black/40 text-[9px] font-mono text-white backdrop-blur-xs flex items-center gap-0.5">
                    <span>🐾</span>
                    <span>0{idx + 1}</span>
                  </div>
                )}

                {templateId === 'retro' && (
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono text-orange-400/90 drop-shadow-sm">
                    '26 08 19
                  </div>
                )}

                {templateId === 'classic' && !hasTopOrnament && (
                  <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-white backdrop-blur-xs">
                    0{idx + 1}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      )}

      {/* SPECIAL STATS SECTION (For Character Card Template) */}
      {templateId === 'character-card' && (
        <div className="mt-2.5 p-2 bg-cyan-950/80 rounded-xl border border-cyan-500/40 text-cyan-300 font-mono text-[9px] space-y-1">
          <div className="flex justify-between">
            <span>CHAOS</span>
            <span className="text-cyan-400 font-bold">████████░░ 82</span>
          </div>
          <div className="flex justify-between">
            <span>CUTENESS</span>
            <span className="text-pink-400 font-bold">█████████░ 94</span>
          </div>
          <div className="flex justify-between">
            <span>ENERGY</span>
            <span className="text-yellow-400 font-bold">███████░░░ 73</span>
          </div>
          <div className="flex justify-between">
            <span>RIZZ</span>
            <span className="text-purple-400 font-bold">██████████ 99</span>
          </div>
          <div className="pt-1 border-t border-cyan-500/20 flex justify-between text-[8px] text-cyan-200">
            <span>SPECIAL: GOOD VIBES ✦</span>
            <span>CLASS: HERO</span>
          </div>
        </div>
      )}

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
      <div className="pt-3 text-center space-y-1">
        
        {/* Receipt Line Items Summary */}
        {templateId === 'receipt' && (
          <div className="text-left font-mono text-[8px] border-t border-dashed border-black/40 pt-1.5 space-y-0.5">
            <div className="flex justify-between">
              <span>{photos.length}x GOOD MOMENTS</span>
              <span>PRICELESS</span>
            </div>
            <div className="flex justify-between">
              <span>3x LAUGHING SPREE</span>
              <span>PRICELESS</span>
            </div>
            <div className="flex justify-between">
              <span>1x UTTER CHAOS</span>
              <span>PRICELESS</span>
            </div>
            <div className="flex justify-between">
              <span>99x SMILES CAPTURED</span>
              <span>PRICELESS</span>
            </div>
            <div className="border-t border-dashed border-black/40 pt-1 flex justify-between font-bold text-[9px]">
              <span>TOTAL:</span>
              <span>PRICELESS ♡</span>
            </div>
          </div>
        )}

        {caption && (
          <p
            className={`font-bold leading-tight break-words px-1 ${
              templateId === 'newspaper'
                ? 'font-serif text-xs sm:text-sm text-stone-900 font-black italic tracking-wide'
                : templateId === 'wedding-love' || isHeartShape
                ? 'font-serif text-sm sm:text-base text-red-950 font-black tracking-wide'
                : templateId === 'polaroid'
                ? 'font-handwriting text-lg sm:text-2xl text-base-content'
                : templateId === 'evidence'
                ? 'font-mono text-xs sm:text-sm text-red-950 font-black uppercase'
                : templateId === 'receipt'
                ? 'font-mono text-[10px] sm:text-xs text-black font-extrabold uppercase'
                : templateId === 'character-card'
                ? 'font-mono text-xs sm:text-sm text-cyan-300 font-extrabold'
                : templateId === 'parallel-universe'
                ? 'font-mono text-[11px] sm:text-xs text-purple-300 font-bold'
                : templateId === 'collectible'
                ? 'font-mono text-[11px] sm:text-xs text-yellow-300 font-extrabold uppercase'
                : templateId === 'brain-exe'
                ? 'font-mono text-[11px] sm:text-xs text-cyan-300 font-bold'
                : templateId === 'memory-map'
                ? 'font-mono text-[11px] sm:text-xs text-amber-950 font-bold'
                : templateId === 'kawaii' || currentFrame.hasBow
                ? 'font-display text-xs sm:text-sm text-pink-600 font-extrabold'
                : templateId === 'strawberry' || currentFrame.hasStrawberry
                ? 'font-display text-xs sm:text-sm text-red-600 font-extrabold'
                : templateId === 'teddy' || currentFrame.hasTeddyEars
                ? 'font-display text-xs sm:text-sm text-amber-900 font-extrabold'
                : templateId === 'love-letter' || currentFrame.hasWaxSeal
                ? 'font-serif text-sm sm:text-base text-red-900 italic font-bold'
                : templateId === 'disposable' || currentFrame.hasCameraStamp
                ? 'font-mono text-[11px] sm:text-xs text-emerald-400 font-extrabold uppercase'
                : templateId === 'flower-garden' || currentFrame.hasFlowers
                ? 'font-display text-xs sm:text-sm text-emerald-800 font-extrabold'
                : templateId === 'scrapbook' || currentFrame.hasWashiTape
                ? 'font-handwriting text-base sm:text-lg text-amber-950 font-extrabold'
                : templateId === 'cat' || currentFrame.hasCatEars
                ? 'font-display text-xs sm:text-sm text-primary font-extrabold'
                : templateId === 'cute'
                ? 'font-display text-xs sm:text-sm text-pink-600 font-extrabold'
                : templateId === 'retro'
                ? 'font-mono text-[11px] sm:text-xs text-orange-400 font-extrabold uppercase'
                : templateId === 'minimal'
                ? 'font-mono text-[10px] sm:text-xs uppercase tracking-widest'
                : 'font-handwriting text-base sm:text-xl text-primary font-extrabold'
            }`}
          >
            {templateId === 'newspaper' ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <span>🗞️</span> {caption} <span>🗞️</span>
              </span>
            ) : templateId === 'wedding-love' || isHeartShape ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <span>💍</span> {caption} <span>💍</span>
              </span>
            ) : templateId === 'cat' || currentFrame.hasCatEars ? (
              <span className="inline-flex items-center justify-center gap-1">
                <span>ฅ^•ﻌ•^ฅ</span> {caption}
              </span>
            ) : templateId === 'kawaii' || currentFrame.hasBow ? (
              <span className="inline-flex items-center justify-center gap-1">
                <span>🎀</span> {caption} <span>✦</span>
              </span>
            ) : templateId === 'strawberry' || currentFrame.hasStrawberry ? (
              <span className="inline-flex items-center justify-center gap-1">
                <span>🍓</span> {caption} <span>🍓</span>
              </span>
            ) : templateId === 'teddy' || currentFrame.hasTeddyEars ? (
              <span className="inline-flex items-center justify-center gap-1">
                <span>🧸</span> {caption} <span>🧸</span>
              </span>
            ) : templateId === 'flower-garden' || currentFrame.hasFlowers ? (
              <span className="inline-flex items-center justify-center gap-1">
                <span>🌼</span> {caption} <span>🌼</span>
              </span>
            ) : (
              caption
            )}
          </p>
        )}

        {/* Barcode Graphic for Receipt & Collectible */}
        {(templateId === 'receipt' || templateId === 'collectible') && (
          <div className="py-1 flex flex-col items-center justify-center font-mono opacity-80 select-none">
            <div className="text-xs font-bold tracking-[0.25em] leading-none">
              ||| | |||| | || |||||| | |||
            </div>
            <div className="text-[7px] tracking-widest pt-0.5">
              *2026-MEMORY-PASS*
            </div>
          </div>
        )}

        {/* 4. PERSONALITY FRAME EMBLEM / STAMP */}
        {showPersonalityBadge && personality && (
          <div className="my-1.5 px-2 py-1 rounded-xl border border-black/25 bg-black/5 dark:bg-white/10 flex items-center justify-between gap-1 text-[9px] font-mono select-none shadow-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                style={{
                  backgroundColor: personality.rarityColor || '#E11D48',
                  color: personality.rarityTextCol || '#FFFFFF',
                }}
                className="px-1.5 py-0.2 rounded-md font-black text-[7.5px] uppercase tracking-wider shrink-0 border border-black/20"
              >
                {personality.badge?.split(' ')[1] || personality.rarity || 'VIBE'}
              </span>
              <span className="font-extrabold uppercase tracking-tight truncate text-base-content text-[8.5px]">
                {personality.title}
              </span>
            </div>
            {personality.stats?.[0] && (
              <span className="font-bold opacity-80 shrink-0 text-[7.5px] text-base-content/80 font-mono">
                {personality.stats[0].label} {personality.stats[0].value}%
              </span>
            )}
          </div>
        )}

        {showDate && dateText && (
          <div className="flex items-center justify-center gap-1 text-[10px] font-mono font-bold tracking-wider opacity-70">
            {templateId === 'newspaper' && <span>🗞️</span>}
            {templateId === 'wedding-love' && <span>💍</span>}
            {templateId === 'cat' && <span>🐾</span>}
            {templateId === 'kawaii' && <span>🎀</span>}
            {templateId === 'strawberry' && <span>🍓</span>}
            {templateId === 'teddy' && <span>🧸</span>}
            {templateId === 'love-letter' && <span>💌</span>}
            {templateId === 'flower-garden' && <span>🌼</span>}
            {templateId === 'scrapbook' && <span>✂️</span>}
            {templateId === 'evidence' && <span>📁</span>}
            {templateId === 'receipt' && <span>🧾</span>}
            {templateId === 'character-card' && <span>🎮</span>}
            {templateId === 'parallel-universe' && <span>🪐</span>}
            {templateId === 'collectible' && <span>📦</span>}
            {templateId === 'brain-exe' && <span>💻</span>}
            {templateId === 'memory-map' && <span>🗺️</span>}
            <span>{dateText}</span>
            <span>•</span>
            <span>
              {templateId === 'newspaper'
                ? 'EDISI KHUSUS'
                : templateId === 'wedding-love'
                ? 'JUST MARRIED'
                : templateId === 'cat'
                ? 'MEOWBOOTH'
                : templateId === 'kawaii'
                ? 'KAWAII CLUB'
                : templateId === 'strawberry'
                ? 'BERRY BOOTH'
                : templateId === 'teddy'
                ? 'TEDDY PHOTO'
                : templateId === 'love-letter'
                ? 'FOREVER & ALWAYS'
                : templateId === 'disposable'
                ? 'QUICKSNAP 35MM'
                : templateId === 'flower-garden'
                ? 'GARDEN BOOTH'
                : templateId === 'scrapbook'
                ? 'SCRAPBOOK'
                : templateId === 'evidence'
                ? 'CASE CLOSED'
                : templateId === 'receipt'
                ? 'THANK YOU ♡'
                : templateId === 'character-card'
                ? 'PLAYER STATS'
                : templateId === 'parallel-universe'
                ? 'MULTIVERSE'
                : templateId === 'collectible'
                ? 'MINT EDITION'
                : templateId === 'brain-exe'
                ? 'SYSTEM OK'
                : templateId === 'memory-map'
                ? 'THE JOURNEY'
                : 'PHOTOMOMENT'}
            </span>
            {templateId === 'newspaper' && <span>🗞️</span>}
            {templateId === 'wedding-love' && <span>💍</span>}
            {templateId === 'cat' && <span>🐾</span>}
            {templateId === 'kawaii' && <span>🎀</span>}
            {templateId === 'strawberry' && <span>🍓</span>}
            {templateId === 'teddy' && <span>🧸</span>}
            {templateId === 'love-letter' && <span>💌</span>}
            {templateId === 'flower-garden' && <span>🌼</span>}
            {templateId === 'scrapbook' && <span>✂️</span>}
            {templateId === 'evidence' && <span>📁</span>}
            {templateId === 'receipt' && <span>🧾</span>}
            {templateId === 'character-card' && <span>🎮</span>}
            {templateId === 'parallel-universe' && <span>🪐</span>}
            {templateId === 'collectible' && <span>📦</span>}
            {templateId === 'brain-exe' && <span>💻</span>}
            {templateId === 'memory-map' && <span>🗺️</span>}
          </div>
        )}
      </div>

      {/* 5. INTERACTIVE DRAGGABLE & CUSTOM DECORATIONS LAYER */}
      {customDecorations && customDecorations.length > 0 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {customDecorations.map((item) => (
            <div key={item.id} className="pointer-events-auto">
              <DraggableItem
                item={item}
                isSelected={selectedDecorationId === item.id}
                onSelect={onSelectDecoration || (() => {})}
                onUpdate={onUpdateDecoration || (() => {})}
                onRemove={onRemoveDecoration || (() => {})}
                isExporting={isExporting}
                containerRef={ref}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
});

export default PhotoStrip;
