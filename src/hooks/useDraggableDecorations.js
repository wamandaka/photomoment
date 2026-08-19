import { useState, useCallback } from 'react';
import { generateRandomDecorations } from '../utils/randomDecorations';

/**
 * Custom hook to manage free-form draggable & transformable decorations
 */
export function useDraggableDecorations(initialDecorations = []) {
  const [decorations, setDecorations] = useState(initialDecorations);
  const [selectedId, setSelectedId] = useState(null);

  // Add a sticker from the preset library
  const addSticker = useCallback((sticker) => {
    // Stagger new stickers slightly near the upper-center of the canvas
    const offset = (Math.random() - 0.5) * 16;
    const newDec = {
      id: `sticker-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: 'sticker',
      content: sticker.emoji || sticker.label || '✨',
      label: sticker.name || sticker.label,
      image: sticker.image || null,
      x: 50 + offset, // Percentage (0-100)
      y: 40 + offset, // Percentage (0-100)
      scale: 1.0,
      rotation: Math.round((Math.random() - 0.5) * 20), // Slight natural angle (-10 to +10)
      zIndex: Date.now(),
    };

    setDecorations((prev) => [...prev, newDec]);
    setSelectedId(newDec.id);
    return newDec.id;
  }, []);

  // Add a custom text stamp (e.g. "BFF FOREVER ♡")
  const addTextStamp = useCallback(({
    text,
    fontFamily = 'font-display',
    textColor = '#000000',
    bgColor = '#FFFFFF',
    hasBorder = true,
  }) => {
    if (!text || !text.trim()) return null;

    const offset = (Math.random() - 0.5) * 12;
    const newDec = {
      id: `text-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: 'text',
      content: text.trim(),
      fontFamily,
      textColor,
      bgColor,
      hasBorder,
      x: 50 + offset,
      y: 50 + offset,
      scale: 1.0,
      rotation: Math.round((Math.random() - 0.5) * 14),
      zIndex: Date.now(),
    };

    setDecorations((prev) => [...prev, newDec]);
    setSelectedId(newDec.id);
    return newDec.id;
  }, []);

  // Add an uploaded custom PNG image sticker
  const addImageSticker = useCallback((dataUrl, name = 'Custom Sticker') => {
    if (!dataUrl) return null;

    const offset = (Math.random() - 0.5) * 12;
    const newDec = {
      id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: 'image',
      content: dataUrl,
      label: name,
      x: 50 + offset,
      y: 45 + offset,
      scale: 1.0,
      rotation: 0,
      zIndex: Date.now(),
    };

    setDecorations((prev) => [...prev, newDec]);
    setSelectedId(newDec.id);
    return newDec.id;
  }, []);

  // Update specific attributes of a decoration (position, scale, rotation)
  const updateDecoration = useCallback((id, updates) => {
    setDecorations((prev) =>
      prev.map((dec) => (dec.id === id ? { ...dec, ...updates } : dec))
    );
  }, []);

  // Bring decoration to front
  const bringToFront = useCallback((id) => {
    setDecorations((prev) =>
      prev.map((dec) => (dec.id === id ? { ...dec, zIndex: Date.now() } : dec))
    );
  }, []);

  // Remove a single decoration
  const removeDecoration = useCallback((id) => {
    setDecorations((prev) => prev.filter((dec) => dec.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  // Clear all active decorations
  const clearAllDecorations = useCallback(() => {
    setDecorations([]);
    setSelectedId(null);
  }, []);

  // Shuffle / Scatter random fun doodles and stamps
  const shuffleDecorations = useCallback((count = 5) => {
    const randomSet = generateRandomDecorations(count);
    const mapped = randomSet.map((item, idx) => ({
      id: `random-${Date.now()}-${idx}`,
      type: item.type || 'sticker',
      content: item.text || item.emoji || '✨',
      label: item.text || item.emoji || 'Doodle',
      fontFamily: 'font-mono font-bold',
      textColor: item.textColor || '#000000',
      bgColor: item.bgColor || 'transparent',
      hasBorder: !!item.bgColor,
      x: parseFloat(item.x) || (30 + (idx % 3) * 20),
      y: parseFloat(item.y) || (20 + idx * 14),
      scale: item.scale || 1.0,
      rotation: item.rotation || Math.round((Math.random() - 0.5) * 30),
      zIndex: Date.now() + idx,
    }));

    setDecorations(mapped);
    setSelectedId(null);
  }, []);

  return {
    decorations,
    setDecorations,
    selectedId,
    setSelectedId,
    addSticker,
    addTextStamp,
    addImageSticker,
    updateDecoration,
    bringToFront,
    removeDecoration,
    clearAllDecorations,
    shuffleDecorations,
  };
}
