// Random floating decorations and doodle generator

const DECORATION_PALETTE = [
  // Emojis & Symbols
  { type: 'emoji', text: '♡', color: '#FF5E7E', size: 'text-xl' },
  { type: 'emoji', text: '✦', color: '#FFD166', size: 'text-lg' },
  { type: 'emoji', text: '✿', color: '#FF99C8', size: 'text-lg' },
  { type: 'emoji', text: '★', color: '#4D96FF', size: 'text-xl' },
  { type: 'emoji', text: '⚡', color: '#FFB703', size: 'text-lg' },
  { type: 'emoji', text: '✨', color: '#FFD166', size: 'text-lg' },
  { type: 'emoji', text: '🎀', color: '#FF85A1', size: 'text-xl' },
  { type: 'emoji', text: '🍓', color: '#FF4D6D', size: 'text-xl' },
  { type: 'emoji', text: '🐾', color: '#FF85A1', size: 'text-lg' },
  { type: 'emoji', text: '🌼', color: '#52B788', size: 'text-lg' },
  { type: 'emoji', text: '💌', color: '#A4133C', size: 'text-lg' },
  { type: 'emoji', text: '📌', color: '#E63946', size: 'text-lg' },
  { type: 'emoji', text: '✂️', color: '#6D6875', size: 'text-base' },

  // Handwritten / Playful Badges
  { type: 'badge', text: 'WOW! ✨', bg: '#FFD166', textCol: '#1E1E24' },
  { type: 'badge', text: '10/10 ★', bg: '#FF5E7E', textCol: '#FFFFFF' },
  { type: 'badge', text: 'LOOK HERE →', bg: '#4D96FF', textCol: '#FFFFFF' },
  { type: 'badge', text: 'BESTIES ♡', bg: '#FF85A1', textCol: '#FFFFFF' },
  { type: 'badge', text: 'OMG 😄', bg: '#6BCB77', textCol: '#1E1E24' },
  { type: 'badge', text: 'CERTIFIED ✓', bg: '#2B2D42', textCol: '#FFFFFF' },
  { type: 'badge', text: 'CONFIDENTIAL', bg: '#E63946', textCol: '#FFFFFF' },
  { type: 'badge', text: 'PURE VIBES ✦', bg: '#70D6FF', textCol: '#1E1E24' },
  { type: 'badge', text: 'CAUGHT IN 4K', bg: '#FFB703', textCol: '#1E1E24' },
  { type: 'badge', text: 'ICONIC 👑', bg: '#D946EF', textCol: '#FFFFFF' },
  { type: 'badge', text: 'NO CAP 🧢', bg: '#3B82F6', textCol: '#FFFFFF' },
  { type: 'badge', text: 'PURR-FECT 🐾', bg: '#FF85A1', textCol: '#FFFFFF' },
];

/**
 * Generate a randomized set of floating decorations for the photo strip
 */
export function generateRandomDecorations(count = 5) {
  const shuffled = [...DECORATION_PALETTE].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  // Position presets to distribute stickers aesthetically around corners and borders
  const positionSlots = [
    { top: '8%', left: '4%', defaultRotate: -12 },
    { top: '12%', right: '4%', defaultRotate: 10 },
    { top: '35%', left: '2%', defaultRotate: -8 },
    { top: '42%', right: '3%', defaultRotate: 14 },
    { top: '65%', left: '3%', defaultRotate: 6 },
    { top: '70%', right: '4%', defaultRotate: -10 },
    { top: '88%', left: '8%', defaultRotate: -5 },
    { top: '85%', right: '8%', defaultRotate: 12 },
  ].sort(() => 0.5 - Math.random());

  return selected.map((item, index) => {
    const slot = positionSlots[index % positionSlots.length];
    const rotateOffset = (Math.random() * 16) - 8; // -8deg to +8deg
    const totalRotate = (slot.defaultRotate || 0) + rotateOffset;

    return {
      id: `random-dec-${Date.now()}-${index}`,
      ...item,
      top: slot.top,
      left: slot.left,
      right: slot.right,
      rotate: Math.round(totalRotate),
      scale: 0.85 + Math.random() * 0.3, // 0.85 to 1.15
    };
  });
}
