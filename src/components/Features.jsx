import React from 'react';
import { Camera, Layers, Wand2, Palette, Download, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Camera,
    title: 'Live Camera Experience',
    desc: 'Smooth webcam streaming with mirror mode, rear camera flip, countdown chimes, and realistic shutter flash.',
    badge: 'Camera',
    color: 'bg-primary text-primary-content',
  },
  {
    icon: Layers,
    title: 'Multi-Shot Sequences',
    desc: 'Choose between 3, 4, or 6 shots. The booth automatically captures the series with timed countdowns between poses.',
    badge: 'Multi-Shot',
    color: 'bg-secondary text-secondary-content',
  },
  {
    icon: Wand2,
    title: 'Aesthetic Photo Filters',
    desc: 'Transform photos with 9 real-time filters including 90s Retro, Vintage Warmth, Cyber Neon, B&W, and Pastel Dream.',
    badge: 'Filters',
    color: 'bg-accent text-accent-content',
  },
  {
    icon: Palette,
    title: 'Custom Frames & Stickers',
    desc: 'Select frame colors, borders, custom handwritten captions, auto date stamps, and cute decorative sticker stamps.',
    badge: 'Customizer',
    color: 'bg-warning text-warning-content',
  },
  {
    icon: Download,
    title: 'Instant High-Res PNG Export',
    desc: 'Export crystal clear 300 DPI photo strips ready for printing, direct social sharing, or copying to clipboard.',
    badge: 'Export',
    color: 'bg-success text-success-content',
  },
  {
    icon: ShieldCheck,
    title: '100% Client-Side & Private',
    desc: 'Your photos never leave your device. All processing, filtering, and composite generation runs inside your browser.',
    badge: 'Privacy First',
    color: 'bg-neutral text-neutral-content',
  },
];

export default function Features() {
  return (
    <section id="features-section" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Packed with Features
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-base-content font-display">
            Everything You Need For The Best Shots
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 font-medium">
            Engineered with modern web tech to deliver an authentic photobooth experience without installing any app.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="card-neo-hover p-5 sm:p-6 rounded-3xl space-y-4 bg-base-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center border-2 border-base-content shadow-neo-sm`}>
                      <Icon className="w-6 h-6" strokeWidth={2.2} />
                    </div>
                    <span className="badge badge-sm rounded-lg font-bold border-base-content/20 bg-base-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-base-content font-display">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-base-content/75 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div className="w-full h-1 bg-base-200 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-primary/40 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
