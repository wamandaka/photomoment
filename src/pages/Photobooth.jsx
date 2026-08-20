import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Sparkles, ArrowRight, RotateCcw, Layout, Settings2, Sliders, Volume2, Shield, Timer } from 'lucide-react';
import CameraPreview from '../components/CameraPreview';
import CaptureButton from '../components/CaptureButton';
import PhotoThumbnails from '../components/PhotoThumbnails';
import PhotoStrip from '../components/PhotoStrip';
import TemplateSelector from '../components/TemplateSelector';
import RetakeModal from '../components/RetakeModal';
import { SHOT_OPTIONS, TEMPLATES } from '../data/templates';
import { FILTERS } from '../data/filters';

export const COUNTDOWN_OPTIONS = [
  { seconds: 0, label: 'Instan', short: '0s' },
  { seconds: 3, label: '3 Detik', short: '3s' },
  { seconds: 5, label: '5 Detik', short: '5s' },
  { seconds: 10, label: '10 Detik', short: '10s' },
];

export default function Photobooth({
  camera,
  audioFx,
  capturedPhotos,
  onAddPhoto,
  onClearPhotos,
  onRetakeSinglePhoto,
  totalShots,
  onChangeTotalShots,
  selectedTemplate,
  onSelectTemplate,
  selectedFilter,
  selectedFrame,
  caption,
  dateText,
  showDate,
  onProceedToResult,
  onExitStudio,
}) {
  const [countdown, setCountdown] = useState(null); // null | number
  const [timerSeconds, setTimerSeconds] = useState(3); // 0 | 3 | 5 | 10
  const [isCapturing, setIsCapturing] = useState(false);
  const [flashTrigger, setFlashTrigger] = useState(false);
  const [retakeModalOpen, setRetakeModalOpen] = useState(false);

  const captureLoopAbortRef = useRef(false);

  // Initialize camera when entering photobooth studio
  useEffect(() => {
    camera.startCamera();
    return () => {
      // Stream stopped automatically on unmount
    };
  }, []);

  // Helper delay promise
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Sequence Capture Controller
  const startCaptureSequence = useCallback(async () => {
    if (camera.status !== 'ready' || isCapturing) return;

    setIsCapturing(true);
    captureLoopAbortRef.current = false;

    const remainingShotsNeeded = totalShots - capturedPhotos.length;
    let currentTotal = capturedPhotos.length;

    for (let s = 0; s < remainingShotsNeeded; s++) {
      if (captureLoopAbortRef.current) break;

      // Dynamic countdown if timerSeconds > 0
      if (timerSeconds > 0) {
        for (let c = timerSeconds; c >= 1; c--) {
          if (captureLoopAbortRef.current) break;
          setCountdown(c);
          audioFx.playTick(false);
          await sleep(950);
        }
      }

      if (captureLoopAbortRef.current) break;

      // Shutter snap moment
      setCountdown(0);
      audioFx.playTick(true);
      setFlashTrigger(true);
      audioFx.playSnap();

      const snapshotUrl = camera.captureSnapshot();
      if (snapshotUrl) {
        onAddPhoto(snapshotUrl);
        currentTotal++;
      }

      await sleep(350);
      setFlashTrigger(false);
      setCountdown(null);

      // Brief breather between shots if more shots remain
      if (s < remainingShotsNeeded - 1 && !captureLoopAbortRef.current) {
        await sleep(1200);
      }
    }

    setIsCapturing(false);
    setCountdown(null);

    // If sequence completed all shots, play celebration sound
    if (currentTotal >= totalShots) {
      audioFx.playSuccess();
    }
  }, [camera, isCapturing, totalShots, capturedPhotos.length, timerSeconds, audioFx, onAddPhoto]);

  // Handle single shot capture (if retaking or manual single shot)
  const handleSingleCapture = useCallback(async () => {
    if (camera.status !== 'ready' || isCapturing) return;

    setIsCapturing(true);

    if (timerSeconds > 0) {
      for (let c = timerSeconds; c >= 1; c--) {
        setCountdown(c);
        audioFx.playTick(false);
        await sleep(950);
      }
    }

    setCountdown(0);
    setFlashTrigger(true);
    audioFx.playSnap();

    const snapshotUrl = camera.captureSnapshot();
    if (snapshotUrl) {
      onAddPhoto(snapshotUrl);
    }

    await sleep(350);
    setFlashTrigger(false);
    setCountdown(null);
    setIsCapturing(false);
  }, [camera, isCapturing, timerSeconds, audioFx, onAddPhoto]);

  const allPhotosReady = capturedPhotos.length >= totalShots;
  const currentFilterObj = FILTERS.find((f) => f.id === selectedFilter) || FILTERS[0];

  const activeTemplateData = TEMPLATES.find((t) => t.id === selectedTemplate);
  const isFixedShots = Boolean(activeTemplateData?.fixedShots);
  const fixedShotCount = activeTemplateData?.fixedShots;

  // Enforce fixed shots if template requires it (e.g. Newspaper 2 shots)
  useEffect(() => {
    if (isFixedShots && totalShots !== fixedShotCount) {
      onChangeTotalShots(fixedShotCount);
    }
  }, [isFixedShots, fixedShotCount, totalShots, onChangeTotalShots]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fade-in">
      
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-base-content/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-primary font-bold text-xs">LIVE STUDIO</span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-base-content font-display tracking-tight">
              Photobooth Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-base-content/70 font-medium">
            Pose for the camera and capture your memories in high quality.
          </p>
        </div>

        {/* Studio Switchers (Shots & Countdown Timer) */}
        {!isCapturing && capturedPhotos.length === 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Shot Count Switcher (1 - 6) or Locked Fixed Shots */}
            {isFixedShots ? (
              <div className="flex items-center gap-1 bg-base-200/70 p-1 sm:p-1.5 rounded-2xl border-2 border-base-content/15 shadow-neo-sm">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-1.5 text-base-content/60">
                  Shots:
                </span>
                <span className="badge badge-primary font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-neo-sm">
                  🔒 {fixedShotCount} Shots ({activeTemplateData?.name?.split(' ')[0] || 'Fixed'})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-base-200/70 p-1 sm:p-1.5 rounded-2xl border-2 border-base-content/15 shadow-neo-sm">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-1.5 text-base-content/60">
                  Shots:
                </span>
                {SHOT_OPTIONS.map((opt) => (
                  <button
                    key={opt.count}
                    onClick={() => onChangeTotalShots(opt.count)}
                    className={`btn btn-xs sm:btn-sm rounded-xl font-bold transition-all ${
                      totalShots === opt.count
                        ? 'btn-primary shadow-neo-sm'
                        : 'btn-ghost text-base-content hover:bg-base-300'
                    }`}
                    title={opt.desc}
                  >
                    {opt.count}
                  </button>
                ))}
              </div>
            )}

            {/* Countdown Timer Switcher (0s, 3s, 5s, 10s) */}
            <div className="flex items-center gap-1 bg-base-200/70 p-1 sm:p-1.5 rounded-2xl border-2 border-base-content/15 shadow-neo-sm">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-1.5 text-base-content/60 flex items-center gap-1">
                <Timer className="w-3.5 h-3.5 text-primary" />
                <span>Timer:</span>
              </span>
              {COUNTDOWN_OPTIONS.map((t) => (
                <button
                  key={t.seconds}
                  onClick={() => setTimerSeconds(t.seconds)}
                  className={`btn btn-xs sm:btn-sm rounded-xl font-bold transition-all ${
                    timerSeconds === t.seconds
                      ? 'btn-primary shadow-neo-sm'
                      : 'btn-ghost text-base-content hover:bg-base-300'
                  }`}
                  title={`Hitung mundur ${t.label}`}
                >
                  {t.short}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Studio 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Live Camera & Primary Controls */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          
          {/* Camera Container */}
          <CameraPreview
            videoRef={camera.videoRef}
            cameraStatus={camera.status}
            errorMessage={camera.errorMessage}
            onRetryCamera={() => camera.startCamera()}
            isMirrored={camera.isMirrored}
            onToggleMirror={camera.toggleMirror}
            onToggleFacing={camera.toggleFacingMode}
            devices={camera.devices}
            activeDeviceId={camera.activeDeviceId}
            onSwitchDevice={camera.switchDevice}
            countdown={countdown}
            isCapturing={isCapturing}
            flashTrigger={flashTrigger}
            filterClass={currentFilterObj.cssClass}
          />

          {/* Capture Trigger Area */}
          <div className="card-neo p-4 sm:p-6 bg-base-100 space-y-4 sm:space-y-5">
            {!allPhotosReady ? (
              <CaptureButton
                onCapture={startCaptureSequence}
                isCapturing={isCapturing}
                disabled={camera.status !== 'ready'}
                currentCount={capturedPhotos.length}
                totalCount={totalShots}
                timerSeconds={timerSeconds}
              />
            ) : (
              <div className="text-center space-y-3 sm:space-y-4 py-2">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-success/20 text-success text-xs sm:text-sm font-extrabold border-2 border-success">
                  <Sparkles className="w-4 h-4" /> ALL {totalShots} PHOTOS CAPTURED!
                </div>
                <p className="text-xs sm:text-sm text-base-content/70 max-w-sm mx-auto">
                  Your photo strip is ready! Proceed to the editor to choose filters, frames, and download.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2">
                  <button
                    onClick={onProceedToResult}
                    id="proceed-to-editor-btn"
                    className="btn btn-md sm:btn-lg btn-neo-primary rounded-2xl w-full sm:w-auto px-6 sm:px-8 font-bold gap-2 text-sm sm:text-base shadow-neo-lg"
                  >
                    <span>Customize Memories</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setRetakeModalOpen(true)}
                    className="btn btn-sm sm:btn-md btn-neo-ghost rounded-2xl font-bold text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" /> Retake All
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnails row */}
            <div className="pt-3 sm:pt-4 border-t border-base-content/10">
              <PhotoThumbnails
                photos={capturedPhotos}
                totalShots={totalShots}
                currentShotIndex={capturedPhotos.length}
                isCapturing={isCapturing}
                onRetakeSingle={(idx) => onRetakeSinglePhoto(idx)}
                onClearAll={() => setRetakeModalOpen(true)}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Photo Strip Preview & Quick Customizers */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          {/* Live Strip Card */}
          <div className="card-neo p-4 sm:p-6 bg-base-200/50 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-primary" />
                <span>Live Strip Preview</span>
              </span>
              <span className="badge badge-sm badge-outline font-mono text-[10px] font-bold">
                {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
              </span>
            </div>

            {/* Photo Strip Component */}
            <div className="py-2 flex justify-center">
              <PhotoStrip
                photos={capturedPhotos}
                templateId={selectedTemplate}
                filterClass={currentFilterObj.cssClass}
                frameId={selectedFrame}
                caption={caption}
                dateText={dateText}
                showDate={showDate}
              />
            </div>

            {/* Proceed CTA if ready */}
            {allPhotosReady && (
              <button
                onClick={onProceedToResult}
                className="btn btn-md btn-neo-primary w-full rounded-2xl font-bold gap-2 shadow-neo"
              >
                <span>Edit & Download Photo Strip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Template Switcher Card */}
          <div className="card-neo p-5 bg-base-100">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={onSelectTemplate}
            />
          </div>

        </div>

      </div>

      {/* Retake Confirmation Modal */}
      <RetakeModal
        isOpen={retakeModalOpen}
        onClose={() => setRetakeModalOpen(false)}
        onConfirm={() => {
          onClearPhotos();
          setRetakeModalOpen(false);
        }}
        title="Reset Semua Foto?"
        message="Semua foto yang sudah diambil akan dihapus dan Anda dapat mengambil ulang foto baru dari awal."
      />

    </div>
  );
}
