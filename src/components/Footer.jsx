import React from 'react';
import { Camera, Heart, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Footer({ onStartPhotobooth }) {
  return (
    <footer className="border-t-2 border-base-content/10 bg-base-200/50 mt-12 sm:mt-20 pt-8 sm:pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-primary-content flex items-center justify-center border-2 border-base-content shadow-neo-sm">
                <Camera className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-base-content font-display">
                PHOTO<span className="text-primary">MOMENT</span>
              </span>
            </div>
            <p className="text-sm text-base-content/70 max-w-sm leading-relaxed">
              A modern digital photobooth designed to capture your best memories instantly. 
              No app download required, 100% private in your browser.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="badge badge-outline rounded-full text-xs font-semibold py-3 px-3 gap-1.5 border-base-content/20">
                <ShieldCheck className="w-3.5 h-3.5 text-success" /> 100% Private (No Cloud Upload)
              </span>
              <span className="badge badge-outline rounded-full text-xs font-semibold py-3 px-3 gap-1.5 border-base-content/20">
                <Zap className="w-3.5 h-3.5 text-warning" /> Client-Side HD Export
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-base-content/50 mb-3">
              Templates
            </h4>
            <ul className="space-y-2 text-sm font-medium text-base-content/80">
              <li><span className="hover:text-primary transition-colors cursor-pointer" onClick={onStartPhotobooth}>Classic 4-Cut Strip</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer" onClick={onStartPhotobooth}>Polaroid Instant</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer" onClick={onStartPhotobooth}>Retro 35mm Film</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer" onClick={onStartPhotobooth}>Minimalist Studio</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer" onClick={onStartPhotobooth}>Cute Y2K Grid</span></li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="p-5 rounded-2xl bg-base-100 border-2 border-base-content/15 shadow-neo-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Ready to pose?
            </div>
            <p className="text-xs text-base-content/70">
              Turn your webcam into an instant memory booth in seconds.
            </p>
            <button
              onClick={onStartPhotobooth}
              className="btn btn-sm btn-neo-primary w-full rounded-xl font-bold"
            >
              Start Session 📸
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-base-content/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-3">
          <p>© {new Date().getFullYear()} PHOTOMOMENT. Designed for parties, weddings, & everyday memories.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-primary fill-current" /> & modern web tech
          </p>
        </div>
      </div>
    </footer>
  );
}
