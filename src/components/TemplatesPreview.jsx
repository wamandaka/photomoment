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
