// Collection of funny, playful, and quirky photobooth captions
export const FUNNY_CAPTIONS = [
  'we actually look good',
  'this seemed like a good idea',
  'no thoughts, just vibes',
  'caught being happy',
  'proof that we went outside',
  'one more photo',
  'memory successfully downloaded',
  "we'll regret this later",
  'main character moment',
  "please don't zoom in",
  'running on 2 hours of sleep',
  '100% candid definitely not staged',
  'evidence destroyed upon request',
  'professional photobooth tester',
  'caught in 4K looking iconic',
  'certified good decision',
  'smiling through the chaos',
  'definitely not thinking about snacks',
  'we understood the assignment',
  'unhinged but aesthetic',
  'flawless execution',
  'sponsored by iced coffee',
  'too iconic to be forgotten',
  'warning: extreme cuteness ahead',
  '10/10 would take photos again',
  'living rent-free in the photobooth',
];

export const TEMPLATE_SPECIFIC_CAPTIONS = {
  'wedding-love': [
    'TO HAVE & TO HOLD FOREVER 💍',
    'JUST MARRIED ♡ BEST DAY EVER',
    'MR & MRS • HAPPILY EVER AFTER ✨',
    'TWO HEARTS, ONE LOVE 💕',
    'WE SAID YES! 🥂💍',
    'LOCKED IN LOVE FOREVER 🔒',
  ],
  evidence: [
    'EXHIBIT A: HIGHLY SUSPICIOUS',
    'CAUGHT IN 4K • GUILTY OF FUN',
    'CONFIDENTIAL CASE FILE #0826',
    'NO ALIBI • PURE CHAOS',
    'CASE STATUS: UNRESOLVED',
  ],
  receipt: [
    'TOTAL: PRICELESS ♡',
    'THANK YOU FOR BEING HERE',
    'NO REFUNDS ON MEMORIES',
    'ORDER: 100% HAPPINESS',
    'PAID IN SMILES AND LAUGHS',
  ],
  'character-card': [
    'PLAYER 01 • READY TO BATTLE',
    'SPECIAL MOVE: MAXIMUM CHAOS',
    'LEVEL 99 ICONIC ENERGY',
    'STATS: OVERPOWERED & CUTE',
    'SUMMONED FROM THE MULTIVERSE',
  ],
  'parallel-universe': [
    'UNIVERSE #728194: ROCKSTAR YOU',
    'TIMELINE STABLE • YOU BUT WEIRDER',
    'MULTIVERSE VARIANT #04',
    'ANOMALY DETECTED: TOO HAPPY',
    'DIMENSIONAL SHIFT COMPLETE',
  ],
  collectible: [
    'COLLECTIBLE #0826 • 1ST EDITION',
    'MINT CONDITION • ULTRA RARE',
    'SERIES 2026: MAXIMUM RIZZ',
    'COLLECTOR ITEM • DO NOT OPEN',
    'AUTHENTICITY GUARANTEED',
  ],
  'brain-exe': [
    'ERROR 404: ADULTING NOT FOUND',
    'SOCIAL BATTERY: 37% & SINKING',
    'MEMORY BUFFER SAVED TO DISK ✓',
    'TASK FAILED SUCCESSFULLY',
    'SYSTEM OVERLOAD: TOO MUCH FUN',
  ],
  'memory-map': [
    'START 📍 ──► BEST TIME ──► THE END',
    'ROUTE SUMMARY: 100 MILES OF LAUGHS',
    'LOCATION: EXACTLY WHERE WE BELONG',
    'JOURNEY STEP #04 • COMPLETED',
    'DESTINATION: PURE HAPPINESS',
  ],
  kawaii: [
    'KAWAII CLUB • CERTIFIED CUTE 🎀',
    'SPARKLES, BOWS & SWEET MEMORIES',
    'IDOL PHOTOCARD MOMENT ✦',
  ],
  strawberry: [
    'BERRY SWEET & TASTY MOMENTS 🍓',
    'STRAWBERRY MILK VIBES 🍓🍰',
  ],
  teddy: [
    'COZY WITH TEDDY & YOU 🧸',
    'WARM HUGS & HONEY SMILES 🍯',
  ],
  'love-letter': [
    'TO HAVE & TO HOLD FOREVER 💌',
    'WITH ALL MY HEART & SOUL 💍',
  ],
  disposable: [
    'QUICKSNAP 35MM • SUMMER OF 98 📸',
    'FLASH ON • NO FILTERS NEEDED 🎞️',
  ],
  'flower-garden': [
    'BLOOMING WITH JOY & SUNSHINE 🌼',
    'FRESH AS A DAISY IN SPRING 🌿',
  ],
  scrapbook: [
    'CUT, TAPE & CHERISH FOREVER 📝',
    'SCRAPBOOK CHAPTER 2026 ✂️',
  ],
  cat: [
    'MEOW & PURR-FECT MOMENTS 🐾',
    'CERTIFIED CAT PERSON ฅ^•ﻌ•^ฅ',
  ],
};

/**
 * Get random funny caption (template tailored or general)
 */
export function getRandomFunnyCaption(templateId = null) {
  if (templateId && TEMPLATE_SPECIFIC_CAPTIONS[templateId]) {
    const list = TEMPLATE_SPECIFIC_CAPTIONS[templateId];
    // 60% chance to pick template specific, 40% general
    if (Math.random() < 0.6) {
      return list[Math.floor(Math.random() * list.length)];
    }
  }
  return FUNNY_CAPTIONS[Math.floor(Math.random() * FUNNY_CAPTIONS.length)];
}
