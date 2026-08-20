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
 * Build reliable, crisp export options for html-to-image
 * Solves cut-off edges, margin-shift bugs on mobile / desktop, and ensures pixel-perfect output.
 */
function getExportOptions(elementNode, customPixelRatio = 2.5) {
  if (!elementNode) return {};

  const rect = elementNode.getBoundingClientRect();
  const width = Math.ceil(elementNode.offsetWidth || rect.width);
  const height = Math.ceil(elementNode.offsetHeight || rect.height);

  return {
    quality: 0.98,
    pixelRatio: customPixelRatio,
    cacheBust: true,
    skipAutoScale: true,
    width,
    height,
    style: {
      transform: 'none',
      margin: '0',
      left: '0',
      top: '0',
      right: 'auto',
      bottom: 'auto',
      maxWidth: 'none',
      maxHeight: 'none',
      width: `${width}px`,
      height: `${height}px`,
    },
  };
}

/**
 * Export a DOM node to high resolution PNG and trigger browser download
 */
export async function downloadPhotoStrip(elementNode, customName = null) {
  if (!elementNode) throw new Error('Target element not found');

  const options = getExportOptions(elementNode, 2.5);
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

  const options = getExportOptions(elementNode, 2.5);
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

  const options = getExportOptions(elementNode, 2.5);
  const blob = await toBlob(elementNode, options);
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
