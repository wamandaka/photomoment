import React from 'react';
import { FRAME_COLORS } from '../data/frames';
import { Palette, Check } from 'lucide-react';

export default function FrameSelector({ selectedFrame, onSelectFrame }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-secondary-content" />
          <span>Frame Color & Canvas</span>
        </label>
        <span className="text-[11px] font-mono font-semibold text-primary">
          {FRAME_COLORS.find((f) => f.id === selectedFrame)?.name}
        </span>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
        {FRAME_COLORS.map((frame) => {
          const isSelected = frame.id === selectedFrame;

          return (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame.id)}
              className={`p-2 sm:p-2.5 rounded-2xl border-2 text-left transition-all duration-150 flex items-center gap-2 sm:gap-2.5 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-neo-sm ring-2 ring-primary/30'
                  : 'border-base-content/15 bg-base-100 hover:border-base-content/40 hover:bg-base-200/50'
              }`}
            >
              <div
                style={{
                  backgroundColor: frame.hex,
                  borderColor: frame.borderHex || '#000000',
                }}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl border-2 shadow-xs shrink-0 flex items-center justify-center"
              >
                {isSelected && (
                  <Check
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    style={{ color: frame.textHex }}
                    strokeWidth={3}
                  />
                )}
              </div>

              <span className="text-[11px] sm:text-xs font-bold text-base-content truncate">
                {frame.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
