export const FILTERS = [
  {
    id: "original",
    name: "Original",
    cssClass: "filter-original",
    canvasFilter: "none",
    previewBg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    desc: "Natural camera look"
  },
  {
    id: "vintage",
    name: "Vintage",
    cssClass: "filter-vintage",
    canvasFilter: "sepia(35%) contrast(115%) brightness(105%) saturate(120%) hue-rotate(-8deg)",
    previewBg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    desc: "Warm nostalgic glow"
  },
  {
    id: "bw",
    name: "B & W",
    cssClass: "filter-bw",
    canvasFilter: "grayscale(100%) contrast(125%) brightness(102%)",
    previewBg: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    desc: "High-contrast monochrome"
  },
  {
    id: "warm",
    name: "Warm Sunset",
    cssClass: "filter-warm",
    canvasFilter: "sepia(20%) saturate(140%) brightness(108%) hue-rotate(-12deg)",
    previewBg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    desc: "Golden hour tint"
  },
  {
    id: "cool",
    name: "Cool Breeze",
    cssClass: "filter-cool",
    canvasFilter: "saturate(110%) brightness(102%) hue-rotate(15deg) contrast(105%)",
    previewBg: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    desc: "Fresh blue aesthetic"
  },
  {
    id: "retro",
    name: "90s Retro",
    cssClass: "filter-retro",
    canvasFilter: "contrast(120%) saturate(150%) sepia(15%) brightness(98%)",
    previewBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    desc: "Vibrant disposable cam"
  },
  {
    id: "pastel",
    name: "Pastel Dream",
    cssClass: "filter-pastel",
    canvasFilter: "brightness(112%) contrast(95%) saturate(135%)",
    previewBg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    desc: "Soft dreamlike tones"
  },
  {
    id: "cyberpunk",
    name: "Cyber Neon",
    cssClass: "filter-cyberpunk",
    canvasFilter: "contrast(130%) saturate(170%) hue-rotate(290deg) brightness(110%)",
    previewBg: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    desc: "Electric night vibes"
  },
  {
    id: "sepia",
    name: "Sepia Film",
    cssClass: "filter-sepia",
    canvasFilter: "sepia(85%) contrast(110%) brightness(95%)",
    previewBg: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    desc: "Antique storybook"
  }
];
