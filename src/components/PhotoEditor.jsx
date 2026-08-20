import React, { useState, useRef } from 'react';
import {
  Wand2,
  Palette,
  Type,
  Sparkles,
  Smile,
  Calendar,
  Dices,
  Shuffle,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import FilterSelector from './FilterSelector';
import FrameSelector from './FrameSelector';
import TemplateSelector from './TemplateSelector';
import { STICKERS } from '../data/stickers';
import { getRandomFunnyCaption, FUNNY_CAPTIONS } from '../utils/funnyCaptions';

export default function PhotoEditor({
  selectedTemplate,
  onSelectTemplate,
  selectedFilter,
  onSelectFilter,
  selectedFrame,
  onSelectFrame,
  caption,
  onCaptionChange,
  dateText,
  onDateTextChange,
  showDate,
  onToggleDate,
  personality,
  showPersonalityBadge = true,
  onTogglePersonalityBadge,
  // Custom Draggable Decoration Props
  customDecorations = [],
  onAddSticker,
  onAddTextStamp,
  onAddImageSticker,
  onShuffleDecorations,
  onClearAllDecorations,
  // Backward compatible sticker toggle
  activeStickers = [],
  onToggleSticker,
}) {
  const [activeTab, setActiveTab] = useState('filters');
  const [decorSubTab, setDecorSubTab] = useState('library'); // 'library' | 'text' | 'upload'

  // Custom Text Stamp State
  const [customText, setCustomText] = useState('');
  const [customFont, setCustomFont] = useState('font-display');
  const [customColorIdx, setCustomColorIdx] = useState(0);

  const fileInputRef = useRef(null);

  const COLOR_PALETTES = [
    { label: 'White', bg: '#FFFFFF', text: '#000000', border: true },
    { label: 'Black', bg: '#18181B', text: '#FFFFFF', border: false },
    { label: 'Blush Pink', bg: '#FFE4E6', text: '#E11D48', border: true },
    { label: 'Royal Gold', bg: '#FEF3C7', text: '#92400E', border: true },
    { label: 'Neon Cyan', bg: '#CFFAFE', text: '#0891B2', border: true },
    { label: 'Pastel Mint', bg: '#DCFCE7', text: '#15803D', border: true },
    { label: 'Cyber Violet', bg: '#F3E8FF', text: '#7E22CE', border: true },
  ];

  const FONT_OPTIONS = [
    { id: 'font-display', label: 'Bold Modern', preview: 'Aa' },
    { id: 'font-handwriting', label: 'Handwritten', preview: '✍️' },
    { id: 'font-serif', label: 'Classic Serif', preview: '📜' },
    { id: 'font-mono', label: 'Arcade Mono', preview: '👾' },
  ];

  // Handle adding custom text stamp to canvas
  const handleAddTextStampSubmit = (e) => {
    e?.preventDefault();
    if (!customText.trim()) return;

    const palette = COLOR_PALETTES[customColorIdx];
    if (onAddTextStamp) {
      onAddTextStamp({
        text: customText.trim(),
        fontFamily: customFont,
        textColor: palette.text,
        bgColor: palette.bg,
        hasBorder: palette.border,
      });
      setCustomText('');
    }
  };

  // Handle uploaded PNG / Image
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      if (onAddImageSticker) {
        onAddImageSticker(loadEvt.target.result, file.name);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle random caption pick
  const handlePickRandomCaption = () => {
    const funny = getRandomFunnyCaption(selectedTemplate);
    onCaptionChange(funny);
  };

  return (
    <div className="card-neo p-4 sm:p-6 bg-base-100 space-y-5 sm:space-y-6 text-left">
      
      {/* 1. Main Tab Navigation Bar */}
      <div className="flex items-center justify-between border-b-2 border-base-content/10 pb-2.5 gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('filters')}
          className={`btn btn-xs sm:btn-sm rounded-xl font-bold gap-1 sm:gap-1.5 flex-1 px-1.5 sm:px-3 text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'filters'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>

        <button
          onClick={() => setActiveTab('frames')}
          className={`btn btn-xs sm:btn-sm rounded-xl font-bold gap-1 sm:gap-1.5 flex-1 px-1.5 sm:px-3 text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'frames'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Frames</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`btn btn-xs sm:btn-sm rounded-xl font-bold gap-1 sm:gap-1.5 flex-1 px-1.5 sm:px-3 text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'templates'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Layouts</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`btn btn-xs sm:btn-sm rounded-xl font-bold gap-1 sm:gap-1.5 flex-1 px-1.5 sm:px-3 text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'text'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Caption</span>
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`btn btn-xs sm:btn-sm rounded-xl font-bold gap-1 sm:gap-1.5 flex-1 px-1.5 sm:px-3 text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'stickers'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          <span>Decorate</span>
        </button>
      </div>

      {/* Tab 1: Filters */}
      {activeTab === 'filters' && (
        <div className="space-y-4 animate-fade-in">
          <FilterSelector
            selectedFilter={selectedFilter}
            onSelectFilter={onSelectFilter}
          />
        </div>
      )}

      {/* Tab 2: Frames */}
      {activeTab === 'frames' && (
        <div className="space-y-4 animate-fade-in">
          <FrameSelector
            selectedFrame={selectedFrame}
            onSelectFrame={onSelectFrame}
          />
        </div>
      )}

      {/* Tab 3: Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-4 animate-fade-in">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
          />
        </div>
      )}

      {/* Tab 4: Caption & Date */}
      {activeTab === 'text' && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-primary" />
                <span>Custom Caption</span>
              </label>
              <button
                onClick={handlePickRandomCaption}
                className="btn btn-xs btn-ghost text-primary font-bold text-[11px] gap-1 hover:bg-primary/10 rounded-lg"
                title="Dapatkan caption lucu acak"
              >
                <Dices className="w-3 h-3" />
                <span>Random Funny</span>
              </button>
            </div>
            <input
              type="text"
              value={caption}
              onChange={(e) => onCaptionChange(e.target.value)}
              placeholder="Our little moment ♡"
              maxLength={40}
              className="input input-sm sm:input-md input-bordered w-full rounded-2xl border-2 font-medium text-sm focus:border-primary"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-base-content/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Date Watermark</span>
              </label>
              <input
                type="checkbox"
                checked={showDate}
                onChange={onToggleDate}
                className="toggle toggle-primary toggle-sm"
              />
            </div>
            {showDate && (
              <input
                type="text"
                value={dateText}
                onChange={(e) => onDateTextChange(e.target.value)}
                placeholder="19 AUG 2026"
                maxLength={20}
                className="input input-sm input-bordered w-full rounded-xl border-2 font-mono text-xs focus:border-primary"
              />
            )}
          </div>

          {/* Personality Frame Stamp Toggle */}
          {personality && (
            <div className="space-y-2 pt-2 border-t border-base-content/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Personality Stamp di Bingkai</span>
                </label>
                <input
                  type="checkbox"
                  checked={showPersonalityBadge}
                  onChange={onTogglePersonalityBadge}
                  className="toggle toggle-primary toggle-sm"
                />
              </div>
              {showPersonalityBadge && (
                <div className="p-2 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-primary">
                    {personality.badge}
                  </span>
                  <span className="text-base-content/80 font-bold truncate ml-2">
                    {personality.title}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Interactive Custom Decorator & Drag-and-Drop */}
      {activeTab === 'stickers' && (
        <div className="space-y-4 animate-fade-in font-sans">
          
          {/* Quick Action Top Bar (Shuffle & Clear All) */}
          <div className="p-3 bg-secondary/15 rounded-2xl border-2 border-secondary/40 flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <p className="text-xs font-black text-base-content flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Drag & Drop Canvas Active</span>
              </p>
              <p className="text-[10px] text-base-content/70">
                {customDecorations.length > 0
                  ? `${customDecorations.length} stiker/teks aktif (geser & putar di foto)`
                  : 'Pilih stiker, ketik teks, atau upload gambar'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {customDecorations.length > 0 && onClearAllDecorations && (
                <button
                  type="button"
                  onClick={onClearAllDecorations}
                  className="btn btn-xs sm:btn-sm btn-ghost text-error rounded-xl font-bold text-xs gap-1 border border-error/30 hover:bg-error/10"
                  title="Hapus semua stiker"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Hapus</span>
                </button>
              )}

              {onShuffleDecorations && (
                <button
                  type="button"
                  onClick={() => onShuffleDecorations(5)}
                  className="btn btn-xs sm:btn-sm btn-neo-primary rounded-xl font-bold text-xs gap-1.5"
                  title="Acak doodle melayang"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{customDecorations.length > 0 ? 'Shuffle ✨' : 'DECORATE ✨'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Sub-tabs: Pustaka Stiker | Custom Teks Stamp | Upload PNG */}
          <div className="flex items-center gap-1 p-1 bg-base-200/80 rounded-xl border border-base-content/10">
            <button
              type="button"
              onClick={() => setDecorSubTab('library')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                decorSubTab === 'library'
                  ? 'bg-base-100 text-primary shadow-xs border border-base-content/10'
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <Smile className="w-3 h-3" />
              <span>Stiker Pustaka</span>
            </button>

            <button
              type="button"
              onClick={() => setDecorSubTab('text')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                decorSubTab === 'text'
                  ? 'bg-base-100 text-primary shadow-xs border border-base-content/10'
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <Type className="w-3 h-3" />
              <span>Custom Teks</span>
            </button>

            <button
              type="button"
              onClick={() => setDecorSubTab('upload')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                decorSubTab === 'upload'
                  ? 'bg-base-100 text-primary shadow-xs border border-base-content/10'
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>Upload PNG</span>
            </button>
          </div>

          {/* SUB-PANEL 1: PUSTAKA STIKER & EMOJI */}
          {decorSubTab === 'library' && (
            <div className="space-y-2 animate-fade-in">
              <p className="text-[11px] text-base-content/70 font-medium">
                💡 <em>Ketuk stiker untuk menempelkannya ke foto. Anda bisa menggeser, memutar, dan mengubah ukurannya bebas!</em>
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
                {STICKERS.map((stk) => (
                  <button
                    key={stk.id}
                    type="button"
                    onClick={() => {
                      if (onAddSticker) onAddSticker(stk);
                      else if (onToggleSticker) onToggleSticker(stk);
                    }}
                    className="p-2 rounded-2xl border-2 border-base-content/15 bg-base-100 hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all duration-150 flex flex-col items-center justify-center gap-1 shadow-xs"
                    title={`Tempelkan ${stk.label}`}
                  >
                    <span className="text-2xl">{stk.emoji || '🏷️'}</span>
                    <span className="text-[9px] font-extrabold truncate text-base-content w-full text-center">
                      {stk.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SUB-PANEL 2: CUSTOM TEXT STAMP */}
          {decorSubTab === 'text' && (
            <form onSubmit={handleAddTextStampSubmit} className="space-y-3 animate-fade-in">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-base-content/70">
                  Teks Stempel:
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Contoh: BESTIE FOREVER ♡"
                    maxLength={30}
                    className="input input-sm input-bordered flex-1 rounded-xl border-2 font-bold text-xs focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={!customText.trim()}
                    className="btn btn-sm btn-primary rounded-xl font-bold text-xs gap-1 shadow-neo-sm shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tempel</span>
                  </button>
                </div>
              </div>

              {/* Font Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-base-content/70">
                  Gaya Font:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCustomFont(f.id)}
                      className={`p-1.5 rounded-xl border-2 text-xs font-bold transition-all text-center ${
                        customFont === f.id
                          ? 'border-primary bg-primary/10 text-primary shadow-xs'
                          : 'border-base-content/15 bg-base-100 text-base-content/70 hover:border-base-content/30'
                      }`}
                    >
                      <div className={`${f.id} text-sm`}>{f.preview}</div>
                      <div className="text-[10px]">{f.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Badge Palette */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-base-content/70">
                  Warna Badge:
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {COLOR_PALETTES.map((pal, idx) => (
                    <button
                      key={pal.label}
                      type="button"
                      onClick={() => setCustomColorIdx(idx)}
                      style={{ backgroundColor: pal.bg, color: pal.text }}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-xs transition-transform ${
                        customColorIdx === idx ? 'scale-125 border-primary ring-2 ring-primary/40' : 'border-black/30'
                      }`}
                      title={pal.label}
                    >
                      {customColorIdx === idx && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* SUB-PANEL 3: UPLOAD PNG STICKER */}
          {decorSubTab === 'upload' && (
            <div className="space-y-3 animate-fade-in text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-primary/50 bg-primary/5 rounded-2xl cursor-pointer hover:bg-primary/10 hover:border-primary transition-all space-y-2 group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-base-content">
                    Klik untuk Upload Gambar / Stiker PNG
                  </p>
                  <p className="text-[10px] text-base-content/60">
                    Mendukung PNG transparan, JPG, WebP (Maks 5MB)
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-base-content/60 italic">
                Gambar yang diunggah akan langsung muncul di atas photo strip dan dapat digeser bebas.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
