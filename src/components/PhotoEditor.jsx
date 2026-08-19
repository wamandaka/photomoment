import React, { useState } from 'react';
import { Wand2, Palette, Type, Sparkles, Smile, Calendar, Plus, X } from 'lucide-react';
import FilterSelector from './FilterSelector';
import FrameSelector from './FrameSelector';
import TemplateSelector from './TemplateSelector';
import { STICKERS } from '../data/stickers';

const CAPTION_SUGGESTIONS = [
  'Our little moment ♡',
  'Best day with besties ✨',
  'Photobooth memories 📸',
  'Forever & always 💕',
  'Say cheese! 😄✌️',
  'Unforgettable vibes 🌟',
  'Date night 2026 🌙',
];

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
  activeStickers = [],
  onToggleSticker,
}) {
  const [activeTab, setActiveTab] = useState('filters');

  return (
    <div className="card-neo p-5 sm:p-6 bg-base-100 space-y-6">
      
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b-2 border-base-content/10 pb-3 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('filters')}
          className={`btn btn-sm rounded-xl font-bold gap-1.5 flex-1 ${
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
          className={`btn btn-sm rounded-xl font-bold gap-1.5 flex-1 ${
            activeTab === 'frames'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Frames</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`btn btn-sm rounded-xl font-bold gap-1.5 flex-1 ${
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
          className={`btn btn-sm rounded-xl font-bold gap-1.5 flex-1 ${
            activeTab === 'stickers'
              ? 'btn-primary shadow-neo-sm'
              : 'btn-ghost text-base-content/70 hover:bg-base-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stickers</span>
        </button>
      </div>

      {/* Tab 1: Filters */}
      {activeTab === 'filters' && (
        <div className="space-y-6 animate-fade-in">
          <FilterSelector
            selectedFilter={selectedFilter}
            onSelectFilter={onSelectFilter}
          />
        </div>
      )}

      {/* Tab 2: Frames & Layouts */}
      {activeTab === 'frames' && (
        <div className="space-y-6 animate-fade-in">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
          />
          <div className="pt-2 border-t border-base-content/10">
            <FrameSelector
              selectedFrame={selectedFrame}
              onSelectFrame={onSelectFrame}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Caption & Date Stamp */}
      {activeTab === 'text' && (
        <div className="space-y-5 animate-fade-in">
          
          {/* Custom Caption Input */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-primary" />
              <span>Custom Caption</span>
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => onCaptionChange(e.target.value)}
              placeholder="Our little moment ♡"
              maxLength={40}
              className="input input-bordered w-full rounded-xl border-2 border-base-content/20 font-medium focus:border-primary"
            />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CAPTION_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => onCaptionChange(sug)}
                  className="btn btn-xs rounded-lg btn-ghost border border-base-content/15 font-semibold text-[11px] hover:bg-primary/10 hover:border-primary"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Date Stamp Toggle & Custom Date */}
          <div className="pt-3 border-t border-base-content/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-secondary-content" />
                <span>Show Date Stamp</span>
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
                className="input input-sm input-bordered w-full rounded-xl border-2 border-base-content/20 font-mono text-xs focus:border-primary"
              />
            )}
          </div>

        </div>
      )}

      {/* Tab 4: Stickers & Stamps */}
      {activeTab === 'stickers' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-primary" />
              <span>Tap to Add / Remove Stickers</span>
            </label>
            <span className="text-[11px] font-mono font-semibold text-primary">
              {activeStickers.length} active
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
            {STICKERS.map((stk) => {
              const isAdded = activeStickers.some((s) => s.id === stk.id);

              return (
                <button
                  key={stk.id}
                  onClick={() => onToggleSticker(stk)}
                  className={`p-2.5 rounded-2xl border-2 transition-all duration-150 flex flex-col items-center justify-center gap-1 relative ${
                    isAdded
                      ? 'border-primary bg-primary/10 shadow-neo-sm ring-2 ring-primary/30'
                      : 'border-base-content/15 bg-base-100 hover:border-base-content/40 hover:bg-base-200/50'
                  }`}
                >
                  <span className="text-xl">{stk.emoji || '🏷️'}</span>
                  <span className="text-[10px] font-extrabold truncate text-base-content">
                    {stk.label}
                  </span>
                  {isAdded && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
