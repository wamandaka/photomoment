import React, { useRef, useState, useCallback, useEffect } from 'react';
import { RotateCw, Maximize2, X, Trash2 } from 'lucide-react';

export default function DraggableItem({
  item,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  isExporting = false,
  containerRef,
}) {
  const itemRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isScaling, setIsScaling] = useState(false);

  const startDragPosRef = useRef({ x: 0, y: 0, startItemX: 0, startItemY: 0 });
  const startRotateRef = useRef({ startAngle: 0, initialRotation: 0, centerX: 0, centerY: 0 });
  const startScaleRef = useRef({ startDist: 0, initialScale: 1.0, centerX: 0, centerY: 0 });

  // 1. DRAG MOVEMENT (Pointer Down on Main Body)
  const handlePointerDownBody = (e) => {
    if (isExporting) return;
    e.stopPropagation();
    onSelect(item.id);

    const container = containerRef?.current || itemRef.current?.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    startDragPosRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      containerWidth: rect.width,
      containerHeight: rect.height,
      startItemX: item.x,
      startItemY: item.y,
    };

    setIsDragging(true);
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMoveBody = (e) => {
    if (!isDragging) return;
    e.stopPropagation();

    const { startX, startY, containerWidth, containerHeight, startItemX, startItemY } =
      startDragPosRef.current;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Convert pixel delta to percentage of container
    const deltaPercentX = (deltaX / containerWidth) * 100;
    const deltaPercentY = (deltaY / containerHeight) * 100;

    const newX = Math.max(2, Math.min(98, startItemX + deltaPercentX));
    const newY = Math.max(2, Math.min(98, startItemY + deltaPercentY));

    onUpdate(item.id, { x: newX, y: newY });
  };

  const handlePointerUpBody = (e) => {
    if (isDragging) {
      setIsDragging(false);
      e.target.releasePointerCapture?.(e.pointerId);
    }
  };

  // 2. ROTATION HANDLE
  const handlePointerDownRotate = (e) => {
    if (isExporting) return;
    e.stopPropagation();

    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const startAngle = (rad * 180) / Math.PI;

    startRotateRef.current = {
      centerX,
      centerY,
      startAngle,
      initialRotation: item.rotation || 0,
    };

    setIsRotating(true);
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMoveRotate = (e) => {
    if (!isRotating) return;
    e.stopPropagation();

    const { centerX, centerY, startAngle, initialRotation } = startRotateRef.current;
    const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const currentAngle = (rad * 180) / Math.PI;
    const diff = currentAngle - startAngle;

    let finalAngle = Math.round(initialRotation + diff);
    // Snap to 0°, 90°, 180°, 270° if within 4 degrees
    if (Math.abs(finalAngle % 90) < 4) {
      finalAngle = Math.round(finalAngle / 90) * 90;
    }

    onUpdate(item.id, { rotation: finalAngle });
  };

  const handlePointerUpRotate = (e) => {
    if (isRotating) {
      setIsRotating(false);
      e.target.releasePointerCapture?.(e.pointerId);
    }
  };

  // 3. SCALE / RESIZE HANDLE
  const handlePointerDownScale = (e) => {
    if (isExporting) return;
    e.stopPropagation();

    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    startScaleRef.current = {
      centerX,
      centerY,
      startDist: dist,
      initialScale: item.scale || 1.0,
    };

    setIsScaling(true);
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMoveScale = (e) => {
    if (!isScaling) return;
    e.stopPropagation();

    const { centerX, centerY, startDist, initialScale } = startScaleRef.current;
    const currentDist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (startDist > 0) {
      const ratio = currentDist / startDist;
      const newScale = Math.max(0.4, Math.min(3.0, Number((initialScale * ratio).toFixed(2))));
      onUpdate(item.id, { scale: newScale });
    }
  };

  const handlePointerUpScale = (e) => {
    if (isScaling) {
      setIsScaling(false);
      e.target.releasePointerCapture?.(e.pointerId);
    }
  };

  const showHandles = isSelected && !isExporting;

  return (
    <div
      ref={itemRef}
      onPointerDown={handlePointerDownBody}
      onPointerMove={handlePointerMoveBody}
      onPointerUp={handlePointerUpBody}
      onPointerCancel={handlePointerUpBody}
      style={{
        position: 'absolute',
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg) scale(${item.scale || 1.0})`,
        zIndex: isSelected ? 999 : item.zIndex || 50,
        touchAction: 'none',
      }}
      className={`select-none cursor-grab active:cursor-grabbing transition-shadow ${
        showHandles ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100 rounded-xl' : ''
      }`}
    >
      {/* DECORATION CONTENT */}
      <div className="relative group">
        {/* Type 1: Preset Sticker / Emoji */}
        {item.type === 'sticker' && (
          <div className="text-3xl sm:text-4xl drop-shadow-md select-none pointer-events-none filter saturate-110">
            {item.content}
          </div>
        )}

        {/* Type 2: Custom Text Stamp */}
        {item.type === 'text' && (
          <div
            style={{
              backgroundColor: item.bgColor || '#FFFFFF',
              color: item.textColor || '#000000',
              borderColor: item.hasBorder ? '#000000' : 'transparent',
            }}
            className={`px-2.5 py-1 rounded-xl border-2 shadow-neo-sm font-bold text-xs sm:text-sm whitespace-nowrap select-none pointer-events-none ${
              item.fontFamily || 'font-display'
            }`}
          >
            {item.content}
          </div>
        )}

        {/* Type 3: Uploaded PNG Image */}
        {item.type === 'image' && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 select-none pointer-events-none drop-shadow-md">
            <img
              src={item.content}
              alt={item.label || 'Custom Sticker'}
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* INTERACTIVE TRANSFORM CONTROLS (Hidden during export) */}
      {showHandles && (
        <>
          {/* Top Rotation Handle (🔄) */}
          <div
            onPointerDown={handlePointerDownRotate}
            onPointerMove={handlePointerMoveRotate}
            onPointerUp={handlePointerUpRotate}
            onPointerCancel={handlePointerUpRotate}
            style={{ touchAction: 'none' }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-content border-2 border-black shadow-neo-sm flex items-center justify-center cursor-alias hover:scale-110 active:scale-95 transition-transform"
            title="Drag to rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </div>

          {/* Top-Right Delete Handle (✕) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="absolute -top-3.5 -right-3.5 w-6 h-6 rounded-full bg-error text-white border-2 border-black shadow-neo-sm flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            title="Delete decoration"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Bottom-Right Scale Handle (⤡) */}
          <div
            onPointerDown={handlePointerDownScale}
            onPointerMove={handlePointerMoveScale}
            onPointerUp={handlePointerUpScale}
            onPointerCancel={handlePointerUpScale}
            style={{ touchAction: 'none' }}
            className="absolute -bottom-3.5 -right-3.5 w-6 h-6 rounded-full bg-secondary text-secondary-content border-2 border-black shadow-neo-sm flex items-center justify-center cursor-nwse-resize hover:scale-110 active:scale-95 transition-transform"
            title="Drag to resize / scale"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </>
      )}
    </div>
  );
}
