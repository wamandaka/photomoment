// Personality profiles with stats, quotes, and rarities
export const PERSONALITY_PROFILES = [
  {
    id: 'chaotic-cutie',
    title: 'Chaotic Cutie',
    rarity: 'Legendary',
    rarityColor: '#E11D48',
    rarityTextCol: '#FFFFFF',
    badge: '★ LEGENDARY',
    tagline: 'Pure chaos wrapped in a cute package',
    stats: [
      { label: 'CHAOS', value: 98 },
      { label: 'ROMANCE', value: 72 },
      { label: 'ENERGY', value: 91 },
      { label: 'SERIOUS', value: 18 },
    ],
    quote: 'You probably said "one more photo" at least 7 times.',
    specialTrait: 'Accidental Masterpiece Creator',
  },
  {
    id: 'main-character',
    title: 'Main Character',
    rarity: 'Mythic',
    rarityColor: '#9333EA',
    rarityTextCol: '#FFFFFF',
    badge: '✦ MYTHIC',
    tagline: 'The spotlight naturally finds you',
    stats: [
      { label: 'DRAMA', value: 95 },
      { label: 'CONFIDENCE', value: 99 },
      { label: 'ENERGY', value: 88 },
      { label: 'HUMILITY', value: 24 },
    ],
    quote: 'The camera does not just love you—it is completely obsessed.',
    specialTrait: 'Unapologetic Main Character Energy',
  },
  {
    id: 'certified-goofball',
    title: 'Certified Goofball',
    rarity: 'Epic',
    rarityColor: '#2563EB',
    rarityTextCol: '#FFFFFF',
    badge: '◆ EPIC',
    tagline: 'Refuses to take a serious photo',
    stats: [
      { label: 'SILLINESS', value: 99 },
      { label: 'PHOTOGENIC', value: 86 },
      { label: 'CHAOS', value: 88 },
      { label: 'SERIOUSNESS', value: 8 },
    ],
    quote: 'Not a single normal pose was taken today, and that is high art.',
    specialTrait: 'Infectious Giggles',
  },
  {
    id: 'soft-human',
    title: 'Soft Human',
    rarity: 'Rare',
    rarityColor: '#DB2777',
    rarityTextCol: '#FFFFFF',
    badge: '● RARE',
    tagline: 'Warm smiles and cozy golden-hour vibes',
    stats: [
      { label: 'WHOLESOME', value: 97 },
      { label: 'COZY', value: 94 },
      { label: 'KINDNESS', value: 99 },
      { label: 'SARCASM', value: 12 },
    ],
    quote: 'Radiates the comforting energy of fresh warm cookies.',
    specialTrait: 'Certified Comfort Person',
  },
  {
    id: 'professional-yapper',
    title: 'Professional Yapper',
    rarity: 'Common',
    rarityColor: '#059669',
    rarityTextCol: '#FFFFFF',
    badge: '■ COMMON',
    tagline: 'Talking throughout the entire 3-second countdown',
    stats: [
      { label: 'YAPPING', value: 99 },
      { label: 'LAUGHTER', value: 93 },
      { label: 'STILLNESS', value: 14 },
      { label: 'ENERGY', value: 90 },
    ],
    quote: 'Caught speaking mid-shutter in at least 3 out of 4 shots.',
    specialTrait: 'Never Out of Stories',
  },
  {
    id: 'romantic-disaster',
    title: 'Romantic Disaster',
    rarity: 'Rare',
    rarityColor: '#E11D48',
    rarityTextCol: '#FFFFFF',
    badge: '● RARE',
    tagline: 'Clumsy flirt with undeniable charm',
    stats: [
      { label: 'CHARM', value: 92 },
      { label: 'CLUMSY', value: 94 },
      { label: 'ROMANCE', value: 89 },
      { label: 'COORDINATION', value: 22 },
    ],
    quote: 'Tripped into the frame, blinked twice, but still looked stunning.',
    specialTrait: 'Heartthrob By Mistake',
  },
  {
    id: 'golden-retriever',
    title: 'Golden Retriever Energy',
    rarity: 'Epic',
    rarityColor: '#D97706',
    rarityTextCol: '#FFFFFF',
    badge: '◆ EPIC',
    tagline: 'Vibrating with pure joy and excitement',
    stats: [
      { label: 'JOY', value: 100 },
      { label: 'LOYALTY', value: 99 },
      { label: 'BOUNCING', value: 95 },
      { label: 'CALM', value: 10 },
    ],
    quote: 'Cannot stand still for 2 seconds because life is just too exciting.',
    specialTrait: 'Ultimate Hype Friend',
  },
  {
    id: 'mysterious-stranger',
    title: 'Mysterious Stranger',
    rarity: 'Legendary',
    rarityColor: '#4F46E5',
    rarityTextCol: '#FFFFFF',
    badge: '★ LEGENDARY',
    tagline: 'Low-key aura that commands the whole room',
    stats: [
      { label: 'AURA', value: 97 },
      { label: 'SMOLDER', value: 92 },
      { label: 'MYSTERY', value: 96 },
      { label: 'WORDS', value: 15 },
    ],
    quote: 'Gave a piercing smolder to the webcam that shook the server.',
    specialTrait: 'Cinema Noir Protagonist',
  },
  {
    id: 'certified-icon',
    title: 'Certified Icon',
    rarity: 'Mythic',
    rarityColor: '#7C3AED',
    rarityTextCol: '#FFFFFF',
    badge: '✦ MYTHIC',
    tagline: 'Born to be framed and hung in the Louvre',
    stats: [
      { label: 'STYLE', value: 99 },
      { label: 'RIZZ', value: 98 },
      { label: 'PHOTOGENIC', value: 100 },
      { label: 'FLAWS', value: 0 },
    ],
    quote: 'Zero bad angles detected. The laws of physics do not apply here.',
    specialTrait: 'Immortal Vogue Material',
  },
  {
    id: 'sleep-deprived-legend',
    title: 'Sleep-Deprived Legend',
    rarity: 'Common',
    rarityColor: '#475569',
    rarityTextCol: '#FFFFFF',
    badge: '■ COMMON',
    tagline: 'Fueled by caffeine and delusion',
    stats: [
      { label: 'CAFFEINE', value: 98 },
      { label: 'DELIRIOUS', value: 92 },
      { label: 'SURVIVAL', value: 100 },
      { label: 'SLEEP', value: 12 },
    ],
    quote: 'Has not slept since Tuesday, but look at this photo quality!',
    specialTrait: 'Functioning Zombie Power',
  },
  {
    id: 'gremlin-mode',
    title: 'Gremlin Mode',
    rarity: 'Epic',
    rarityColor: '#0D9488',
    rarityTextCol: '#FFFFFF',
    badge: '◆ EPIC',
    tagline: 'Tiny menace with dangerous energy',
    stats: [
      { label: 'MISCHIEF', value: 99 },
      { label: 'CHAOS', value: 96 },
      { label: 'SNEAKY', value: 93 },
      { label: 'DECORUM', value: 5 },
    ],
    quote: 'Plotting world domination immediately after this shutter closes.',
    specialTrait: 'Unpredictable Chaos Factor',
  },
  {
    id: 'drama-queen',
    title: 'Drama Queen',
    rarity: 'Rare',
    rarityColor: '#C026D3',
    rarityTextCol: '#FFFFFF',
    badge: '● RARE',
    tagline: 'Life is a 3-act theatrical production',
    stats: [
      { label: 'THEATRICS', value: 99 },
      { label: 'EXPRESSION', value: 97 },
      { label: 'VOLUME', value: 92 },
      { label: 'CHILL', value: 14 },
    ],
    quote: 'Turned a 4-cut photobooth into an emotional rollercoaster.',
    specialTrait: 'Academy Award Nominee',
  },
];

