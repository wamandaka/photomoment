import { toPng, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

/**
 * Trigger celebration confetti when exporting memories
 */
export function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5E7E', '#FFE066', '#4D96FF', '#6BCB77', '#FF99C8'],
    });
  } catch {
    // Ignore confetti failure
  }
}

/**
 * Get formatted filename `photobooth-YYYY-MM-DD.png`
 */
export function getExportFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `photobooth-${year}-${month}-${day}.png`;
}

/**
 * Export a DOM node to high resolution PNG and trigger browser download
 */
export async function downloadPhotoStrip(elementNode, customName = null) {
  if (!elementNode) throw new Error('Target element not found');

  // Options for crisp rendering
  const options = {
    quality: 0.98,
    pixelRatio: 2.5, // 2.5x high DPI export
    cacheBust: true,
    skipAutoScale: true,
    style: {
      transform: 'none',
      margin: '0',
    },
  };

  const dataUrl = await toPng(elementNode, options);
  const filename = customName || getExportFilename();

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  fireConfetti();
  return filename;
}

/**
 * Copy high-res photo strip PNG blob to system clipboard
 */
export async function copyPhotoStripToClipboard(elementNode) {
  if (!elementNode) throw new Error('Target element not found');
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API is not supported in this browser.');
  }

  const options = {
    quality: 0.98,
    pixelRatio: 2,
    cacheBust: true,
  };

  const blob = await toBlob(elementNode, options);
  if (!blob) throw new Error('Failed to generate image blob');

  const item = new ClipboardItem({ 'image/png': blob });
  await navigator.clipboard.write([item]);
}

/**
 * Share photo strip via Web Share API (mobile native share)
 */
export async function sharePhotoStrip(elementNode, title = 'Our Photobooth Memories') {
  if (!elementNode) throw new Error('Target element not found');
  if (!navigator.canShare) {
    throw new Error('Web Share API is not supported on this device.');
  }

  const blob = await toBlob(elementNode, { quality: 0.95, pixelRatio: 2 });
  if (!blob) throw new Error('Failed to generate image blob');

  const file = new File([blob], getExportFilename(), { type: 'image/png' });

  if (navigator.canShare({ files: [file] })) {
    await navigator.share({
      title: title,
      text: 'Check out our photobooth photos taken with PHOTOMOMENT! 📸✨',
      files: [file],
    });
    fireConfetti();
  } else {
    throw new Error('File sharing not supported.');
  }
}
