/**
 * Helper utility for photo aspect ratios, dimensions, and sample placeholders
 */

// Generate crisp, colorful SVG sample photos for template previewing
export function getSamplePhotos(count = 4) {
  const sampleColors = [
    { bg: '#FF9A9E', accent: '#FECFEF', text: 'Pose 1 ✌️', emoji: '✨' },
    { bg: '#A1C4FD', accent: '#C2E9FB', text: 'Pose 2 📸', emoji: '💖' },
    { bg: '#84FAB0', accent: '#8FD3F4', text: 'Pose 3 🥳', emoji: '🌟' },
    { bg: '#F6D365', accent: '#FDA085', text: 'Pose 4 😄', emoji: '🍀' },
    { bg: '#E0C3FC', accent: '#8EC5FC', text: 'Pose 5 🫶', emoji: '🎀' },
    { bg: '#FFD1FF', accent: '#FAD0C4', text: 'Pose 6 🥰', emoji: '🔥' },
  ];

  return Array.from({ length: count }, (_, idx) => {
    const item = sampleColors[idx % sampleColors.length];
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
      <defs>
        <linearGradient id="g${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${encodeURIComponent(item.bg)}" />
          <stop offset="100%" stop-color="${encodeURIComponent(item.accent)}" />
        </linearGradient>
      </defs>
      <rect width="600" height="750" fill="url(%23g${idx})" />
      <circle cx="300" cy="300" r="140" fill="white" opacity="0.25" />
      <circle cx="300" cy="270" r="80" fill="white" opacity="0.9" />
      <path d="M 180 500 Q 300 370 420 500" stroke="white" stroke-width="50" stroke-linecap="round" fill="none" opacity="0.9" />
      <text x="300" y="600" font-family="sans-serif" font-weight="bold" font-size="36" fill="white" text-anchor="middle" letter-spacing="1">${encodeURIComponent(item.text)}</text>
      <text x="520" y="80" font-size="44" text-anchor="middle">${encodeURIComponent(item.emoji)}</text>
    </svg>`;
  });
}

/**
 * Format current date string for photo strip caption (e.g. "AUG 19, 2026")
 */
export function formatPhotoDate(date = new Date()) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const d = date.getDate();
  const m = months[date.getMonth()];
  const y = date.getFullYear();
  return `${m} ${d}, ${y}`;
}
