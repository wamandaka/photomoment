import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowLeft, RotateCcw, Heart, Dices, Download, Shuffle, Trash2 } from 'lucide-react';
import PhotoStrip from '../components/PhotoStrip';
import PhotoEditor from '../components/PhotoEditor';
import DownloadButton from '../components/DownloadButton';
import PersonalityCard from '../components/PersonalityCard';
import MysteryModal from '../components/MysteryModal';
import { FILTERS } from '../data/filters';
import { fireConfetti } from '../utils/downloadImage';
import { useDraggableDecorations } from '../hooks/useDraggableDecorations';

export default function Result({
  capturedPhotos,
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
  onRerollPersonality,
  onApplyMystery,
  onTakeAnother,
  onBackToStudio,
}) {
  const photoStripRef = useRef(null);
  const [isMysteryOpen, setIsMysteryOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPersonalityBadge, setShowPersonalityBadge] = useState(true);

  // Hook for interactive drag & drop custom decorations
  const {
    decorations: customDecorations,
    selectedId: selectedDecorationId,
    setSelectedId: setSelectedDecorationId,
    addSticker,
    addTextStamp,
    addImageSticker,
    updateDecoration,
    removeDecoration,
    clearAllDecorations,
    shuffleDecorations,
  } = useDraggableDecorations([]);

  // Trigger celebration confetti on page load
  useEffect(() => {
    fireConfetti();
  }, []);

  const currentFilterObj = FILTERS.find((f) => f.id === selectedFilter) || FILTERS[0];

  // Deselect any active sticker when clicking background
  const handleCanvasContainerClick = (e) => {
    if (e.target === e.currentTarget || e.target.id === 'export-photo-strip') {
      setSelectedDecorationId(null);
    }
  };

  return (
    <div
      onClick={handleCanvasContainerClick}
      className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fade-in"
    >
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-base-content/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-secondary font-extrabold text-xs">READY TO EXPORT</span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-base-content font-display tracking-tight flex items-center gap-1.5 sm:gap-2">
              Your Memories <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-current" />
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-base-content/70 font-medium">
            Customize layout, drag & drop stickers and text stamps freely, or unlock mystery results.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onBackToStudio}
            className="btn btn-xs sm:btn-sm btn-neo-ghost rounded-xl font-bold gap-1 text-xs flex-1 sm:flex-initial"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
          </button>
          <button
            onClick={onTakeAnother}
            className="btn btn-xs sm:btn-sm btn-neo-secondary rounded-xl font-bold gap-1 text-xs flex-1 sm:flex-initial"
          >
            <RotateCcw className="w-3.5 h-3.5" /> New Session
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Photo Strip Preview & Quick Playful Actions */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4 sm:space-y-5">
          
          {/* Quick Playful Action Toolbar */}
          <div className="w-full flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => shuffleDecorations(5)}
              className="btn btn-xs sm:btn-sm btn-neo-primary rounded-xl font-extrabold text-[11px] sm:text-xs gap-1.5 shadow-neo-sm"
              title="Scatter random playful stickers and doodles"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{customDecorations.length > 0 ? 'Shuffle ✨' : 'DECORATE ✨'}</span>
            </button>

            {/* Clear Decorations Button */}
            {customDecorations.length > 0 && (
              <button
                onClick={clearAllDecorations}
                className="btn btn-xs sm:btn-sm btn-neo-ghost text-error rounded-xl font-bold text-[11px] sm:text-xs gap-1 border border-error/30 hover:bg-error/10 shadow-neo-sm"
                title="Hapus semua stiker & teks"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus Stiker</span>
              </button>
            )}

            <button
              onClick={() => setIsMysteryOpen(true)}
              className="btn btn-xs sm:btn-sm btn-neo-secondary rounded-xl font-extrabold text-[11px] sm:text-xs gap-1.5 shadow-neo-sm"
              title="Surprise me with a mystery template & vibe"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>SURPRISE ME 🎲</span>
            </button>

            <button
              onClick={onBackToStudio}
              className="btn btn-xs sm:btn-sm btn-neo-ghost rounded-xl font-bold text-[11px] sm:text-xs gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>

          {/* Photo Strip Frame Container */}
          <div
            onClick={handleCanvasContainerClick}
            className="w-full flex justify-center p-3 xs:p-5 sm:p-8 bg-base-200/50 rounded-3xl border-2 border-base-content/15 shadow-inner relative"
          >
            <PhotoStrip
              ref={photoStripRef}
              photos={capturedPhotos}
              templateId={selectedTemplate}
              filterClass={currentFilterObj.cssClass}
              frameId={selectedFrame}
              caption={caption}
              dateText={dateText}
              showDate={showDate}
              customDecorations={customDecorations}
              selectedDecorationId={selectedDecorationId}
              onSelectDecoration={setSelectedDecorationId}
              onUpdateDecoration={updateDecoration}
              onRemoveDecoration={removeDecoration}
              isExporting={isExporting}
              personality={personality}
              showPersonalityBadge={showPersonalityBadge}
            />
          </div>

          {/* Photo Personality Card */}
          <div className="w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[320px]">
            <PersonalityCard
              personality={personality}
              onReroll={onRerollPersonality}
            />
          </div>

        </div>

        {/* Right Column: Editor & Download Actions */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          
          {/* Tabbed Photo Customizer with Interactive Drag & Drop Controls */}
          <PhotoEditor
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
            selectedFilter={selectedFilter}
            onSelectFilter={onSelectFilter}
            selectedFrame={selectedFrame}
            onSelectFrame={onSelectFrame}
            caption={caption}
            onCaptionChange={onCaptionChange}
            dateText={dateText}
            onDateTextChange={onDateTextChange}
            showDate={showDate}
            onToggleDate={onToggleDate}
            personality={personality}
            showPersonalityBadge={showPersonalityBadge}
            onTogglePersonalityBadge={() => setShowPersonalityBadge((prev) => !prev)}
            customDecorations={customDecorations}
            onAddSticker={addSticker}
            onAddTextStamp={addTextStamp}
            onAddImageSticker={addImageSticker}
            onShuffleDecorations={shuffleDecorations}
            onClearAllDecorations={clearAllDecorations}
          />

          {/* Download & Share Actions Card */}
          <div className="card-neo p-4 sm:p-6 bg-base-100 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-primary" />
                <span>Save Your Strip</span>
              </span>
              <span className="badge badge-sm badge-success font-bold text-white">
                PNG • 300 DPI
              </span>
            </div>

            <DownloadButton
              photoStripRef={photoStripRef}
              onTakeAnother={onTakeAnother}
              onBeforeExport={() => {
                setIsExporting(true);
                setSelectedDecorationId(null);
              }}
              onAfterExport={() => {
                setIsExporting(false);
              }}
            />
          </div>

        </div>

      </div>

      {/* Mystery Photobooth Modal */}
      <MysteryModal
        isOpen={isMysteryOpen}
        onClose={() => setIsMysteryOpen(false)}
        onApplyMystery={(mysteryResult) => {
          if (typeof onApplyMystery === 'function') {
            onApplyMystery(mysteryResult);
          }
          if (typeof shuffleDecorations === 'function') {
            shuffleDecorations(5);
          }
          setIsMysteryOpen(false);
        }}
      />
    </div>
  );
}
