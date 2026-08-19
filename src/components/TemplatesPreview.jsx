import React from 'react';
import { TEMPLATES } from '../data/templates';
import { Sparkles, ArrowRight, LayoutList, Image, Film, Square, LayoutGrid } from 'lucide-react';
import { getSamplePhotos } from '../utils/photoProcessor';

const ICON_MAP = {
  LayoutList,
  Image,
  Film,
  Square,
  Sparkles,
  LayoutGrid,
};

export default function TemplatesPreview({ onSelectTemplate }) {
  const samplePhotos = getSamplePhotos(4);

  return (
    <section id="templates-section" className="py-16 md:py-24">
      {/* SVG ClipPath Definition for Heart Frames */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="wedding-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.9 C 0.5, 0.9, 0.08, 0.62, 0.08, 0.35 C 0.08, 0.16, 0.22, 0.05, 0.36, 0.05 C 0.44, 0.05, 0.48, 0.11, 0.5, 0.16 C 0.52, 0.11, 0.56, 0.05, 0.64, 0.05 C 0.78, 0.05, 0.92, 0.16, 0.92, 0.35 C 0.92, 0.62, 0.5, 0.9, 0.5, 0.9 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              Curated Layouts
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-base-content font-display">
              Photobooth Templates
            </h2>
            <p className="text-base sm:text-lg text-base-content/70 max-w-xl font-medium">
              Choose from classic photo booth cuts to 90s analog film rolls and modern minimalist cards.
            </p>
          </div>

          <div className="badge badge-lg bg-secondary/30 text-base-content font-bold border-2 border-base-content/20 px-4 py-3 rounded-2xl">
            {TEMPLATES.length} Unique Aesthetics Ready
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {TEMPLATES.map((tmpl) => {
            const IconComponent = ICON_MAP[tmpl.iconName] || Sparkles;

            return (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl.id)}
                className="card-neo-hover p-4 sm:p-6 rounded-3xl cursor-pointer flex flex-col justify-between group relative overflow-hidden bg-base-100"
              >
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-sm font-extrabold uppercase tracking-wider bg-base-200 border-base-content/20 text-base-content">
                    {tmpl.category}
                  </span>
                  <span className="badge badge-sm badge-primary font-bold text-primary-content">
                    {tmpl.badge}
                  </span>
                </div>

                {/* Template Visual Mockup Box */}
                <div className="my-3 py-4 px-6 bg-base-200/70 rounded-2xl border-2 border-base-content/10 flex items-center justify-center min-h-[220px] group-hover:border-primary/40 transition-colors">
                  
                  {/* Visual representation depending on template */}
                  {tmpl.id === 'wedding-love' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 px-2 py-0.2 bg-gradient-to-r from-amber-300 to-yellow-200 border border-amber-600 rounded-full text-[6px] text-amber-950 font-serif font-black flex items-center gap-0.5 shadow-xs whitespace-nowrap">
                        <span>💍</span> JUST MARRIED
                      </div>
                      <div className="w-24 bg-[#FFFDF9] p-2 rounded-xl border-2 border-amber-600/50 shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-serif font-bold text-center text-red-950">WEDDING LOVE 💍</div>
                        {[0, 1].map((i) => (
                          <div key={i} className="aspect-square relative flex items-center justify-center">
                            <img
                              src={samplePhotos[i]}
                              alt="sample"
                              style={{ clipPath: 'url(#wedding-heart-clip)', WebkitClipPath: 'url(#wedding-heart-clip)' }}
                              className="w-full h-full object-cover filter-soft scale-105"
                            />
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                              <path
                                d="M 50, 90 C 50, 90, 8, 62, 8, 35 C 8, 16, 22, 5, 36, 5 C 44, 5, 48, 11, 50, 16 C 52, 11, 56, 5, 64, 5 C 78, 5, 92, 16, 92, 35 C 92, 62, 50, 90, 50, 90 Z"
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth="4.5"
                              />
                            </svg>
                          </div>
                        ))}
                        <div className="text-[5px] font-serif italic text-center text-amber-900 font-bold">forever & always</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'evidence' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 left-2 text-[10px]">📌</div>
                      <div className="absolute top-0 right-2 text-[10px]">📌</div>
                      <div className="w-24 bg-[#F4E8C1] p-2 rounded-lg border-2 border-red-950/50 shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-mono font-bold text-center text-red-950">CASE #0826</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-stone-100 rounded-xs overflow-hidden border border-red-950/30 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-vintage" />
                            <span className="absolute top-0.5 left-0.5 text-[5px] bg-red-800 text-white px-0.5 font-mono">EXHIBIT</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-mono text-center text-red-900 font-black">CONFIDENTIAL</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'receipt' && (
                    <div className="w-24 bg-white p-2 rounded-xs border-2 border-black/30 shadow-neo-sm space-y-1 font-mono">
                      <div className="text-[6px] font-bold text-center text-black">*** RECEIPT ***</div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="aspect-[4/3] bg-stone-50 rounded-xs overflow-hidden border border-black/20">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-bw" />
                        </div>
                      ))}
                      <div className="text-[5px] text-center border-t border-dashed border-black/30 pt-0.5 font-bold">TOTAL: PRICELESS</div>
                    </div>
                  )}

                  {tmpl.id === 'character-card' && (
                    <div className="w-24 bg-slate-950 p-2 rounded-xl border-2 border-cyan-400 shadow-neo-sm space-y-1 font-mono">
                      <div className="flex justify-between text-[6px] text-cyan-300 font-bold">
                        <span>LVL 99</span>
                        <span>★ EPIC</span>
                      </div>
                      {[0, 1].map((i) => (
                        <div key={i} className="aspect-[4/3] bg-slate-900 rounded-lg overflow-hidden border border-cyan-400/50">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-cyberpunk" />
                        </div>
                      ))}
                      <div className="text-[5px] text-cyan-300 font-bold space-y-0.2">
                        <div>CHAOS ████░ 82%</div>
                        <div>RIZZ  █████ 99%</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'parallel-universe' && (
                    <div className="w-24 bg-slate-950 p-2 rounded-xl border-2 border-purple-500 shadow-neo-sm space-y-1 font-mono">
                      <div className="text-[6px] text-purple-300 font-bold text-center">UNIVERSE #728</div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="aspect-[4/3] bg-slate-900 rounded-lg overflow-hidden border border-purple-400/40 relative">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-vintage" />
                          <span className="absolute bottom-0.2 inset-x-0 text-[5px] bg-black/80 text-purple-300 text-center">VAR #{i+1}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {tmpl.id === 'collectible' && (
                    <div className="w-24 bg-slate-900 p-2 rounded-xl border-2 border-pink-500 shadow-neo-sm space-y-1 font-mono">
                      <div className="flex justify-between text-[6px] text-yellow-300 font-bold">
                        <span>#0826</span>
                        <span>1ST ED.</span>
                      </div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="aspect-[4/3] bg-slate-800 rounded-md overflow-hidden border border-pink-400/40">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-warm" />
                        </div>
                      ))}
                      <div className="text-[5px] text-yellow-200 text-center font-bold">MINT CONDITION</div>
                    </div>
                  )}

                  {tmpl.id === 'brain-exe' && (
                    <div className="w-24 bg-blue-950 p-2 rounded-xs border-2 border-cyan-400 shadow-neo-sm space-y-1 font-mono">
                      <div className="text-[5px] text-cyan-200 bg-cyan-900/80 px-1 py-0.2 rounded flex justify-between">
                        <span>Brain.exe</span>
                        <span>[X]</span>
                      </div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="aspect-[4/3] bg-black rounded-xs overflow-hidden border border-cyan-400/40">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-retro" />
                        </div>
                      ))}
                      <div className="text-[5px] text-cyan-300 text-center font-bold">BATTERY: 37%</div>
                    </div>
                  )}

                  {tmpl.id === 'memory-map' && (
                    <div className="w-24 bg-[#FAF0CA] p-2 rounded-xl border-2 border-amber-900/40 shadow-neo-sm space-y-1 font-mono">
                      <div className="text-[6px] font-bold text-amber-900 text-center">🧭 JOURNEY MAP</div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className={`aspect-[4/3] bg-stone-100 rounded-md overflow-hidden border border-amber-900/30 ${i % 2 === 1 ? 'ml-1.5' : 'mr-1.5'}`}>
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-warm" />
                        </div>
                      ))}
                      <div className="text-[5px] text-amber-950 text-center font-bold">START ──► END</div>
                    </div>
                  )}

                  {tmpl.id === 'kawaii' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 px-2 py-0.2 bg-pink-400 border border-black rounded-full text-[7px] text-white font-black flex items-center gap-0.5">
                        <span>🎀</span> KAWAII
                      </div>
                      <div className="w-24 bg-pink-50 p-2 rounded-xl border-2 border-black shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-bold text-center text-pink-600">✦ KAWAII CLUB ✦</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-pink-100 rounded-lg overflow-hidden border border-pink-300 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-pastel" />
                            <span className="absolute top-0.5 right-0.5 text-[6px]">🎀</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-mono text-center text-pink-600 font-bold">sweet ♡</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'strawberry' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 left-2 text-[10px]">🍓</div>
                      <div className="absolute top-0 right-2 text-[10px]">🍓</div>
                      <div className="w-24 bg-rose-50 p-2 rounded-xl border-2 border-black shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-bold text-center text-rose-600">🍓 STRAWBERRY 🍓</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-rose-100 rounded-lg overflow-hidden border border-rose-300 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-pastel" />
                            <span className="absolute top-0.5 right-0.5 text-[6px]">🍓</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-mono text-center text-rose-600 font-bold">berry sweet</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'teddy' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 left-2 w-4 h-4 bg-[#FDF6EE] border-2 border-black rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#E6CCB2] rounded-full" />
                      </div>
                      <div className="absolute top-0 right-2 w-4 h-4 bg-[#FDF6EE] border-2 border-black rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#E6CCB2] rounded-full" />
                      </div>
                      <div className="w-24 bg-[#FDF6EE] p-2 rounded-xl border-2 border-black shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-bold text-center text-amber-900">🧸 TEDDY & YOU 🧸</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-amber-50 rounded-lg overflow-hidden border border-amber-800/20 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-warm" />
                            <span className="absolute top-0.5 right-0.5 text-[6px]">🧸</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-mono text-center text-amber-900 font-bold">cozy & warm</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'love-letter' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 right-3 w-4 h-4 bg-red-800 text-[6px] text-amber-200 rounded-full border border-amber-400 flex items-center justify-center font-serif">
                        💌
                      </div>
                      <div className="w-24 bg-[#FCFBF7] p-2 rounded-lg border-2 border-red-950/40 shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-serif font-bold text-center text-red-900">LOVE & CHERISH</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden border border-red-900/20 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-soft" />
                            <span className="absolute top-0.5 right-0.5 text-[6px]">💌</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-serif italic text-center text-red-900">forever & always</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'disposable' && (
                    <div className="w-28 bg-[#18231F] p-2 rounded-sm border-2 border-emerald-500 shadow-neo-sm space-y-1">
                      <div className="flex justify-between text-[6px] font-mono text-emerald-400">
                        <span>● 35MM</span>
                        <span>QUICKSNAP</span>
                      </div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="aspect-[3/2] bg-neutral-900 rounded-xs overflow-hidden border border-emerald-500/40 relative">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-retro" />
                          <span className="absolute bottom-0.5 right-1 text-[5px] font-mono text-amber-400 font-bold">'98 08 19</span>
                        </div>
                      ))}
                      <div className="text-[5px] font-mono text-center text-emerald-400 font-bold">SINGLE USE 24+3</div>
                    </div>
                  )}

                  {tmpl.id === 'flower-garden' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 inset-x-0 flex justify-center gap-1 text-[8px]">
                        <span>🌿</span><span>🌼</span><span>🌸</span><span>🌿</span>
                      </div>
                      <div className="w-24 bg-[#F4F9F4] p-2 rounded-xl border-2 border-black shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-bold text-center text-emerald-800">FLOWER GARDEN</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-emerald-50 rounded-lg overflow-hidden border border-emerald-300 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-pastel" />
                            <span className="absolute top-0.5 right-0.5 text-[6px]">🌼</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-mono text-center text-emerald-700 font-bold">blooming moments</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'scrapbook' && (
                    <div className="relative pt-3">
                      <div className="absolute top-0 left-2 w-8 h-3 bg-amber-200/90 border border-amber-900/40 transform -rotate-6 text-[5px] font-mono font-bold flex items-center justify-center">
                        MEMO
                      </div>
                      <div className="w-24 bg-[#F5EBE0] p-2 rounded-md border-2 border-amber-900/40 shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-mono font-bold text-center text-amber-950">✂️ SCRAPBOOK 📝</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-square bg-stone-100 rounded-xs overflow-hidden border border-amber-900/20 relative shadow-xs">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-vintage" />
                            <span className="absolute top-0.5 left-0.5 text-[5px] bg-amber-200/80 px-0.5">#0{i+1}</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-handwriting text-center text-amber-950 font-bold">memories '26</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'cat' && (
                    <div className="relative pt-3">
                      {/* Mini Cat Ears */}
                      <div className="absolute top-0.5 left-3 w-4 h-4 bg-pink-100 border-2 border-black rounded-tl-xl rounded-tr-xs transform -rotate-12">
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-pink-300 rounded-tl-xs" />
                      </div>
                      <div className="absolute top-0.5 right-3 w-4 h-4 bg-pink-100 border-2 border-black rounded-tr-xl rounded-tl-xs transform rotate-12">
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-pink-300 rounded-tr-xs" />
                      </div>
                      
                      <div className="w-24 bg-pink-100 p-2 rounded-xl border-2 border-black shadow-neo-sm space-y-1">
                        <div className="text-[6px] font-bold text-center text-pink-700">🐾 NEKO 🐾</div>
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="aspect-[4/3] bg-pink-50 rounded-lg overflow-hidden border border-pink-300 relative">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-pastel" />
                            <span className="absolute top-0.5 right-0.5 text-[6px]">🐾</span>
                          </div>
                        ))}
                        <div className="text-[5px] font-mono text-center text-pink-600 font-bold">meow ♡</div>
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'classic' && (
                    <div className="w-24 bg-white p-2 rounded-lg border-2 border-black shadow-neo-sm space-y-1">
                      <div className="text-[6px] font-bold text-center text-black">PHOTO</div>
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="aspect-[4/3] bg-pink-100 rounded-xs overflow-hidden border border-black/20">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="text-[5px] font-mono text-center text-black/60">2026 ♡</div>
                    </div>
                  )}

                  {tmpl.id === 'polaroid' && (
                    <div className="w-32 bg-white p-2.5 pb-5 rounded-lg border-2 border-black shadow-neo-sm space-y-1.5 transform rotate-[-2deg]">
                      <div className="aspect-square bg-amber-50 rounded-xs overflow-hidden border border-black/20">
                        <img src={samplePhotos[0]} alt="sample" className="w-full h-full object-cover filter-vintage" />
                      </div>
                      <div className="text-[8px] font-handwriting text-center text-black font-bold">
                        good times ♡
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'retro' && (
                    <div className="w-28 bg-neutral-900 p-2 rounded-lg border-2 border-orange-500 shadow-neo-sm space-y-1">
                      <div className="flex justify-between text-[6px] font-mono text-orange-400">
                        <span>● REC</span>
                        <span>35MM</span>
                      </div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="aspect-[3/2] bg-neutral-800 rounded-xs overflow-hidden border border-orange-400/40">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-retro" />
                        </div>
                      ))}
                      <div className="text-[6px] font-mono text-center text-orange-400">2026-08-19</div>
                    </div>
                  )}

                  {tmpl.id === 'minimal' && (
                    <div className="w-28 bg-[#FAF6EE] p-3 rounded-none border border-black/40 shadow-sm space-y-2">
                      <div className="text-[7px] font-mono uppercase tracking-widest text-center text-black">
                        STUDIO
                      </div>
                      {[0, 1].map((i) => (
                        <div key={i} className="aspect-[4/5] bg-stone-200 overflow-hidden">
                          <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-bw" />
                        </div>
                      ))}
                    </div>
                  )}

                  {tmpl.id === 'cute' && (
                    <div className="w-28 bg-pink-100 p-2.5 rounded-2xl border-2 border-pink-400 shadow-neo-sm space-y-1.5 transform rotate-[2deg]">
                      <div className="text-[8px] font-bold text-center text-pink-600 flex items-center justify-center gap-1">
                        <span>✿</span> Y2K CUTE <span>✿</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-pink-50 rounded-xl overflow-hidden border border-pink-300">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-pastel" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tmpl.id === 'grid' && (
                    <div className="w-32 bg-zinc-900 p-2.5 rounded-xl border-2 border-black shadow-neo-sm space-y-1.5">
                      <div className="grid grid-cols-2 gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-zinc-800 rounded-md overflow-hidden border border-white/20">
                            <img src={samplePhotos[i]} alt="sample" className="w-full h-full object-cover filter-warm" />
                          </div>
                        ))}
                      </div>
                      <div className="text-[7px] font-mono text-center text-white/80">GRID 2x2</div>
                    </div>
                  )}

                </div>

                {/* Template Info & Action */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content font-display group-hover:text-primary transition-colors">
                      {tmpl.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-base-content/70 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                {/* Button Action */}
                <div className="pt-4 mt-4 border-t border-base-content/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Use Template <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-mono text-base-content/50 font-semibold">
                    {tmpl.aspectRatio}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
