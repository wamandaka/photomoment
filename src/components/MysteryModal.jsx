import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, Flame, Heart, Shuffle, ArrowRight } from 'lucide-react';
import { fireConfetti } from '../utils/downloadImage';
import { generatePersonality } from '../utils/personalityGenerator';
import { getRandomFunnyCaption } from '../utils/funnyCaptions';
import { TEMPLATES } from '../data/templates';

export default function MysteryModal({
  isOpen,
  onClose,
  onApplyMystery,
  onApply,
}) {
  const [step, setStep] = useState(0); // 0: countdown, 1: scanning, 2: matching, 3: revealed
  const [mysteryData, setMysteryData] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setMysteryData(null);
      return;
    }

    // Roll a new fresh surprise combination when the mystery modal opens
    const creativePool = TEMPLATES.filter((t) => t.category === 'Concepts' || t.category === 'Cute');
    const randomTmpl = creativePool[Math.floor(Math.random() * creativePool.length)] || TEMPLATES[0];
    const newPersonality = generatePersonality();
    const funnyCaption = getRandomFunnyCaption(randomTmpl.id);

    setMysteryData({
      templateId: randomTmpl.id,
      templateName: randomTmpl.name,
      frameId: randomTmpl.defaultFrame || 'white',
      filterId: randomTmpl.defaultFilter || 'original',
      caption: funnyCaption,
      personality: newPersonality,
    });

    // Progression timer
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => {
      setStep(3);
      fireConfetti();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (typeof onApplyMystery === 'function') {
      onApplyMystery(mysteryData);
    } else if (typeof onApply === 'function') {
      onApply(mysteryData);
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const previewPersonality = mysteryData?.personality;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="card-neo max-w-md w-full p-6 sm:p-8 bg-base-100 space-y-6 relative border-4 border-black text-center shadow-neo-xl overflow-hidden">
        
        {/* Animated background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-secondary-content rounded-full text-xs font-black uppercase tracking-wider border-2 border-black shadow-neo-sm">
            <Dices className="w-3.5 h-3.5 animate-spin" />
            <span>MYSTERY PHOTOBOOTH</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-base-content font-display tracking-tight pt-2">
            {step < 3 ? 'What Did You Get?' : '✨ Memory Unlocked! ✨'}
          </h3>
        </div>

        {/* Animated Stage Display */}
        <div className="py-6 px-4 bg-base-200/80 rounded-2xl border-2 border-black shadow-neo-sm space-y-4 min-h-[170px] flex flex-col items-center justify-center">
          
          {step === 0 && (
            <div className="space-y-2 animate-bounce">
              <div className="text-4xl">🎲</div>
              <p className="font-mono text-sm font-extrabold uppercase tracking-widest text-primary">
                Rolling The Cosmic Dice...
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3 animate-pulse">
              <div className="text-4xl">🔍⚡</div>
              <p className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-base-content">
                Analyzing Chaos & Vibe Level...
              </p>
              <div className="w-48 h-2.5 bg-base-300 rounded-full overflow-hidden border border-black/30 mx-auto">
                <div className="h-full bg-primary animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 animate-pulse">
              <div className="text-4xl">🪐🔮</div>
              <p className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-base-content">
                Matching Multiverse Dimension...
              </p>
              <div className="w-48 h-2.5 bg-base-300 rounded-full overflow-hidden border border-black/30 mx-auto">
                <div className="h-full bg-secondary animate-pulse w-full rounded-full" />
              </div>
            </div>
          )}

          {step === 3 && previewPersonality && (
            <div className="space-y-3 animate-fade-in">
              <div
                className="inline-block px-3 py-0.5 rounded-full text-[11px] font-black tracking-widest uppercase border border-black shadow-neo-sm"
                style={{
                  backgroundColor: previewPersonality.rarityColor || '#E11D48',
                  color: previewPersonality.rarityTextCol || '#FFFFFF',
                }}
              >
                {previewPersonality.badge}
              </div>
              <h4 className="text-2xl font-black font-display text-base-content">
                {previewPersonality.title}
              </h4>
              <p className="text-xs text-base-content/80 font-medium italic max-w-xs mx-auto">
                "{previewPersonality.quote}"
              </p>
              {mysteryData?.templateName && (
                <div className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 inline-block">
                  Template: {mysteryData.templateName}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Action Button */}
        {step === 3 ? (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleApply}
              className="btn btn-md sm:btn-lg btn-neo-primary w-full rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-neo-lg"
            >
              <span>Reveal My Memory!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-base-content/60 font-mono">
              Applied creative template & personalized decorations!
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-base-content/50">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span>Decoding your photos...</span>
          </div>
        )}

      </div>
    </div>
  );
}
