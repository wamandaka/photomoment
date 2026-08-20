import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import {
  Sparkles,
  LayoutList,
  Image,
  Film,
  Square,
  LayoutGrid,
  FileSearch,
  Receipt,
  Gamepad2,
  Globe,
  Package,
  Cpu,
  MapPin,
  Flower2,
  Scissors,
  Mail,
  Heart,
  Smile,
  Camera,
  Newspaper,
} from 'lucide-react';

const ICON_MAP = {
  LayoutList,
  Image,
  Film,
  Square,
  Sparkles,
  LayoutGrid,
  FileSearch,
  Receipt,
  Gamepad2,
  Globe,
  Package,
  Cpu,
  MapPin,
  Flower2,
  Scissors,
  Mail,
  Heart,
  Smile,
  Camera,
  Newspaper,
};

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Concepts', label: '🕵️ Concepts' },
  { id: 'Cute', label: '🎀 Cute' },
  { id: 'Sweet', label: '🍓 Sweet' },
  { id: 'Retro', label: '📸 Retro' },
  { id: 'Popular', label: '★ Classic' },
];

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="space-y-3">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70">
          Photo Strip Template
        </label>
        <span className="text-[11px] font-mono font-semibold text-primary">
          {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`btn btn-xs rounded-xl font-bold whitespace-nowrap text-[10px] px-2.5 ${
              selectedCategory === cat.id
                ? 'btn-primary shadow-neo-sm'
                : 'btn-ghost border border-base-content/15 text-base-content/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid with max height & scrolling */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-h-72 overflow-y-auto pr-1">
        {filteredTemplates.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplate;
          const Icon = ICON_MAP[tmpl.iconName] || Sparkles;

          return (
            <button
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all duration-150 flex flex-col justify-between relative ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-neo-sm ring-2 ring-primary/30 font-bold'
                  : 'border-base-content/15 bg-base-100 hover:border-base-content/40 hover:bg-base-200/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-primary text-white' : 'bg-base-200 text-base-content/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                {tmpl.badge && (
                  <span className="text-[8px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.2 rounded border border-primary/20">
                    {tmpl.badge}
                  </span>
                )}
              </div>

              <div>
                <p className="text-[11px] sm:text-xs font-extrabold text-base-content tracking-tight truncate">
                  {tmpl.name}
                </p>
                <p className="text-[9px] sm:text-[10px] text-base-content/60 font-medium truncate">
                  {tmpl.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
