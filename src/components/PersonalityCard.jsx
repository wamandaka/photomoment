import React, { useState } from 'react';
import { Sparkles, Dices, Award, Zap, Heart, Info, X, Activity, Sun, Palette, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function PersonalityCard({ personality, onReroll }) {
  const [showInfo, setShowInfo] = useState(false);

  if (!personality) return null;

  const metrics = personality.measuredMetrics;

  return (
    <div className="card-neo p-4 sm:p-5 bg-base-100 border-3 border-black rounded-3xl space-y-3.5 relative overflow-hidden shadow-neo text-left">
      
      {/* 1. Top Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-base-content/10 pb-2.5 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles className="w-4 h-4 text-primary fill-current shrink-0" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-base-content/70 truncate">
            {metrics ? 'Photo-Analyzed Vibe' : 'Photo Personality'}
          </span>
        </div>
        
        {/* Info Toggle Button */}
        <button
          type="button"
          onClick={() => setShowInfo((prev) => !prev)}
          className={`btn btn-xs rounded-xl px-2.5 font-bold text-[10px] gap-1 border border-base-content/20 transition-all shrink-0 ${
            showInfo
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
          title="Pelajari bagaimana kepribadian ini dianalisis dari foto Anda"
        >
          <Info className="w-3 h-3" />
          <span>{showInfo ? 'Tutup' : 'Cara Kerja'}</span>
        </button>
      </div>

      {/* 2. HOW IT WORKS / CARA KERJA EXPLAINER ACCORDION */}
      {showInfo && (
        <div className="p-3.5 bg-base-200/90 rounded-2xl border-2 border-primary/40 space-y-2.5 animate-fade-in text-left font-sans">
          <div className="flex items-center justify-between border-b border-base-content/15 pb-2 gap-2">
            <h5 className="text-xs font-black text-primary flex items-center gap-1.5 font-display truncate">
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span>Bagaimana Foto Anda Dianalisis?</span>
            </h5>
            
            {/* 100% Client-Side Tag (Fixed clean layout) */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-[10px] font-black border border-success/40 shrink-0">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Client-Side</span>
            </div>
          </div>

          <div className="space-y-2 text-[11px] text-base-content/85 leading-relaxed font-medium">
            <div className="flex items-start gap-2">
              <span className="p-1 rounded-lg bg-secondary/20 text-secondary-content font-bold shrink-0 mt-0.5">
                🌀
              </span>
              <div>
                <strong className="text-base-content font-bold">Variasi Pose & Gerakan:</strong> Mengukur selisih piksel antar-jepretan. Banyak ganti pose heboh memicu skor <em>Chaos & Energy</em> tinggi.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="p-1 rounded-lg bg-warning/20 text-warning font-bold shrink-0 mt-0.5">
                ☀️
              </span>
              <div>
                <strong className="text-base-content font-bold">Tingkat Pencahayaan:</strong> Menganalisis kecerahan foto untuk menentukan aura <em>Style, Confidence</em>, atau <em>Mystery</em>.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="p-1 rounded-lg bg-primary/20 text-primary font-bold shrink-0 mt-0.5">
                💖
              </span>
              <div>
                <strong className="text-base-content font-bold">Rona Kehangatan Warna:</strong> Menghitung spektrum warna hangat/kemerahan untuk atribut <em>Romance & Wholesomeness</em>.
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-base-content/10 flex items-center justify-between text-[10px] text-base-content/60 font-mono">
            <span>Proses instan tanpa kirim foto ke server eksternal</span>
          </div>
        </div>
      )}

      {/* 3. Real Measured Indicators Bar (If available) */}
      {metrics && (
        <div className="grid grid-cols-3 gap-1 p-2 bg-primary/5 rounded-xl border border-primary/20 text-[10px] font-mono text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-base-content/60 text-[9px]">GERAKAN</span>
            <span className="font-bold text-primary">{metrics.motionVariance}%</span>
          </div>
          <div className="flex flex-col items-center justify-center border-x border-primary/15">
            <span className="text-base-content/60 text-[9px]">CAHAYA</span>
            <span className="font-bold text-secondary">{metrics.avgBrightness}%</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-base-content/60 text-[9px]">RONA</span>
            <span className="font-bold text-accent">{metrics.avgWarmth}%</span>
          </div>
        </div>
      )}

      {/* 4. Title Section with Full-Width Name & Neat Top Rarity Badge */}
      <div className="space-y-1 pt-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            YOU GOT:
          </span>
          
          {/* Rarity Badge (Neat top pill that never crowds the title) */}
          <div
            style={{
              backgroundColor: personality.rarityColor || '#E11D48',
              color: personality.rarityTextCol || '#FFFFFF',
            }}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-neo-sm shrink-0 whitespace-nowrap"
          >
            {personality.badge}
          </div>
        </div>

        {/* Full-width Personality Name (Never truncated or covered) */}
        <h4 className="text-xl sm:text-2xl font-black font-display text-base-content tracking-tight leading-snug">
          {personality.title}
        </h4>

        {/* Tagline */}
        <p className="text-xs text-base-content/70 font-medium leading-relaxed">
          {personality.tagline}
        </p>
      </div>

      {/* 5. Dynamic Stat Progress Bars */}
      <div className="space-y-1.5 py-2 px-3 bg-base-200/60 rounded-2xl border border-base-content/10 font-mono text-[11px]">
        {personality.stats &&
          personality.stats.map((st, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <span className="font-bold text-base-content/80 w-24 truncate">
                {st.label}
              </span>
              <div className="flex-1 flex items-center gap-1.5 justify-end font-bold">
                <span className="text-primary tracking-tight select-none">
                  {st.bar}
                </span>
                <span className="w-8 text-right text-[10px] text-base-content/70">
                  {st.value}%
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* 6. Quote */}
      <div className="p-2.5 bg-primary/10 rounded-2xl border border-primary/20 text-center">
        <p className="text-xs font-medium italic text-base-content leading-relaxed">
          "{personality.quote}"
        </p>
      </div>

      {/* 7. Re-roll Action */}
      {onReroll && (
        <div className="pt-1 flex justify-end">
          <button
            onClick={onReroll}
            className="btn btn-xs btn-ghost rounded-xl font-bold text-[11px] gap-1 text-base-content/70 hover:text-primary"
            title="Generate a new personality"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Re-roll Vibe</span>
          </button>
        </div>
      )}

    </div>
  );
}
