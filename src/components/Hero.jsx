import React from 'react';
import { Camera, Sparkles, ArrowRight, Star, Heart, CheckCircle2, Play, Smile } from 'lucide-react';
import { getSamplePhotos } from '../utils/photoProcessor';

export default function Hero({ onStartPhotobooth, onSelectTemplate }) {
  const samplePhotos = getSamplePhotos(4);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background playful accents */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/30 border-2 border-base-content/20 text-xs font-bold shadow-neo-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-base-content font-extrabold uppercase tracking-wide">
                100% Free & No App Required
              </span>
              <span className="badge badge-xs bg-primary text-white border-0 font-bold px-1.5 py-0.5">
                NEW
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-base-content font-display leading-[1.08]">
              Capture the moment. <br />
              <span className="text-primary underline decoration-secondary decoration-wavy decoration-4">
                Make it yours.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-base-content/75 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              A playful digital photobooth for your best moments. Snap multi-shots, pick aesthetic templates, customize with vintage filters, and save high-res photo strips in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartPhotobooth}
                className="btn btn-lg btn-neo-primary rounded-2xl w-full sm:w-auto px-8 gap-3 text-base font-bold group"
                id="hero-start-btn"
              >
                <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Start Photobooth</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#templates-section"
                className="btn btn-lg btn-neo-ghost rounded-2xl w-full sm:w-auto px-6 gap-2 text-base font-bold"
              >
                <span>View Templates</span>
              </a>
            </div>

            {/* Feature Highlights Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-base-content/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Live Camera Multi-Shot</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Aesthetic Retro Filters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>High-Res PNG Download</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photo Strip Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group cursor-pointer" onClick={onStartPhotobooth}>
              
              {/* Floating Sticker 1 */}
              <div className="absolute -top-4 -left-6 z-20 bg-secondary text-secondary-content px-3 py-1.5 rounded-2xl border-2 border-base-content shadow-neo font-display font-extrabold text-xs rotate-[-8deg] animate-float flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>BEST MEMORIES</span>
              </div>

              {/* Floating Sticker 2 */}
              <div className="absolute -bottom-3 -right-6 z-20 bg-primary text-white px-3 py-1.5 rounded-2xl border-2 border-base-content shadow-neo font-handwriting text-base rotate-[6deg] flex items-center gap-1">
                <Heart className="w-4 h-4 fill-current" />
                <span>august 2026 ♡</span>
              </div>

              {/* Decorative behind card */}
              <div className="absolute inset-0 bg-base-content/10 rounded-3xl transform rotate-3 scale-95 -z-10 translate-y-2" />

              {/* The Mockup Strip Card */}
              <div className="w-[260px] sm:w-[290px] bg-base-100 p-4 sm:p-5 rounded-3xl border-3 border-base-content shadow-neo-xl transition-all duration-300 group-hover:rotate-1 group-hover:scale-[1.02]">
                
                {/* Strip Top Header */}
                <div className="text-center pb-2 border-b border-base-content/15 mb-2.5">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold tracking-widest uppercase text-base-content">
                    <Camera className="w-3 h-3 text-primary" />
                    <span>PHOTOMOMENT STUDIO</span>
                  </div>
                  <div className="text-[9px] font-mono font-medium text-base-content/60">
                    REC ● 00:26:08
                  </div>
                </div>

                {/* 4 Photo Boxes */}
                <div className="space-y-2.5">
                  {samplePhotos.map((photo, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-xl border-2 border-base-content/20 bg-base-200 aspect-[4/3] group-hover:border-base-content/40 transition-colors shadow-inner"
                    >
                      <img
                        src={photo}
                        alt={`Sample photo ${i + 1}`}
                        className="w-full h-full object-cover filter-warm"
                      />
                      <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded-md bg-black/40 text-[9px] font-mono text-white backdrop-blur-xs">
                        0{i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strip Bottom Footer */}
                <div className="pt-3 text-center">
                  <p className="font-handwriting text-lg text-primary font-bold">
                    Our little moment ♡
                  </p>
                  <p className="text-[10px] font-mono font-bold tracking-wider text-base-content/60">
                    19 AUG 2026 • PHOTOBOOTH
                  </p>
                </div>

              </div>

              {/* Hover Badge overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-base-content/10 backdrop-blur-[2px] rounded-3xl">
                <span className="btn btn-sm btn-neo-primary rounded-xl font-bold shadow-neo">
                  <Play className="w-4 h-4 fill-current mr-1" /> Click to Start
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
