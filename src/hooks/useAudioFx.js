import { useCallback, useRef, useState } from 'react';

/**
 * Web Audio API synthesizer for tactile photobooth sound effects
 * Zero external audio file latency, 100% reliable in any browser environment
 */
export function useAudioFx() {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Short countdown tick sound (3, 2, 1)
  const playTick = useCallback((isFinal = false) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFinal ? 880 : 587.33, ctx.currentTime); // A5 or D5
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isFinal ? 0.2 : 0.1));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (isFinal ? 0.2 : 0.1));
    } catch {
      // Audio playback fails gracefully if browser blocks before user gesture
    }
  }, [getAudioContext, isMuted]);

  // Camera mechanical shutter click effect
  const playSnap = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Click 1 (Mirror flip up)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(300, now);
      osc1.frequency.exponentialRampToValueAtTime(80, now + 0.04);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Noise burst for mechanical shutter snap
      const bufferSize = ctx.sampleRate * 0.06;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now + 0.03);
      filter.Q.setValueAtTime(3, now + 0.03);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now + 0.03);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now + 0.03);
      whiteNoise.stop(now + 0.09);
    } catch {
      // Ignore audio error
    }
  }, [getAudioContext, isMuted]);

  // Celebration fanfare sound when photos are ready
  const playSuccess = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.09;
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    isMuted,
    toggleMute,
    playTick,
    playSnap,
    playSuccess
  };
}