/**
 * Helper: Sample image metrics from Data URL / Image URL on offscreen canvas
 */
function sampleImageMetrics(imgUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 32; // Small 32x32 for instantaneous <2ms analysis
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size);
        const data = imgData.data;
        let totalBrightness = 0;
        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          totalBrightness += (0.299 * r + 0.587 * g + 0.114 * b);
          totalRed += r;
          totalGreen += g;
          totalBlue += b;
        }

        const pixelCount = data.length / 4;
        const avgBrightness = (totalBrightness / pixelCount) / 2.55; // 0-100
        const warmth = Math.min(100, Math.max(0, ((totalRed / (totalGreen + totalBlue + 1)) - 0.5) * 100));

        resolve({
          brightness: Math.round(avgBrightness),
          warmth: Math.round(warmth),
          rawData: data,
        });
      } catch (err) {
        resolve({ brightness: 50, warmth: 50, rawData: null });
      }
    };
    img.onerror = () => resolve({ brightness: 50, warmth: 50, rawData: null });
    img.src = imgUrl;
  });
}

/**
 * Real Photo Visual Analyzer: Analyzes captured photos to determine personality based on
 * actual pose changes (motion variance), brightness, and color warmth!
 */
export async function analyzePhotosForPersonality(photoUrls = []) {
  if (!photoUrls || photoUrls.length === 0) {
    return generatePersonality();
  }

  try {
    const metrics = await Promise.all(photoUrls.map((url) => sampleImageMetrics(url)));
    
    // 1. Average Brightness (0-100)
    const avgBrightness = Math.round(
      metrics.reduce((acc, m) => acc + m.brightness, 0) / metrics.length
    );

    // 2. Average Color Warmth / Pink Tones (0-100)
    const avgWarmth = Math.round(
      metrics.reduce((acc, m) => acc + m.warmth, 0) / metrics.length
    );

    // 3. Pose & Motion Variance between consecutive shots (0-100)
    let totalPixelDiff = 0;
    let comparisons = 0;

    for (let i = 1; i < metrics.length; i++) {
      const d1 = metrics[i - 1].rawData;
      const d2 = metrics[i].rawData;
      if (d1 && d2) {
        let frameDiff = 0;
        for (let p = 0; p < d1.length; p += 8) { // Sample every 2nd pixel
          frameDiff += Math.abs(d1[p] - d2[p]);
        }
        totalPixelDiff += (frameDiff / (d1.length / 8)) / 2.55;
        comparisons++;
      }
    }

    const motionVariance = comparisons > 0
      ? Math.min(100, Math.round(totalPixelDiff / comparisons * 2.2))
      : 50;

    // Determine personality archetype based on real visual traits:
    let chosenId = 'chaotic-cutie';

    if (motionVariance >= 65 && avgWarmth >= 45) {
      chosenId = 'chaotic-cutie'; // High movement + warm smiles
    } else if (motionVariance >= 65) {
      chosenId = 'gremlin-mode'; // High chaotic movement
    } else if (motionVariance >= 55 && avgBrightness >= 60) {
      chosenId = 'golden-retriever'; // Energetic + bright
    } else if (motionVariance >= 50) {
      chosenId = 'certified-goofball'; // Lots of silly pose changes
    } else if (motionVariance < 35 && avgBrightness >= 55) {
      chosenId = avgWarmth >= 50 ? 'main-character' : 'certified-icon'; // Controlled, flawless poses
    } else if (avgBrightness < 45) {
      chosenId = motionVariance < 40 ? 'mysterious-stranger' : 'sleep-deprived-legend'; // Moody low-light
    } else if (avgWarmth >= 58) {
      chosenId = 'romantic-disaster'; // Romantic blush tones
    } else if (avgBrightness >= 65) {
      chosenId = 'soft-human'; // Bright, cozy lighting
    } else {
      chosenId = 'professional-yapper'; // Lively & expressive
    }

    const baseProfile = PERSONALITY_PROFILES.find((p) => p.id === chosenId) || PERSONALITY_PROFILES[0];

    // Compute tailored stats reflecting measured visual metrics!
    const tailoredStats = baseProfile.stats.map((st) => {
      let finalVal = st.value;
      if (st.label === 'CHAOS' || st.label === 'ENERGY' || st.label === 'SILLINESS' || st.label === 'MISCHIEF') {
        finalVal = Math.min(100, Math.max(20, Math.round((st.value * 0.5) + (motionVariance * 0.5))));
      } else if (st.label === 'CONFIDENCE' || st.label === 'STYLE' || st.label === 'PHOTOGENIC') {
        finalVal = Math.min(100, Math.max(30, Math.round((st.value * 0.6) + (avgBrightness * 0.4))));
      } else if (st.label === 'ROMANCE' || st.label === 'WHOLESOME' || st.label === 'CHARM') {
        finalVal = Math.min(100, Math.max(25, Math.round((st.value * 0.5) + (avgWarmth * 0.5))));
      }
      return {
        ...st,
        value: finalVal,
        bar: renderTextProgressBar(finalVal),
      };
    });

    return {
      ...baseProfile,
      stats: tailoredStats,
      measuredMetrics: {
        avgBrightness,
        avgWarmth,
        motionVariance,
      },
    };
  } catch (err) {
    return generatePersonality();
  }
}

/**
 * Generate deterministic pseudo-random integer from string seed
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get personality for a given session / photo set
 */
export function generatePersonality(seedString = null) {
  const seed = seedString || `${Date.now()}-${Math.random()}`;
  const num = hashString(String(seed));
  const profileIndex = num % PERSONALITY_PROFILES.length;
  const baseProfile = PERSONALITY_PROFILES[profileIndex];

  // Slightly vary stats based on seed for unique flavor
  const variedStats = baseProfile.stats.map((stat, i) => {
    const delta = ((num + i * 17) % 9) - 4; // -4 to +4
    const clamped = Math.max(10, Math.min(100, stat.value + delta));
    return {
      ...stat,
      value: clamped,
      bar: renderTextProgressBar(clamped),
    };
  });

  return {
    ...baseProfile,
    stats: variedStats,
    seed: seed,
  };
}

/**
 * Render visual text progress bar (e.g. ████████░░ 82%)
 */
export function renderTextProgressBar(percentage, totalBlocks = 10) {
  const filled = Math.round((percentage / 100) * totalBlocks);
  const empty = totalBlocks - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

