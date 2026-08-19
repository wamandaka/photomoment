import React from 'react';
import { Camera, RefreshCw, FlipHorizontal, AlertCircle, VideoOff, Settings2 } from 'lucide-react';

export default function CameraPreview({
  videoRef,
  cameraStatus,
  errorMessage,
  onRetryCamera,
  isMirrored,
  onToggleMirror,
  onToggleFacing,
  devices = [],
  activeDeviceId,
  onSwitchDevice,
  countdown,
  isCapturing,
  flashTrigger,
  filterClass = 'filter-original',
}) {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 rounded-3xl overflow-hidden border-3 border-base-content shadow-neo-lg flex items-center justify-center select-none">
      
      {/* 1. Live Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-all duration-200 ${
          isMirrored ? 'scale-x-[-1]' : 'scale-x-1'
        } ${filterClass}`}
      />

      {/* 2. Shutter Flash Overlay */}
      {flashTrigger && (
        <div className="absolute inset-0 bg-white pointer-events-none z-30 animate-flash" />
      )}

      {/* 3. Large Countdown Overlay (3, 2, 1, 📸) */}
      {countdown !== null && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div
            key={countdown}
            className="animate-countdown flex flex-col items-center justify-center"
          >
            {countdown > 0 ? (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-neo-xl">
                <span className="font-display font-extrabold text-7xl sm:text-8xl tracking-tight">
                  {countdown}
                </span>
              </div>
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-secondary text-secondary-content flex items-center justify-center border-4 border-base-content shadow-neo-xl">
                <Camera className="w-16 h-16 sm:w-20 sm:h-20 animate-bounce" strokeWidth={2.5} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Camera Status Overlays (Loading / Errors / Permission Denied) */}
      {cameraStatus === 'requesting' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-900/90 text-neutral-content p-6 space-y-4 text-center">
          <div className="loading loading-spinner loading-lg text-primary" />
          <p className="font-bold text-base sm:text-lg">Mengakses kamera...</p>
          <p className="text-xs text-neutral-content/70">Pastikan Anda mengizinkan akses kamera pada browser</p>
        </div>
      )}

      {cameraStatus === 'permission-denied' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/95 text-neutral-content p-6 space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-error/20 text-error flex items-center justify-center border-2 border-error">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-lg text-white">Izin Kamera Ditolak</h4>
            <p className="text-xs text-neutral-content/70 max-w-sm">
              {errorMessage || 'Browser tidak memiliki izin untuk menggunakan kamera.'}
            </p>
          </div>
          <button
            onClick={onRetryCamera}
            className="btn btn-sm btn-neo-primary rounded-xl font-bold gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Coba Lagi
          </button>
        </div>
      )}

      {cameraStatus === 'not-found' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/95 text-neutral-content p-6 space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-warning/20 text-warning flex items-center justify-center border-2 border-warning">
            <VideoOff className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-lg text-white">Kamera Tidak Ditemukan</h4>
            <p className="text-xs text-neutral-content/70 max-w-sm">
              Pastikan webcam terhubung dan tidak sedang digunakan oleh aplikasi lain.
            </p>
          </div>
          <button
            onClick={onRetryCamera}
            className="btn btn-sm btn-neo-secondary rounded-xl font-bold gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Scan Ulang Kamera
          </button>
        </div>
      )}

      {/* 5. Floating Corner Controls (Mirror, Flip, Switch Device) */}
      {cameraStatus === 'ready' && !isCapturing && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          
          {/* Mirror Toggle */}
          <button
            onClick={onToggleMirror}
            className={`btn btn-circle btn-sm backdrop-blur-md border-2 border-white/20 text-white ${
              isMirrored ? 'bg-primary/80 hover:bg-primary' : 'bg-black/60 hover:bg-black/80'
            }`}
            title={isMirrored ? 'Disable Mirror' : 'Enable Mirror'}
            aria-label="Toggle Mirror"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Flip Front/Rear Camera (for mobile/tablet) */}
          <button
            onClick={onToggleFacing}
            className="btn btn-circle btn-sm bg-black/60 hover:bg-black/80 backdrop-blur-md border-2 border-white/20 text-white"
            title="Flip Camera"
            aria-label="Flip Camera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Multi-Device Dropdown (if more than 1 webcam available) */}
          {devices.length > 1 && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-circle btn-sm bg-black/60 hover:bg-black/80 backdrop-blur-md border-2 border-white/20 text-white"
                title="Select Camera Device"
              >
                <Settings2 className="w-4 h-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow-neo-lg bg-base-100 rounded-2xl w-60 border-2 border-base-content/20 text-base-content mt-2"
              >
                <li className="menu-title text-xs uppercase font-extrabold px-3 py-1">
                  Select Video Input
                </li>
                {devices.map((device, idx) => (
                  <li key={device.deviceId || idx}>
                    <button
                      onClick={() => onSwitchDevice(device.deviceId)}
                      className={`text-xs font-semibold rounded-xl py-2 ${
                        activeDeviceId === device.deviceId ? 'bg-primary text-primary-content font-bold' : ''
                      }`}
                    >
                      {device.label || `Camera ${idx + 1}`}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

      {/* Live Recording Badge */}
      {cameraStatus === 'ready' && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>LIVE CAM</span>
        </div>
      )}

    </div>
  );
}
