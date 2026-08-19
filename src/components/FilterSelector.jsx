import React from 'react';
import { FILTERS } from '../data/filters';
import { Wand2, Check } from 'lucide-react';

export default function FilterSelector({ selectedFilter, onSelectFilter }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-primary" />
          <span>Color & Aesthetic Filter</span>
        </label>
        <span className="text-[11px] font-mono font-semibold text-primary">
          {FILTERS.find((f) => f.id === selectedFilter)?.name}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {FILTERS.map((fil) => {
          const isSelected = fil.id === selectedFilter;

          return (
            <button
              key={fil.id}
              onClick={() => onSelectFilter(fil.id)}
              className={`p-1.5 sm:p-2 rounded-2xl border-2 text-center transition-all duration-150 relative overflow-hidden flex flex-col items-center gap-1 sm:gap-1.5 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-neo-sm ring-2 ring-primary/30 font-bold'
                  : 'border-base-content/15 bg-base-100 hover:border-base-content/40 hover:bg-base-200/50'
              }`}
            >
              {/* Color swatch circle preview */}
              <div
                style={{ background: fil.previewBg }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 shadow-inner flex items-center justify-center relative shrink-0"
              >
                {isSelected && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} />
                  </div>
                )}
              </div>

              <div className="w-full">
                <p className="text-[11px] sm:text-xs font-bold text-base-content truncate">
                  {fil.name}
                </p>
                <p className="text-[8px] sm:text-[9px] text-base-content/60 truncate">
                  {fil.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
