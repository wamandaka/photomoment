import React from 'react';
import { Camera, Sparkles, Download, Check, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Get Ready',
    description: 'Grant camera access, select your favorite strip layout, and choose 3, 4, or 6 shots.',
    icon: Camera,
    color: 'bg-primary text-primary-content',
    border: 'border-primary',
    badge: 'Step 1'
  },
  {
    step: '02',
    title: 'Strike a Pose',
    description: 'Pose for the live countdown (3... 2... 1... 📸). Multi-shot capture with real-time flash and sound.',
    icon: Sparkles,
    color: 'bg-secondary text-secondary-content',
    border: 'border-secondary',
    badge: 'Step 2'
  },
  {
    step: '03',
    title: 'Take Memories Home',
    description: 'Customize with vintage filters, background colors, custom captions, and download your high-res photo strip.',
    icon: Download,
    color: 'bg-accent text-accent-content',
    border: 'border-accent',
    badge: 'Step 3'
  }
];

export default function HowItWorks({ onStartPhotobooth }) {
  return (
    <section id="how-it-works-section" className="py-16 md:py-24 bg-base-200/40 border-y-2 border-base-content/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-base-content font-display">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 font-medium">
            Just like a real photobooth in the mall, but right in your web browser.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="card-neo-hover p-5 sm:p-8 relative flex flex-col justify-between group"
              >
                {/* Step Number Ribbon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center border-2 border-base-content shadow-neo-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-base-content/20 group-hover:text-base-content/40 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Step Details */}
                <div className="space-y-3">
                  <div className="badge badge-sm rounded-lg font-bold border-base-content/20 bg-base-200">
                    {item.badge}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-base-content font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-base-content/75 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom check indicator */}
                <div className="pt-6 mt-6 border-t border-base-content/10 flex items-center gap-2 text-xs font-semibold text-base-content/60">
                  <Check className="w-4 h-4 text-success" />
                  <span>Instant & automatic</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <button
            onClick={onStartPhotobooth}
            className="btn btn-md sm:btn-lg btn-neo-primary rounded-2xl px-8 font-bold gap-2 shadow-neo"
          >
            <span>Try It Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
