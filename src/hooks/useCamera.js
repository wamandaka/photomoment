import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook to safely manage user webcam stream, permissions, device switching, and snapshots.
 */
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState('idle'); // 'idle' | 'requesting' | 'ready' | 'permission-denied' | 'not-found' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState('');
  const [facingMode, setFacingMode] = useState('user'); // 'user' | 'environment'
  const [isMirrored, setIsMirrored] = useState(true);

  // Enumerate available video inputs
  const enumerateDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');
      setDevices(videoInputs);
    } catch {
      // Ignore enumeration errors
    }
  }, []);

  // Stop current stream tracks cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('idle');
  }, []);

  // Start or restart webcam stream
  const startCamera = useCallback(async (preferredDeviceId = null, preferredFacing = null) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('error');
      setErrorMessage('Kamera tidak didukung oleh browser ini.');
      return;
    }

    setStatus('requesting');
    setErrorMessage('');

    // Stop existing stream first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    const currentFacing = preferredFacing || facingMode;
    const currentDeviceId = preferredDeviceId || activeDeviceId;

    const constraints = {
      video: currentDeviceId
        ? { deviceId: { exact: currentDeviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } }
        : { facingMode: currentFacing, width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: false,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(() => {});
          setStatus('ready');
        };
      } else {
        setStatus('ready');
      }

      await enumerateDevices();

      // Track active device ID if available
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const settings = videoTrack.getSettings();
        if (settings.deviceId) {
          setActiveDeviceId(settings.deviceId);
        }
      }
    } catch (err) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setStatus('permission-denied');
        setErrorMessage('Akses kamera ditolak. Silakan izinkan izin kamera di pengaturan browser.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setStatus('not-found');
        setErrorMessage('Kamera tidak ditemukan pada perangkat Anda.');
      } else {
        setStatus('error');
        setErrorMessage(err.message || 'Gagal mengakses kamera.');
      }
    }
  }, [facingMode, activeDeviceId, enumerateDevices]);

  // Flip between front/back facing camera
  const toggleFacingMode = useCallback(() => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    setIsMirrored(nextMode === 'user');
    startCamera(null, nextMode);
  }, [facingMode, startCamera]);

  // Toggle horizontal mirror
  const toggleMirror = useCallback(() => {
    setIsMirrored((prev) => !prev);
  }, []);

  // Switch specific device ID
  const switchDevice = useCallback((deviceId) => {
    setActiveDeviceId(deviceId);
    startCamera(deviceId, null);
  }, [startCamera]);

  // Take a high resolution snapshot from video element
  const captureSnapshot = useCallback(() => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    
    // Ensure video is playing and has dimensions
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    if (isMirrored) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);

    // Get high quality JPEG data URL
    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isMirrored]);

  // Auto clean up media stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    status,
    errorMessage,
    devices,
    activeDeviceId,
    facingMode,
    isMirrored,
    startCamera,
    stopCamera,
    captureSnapshot,
    toggleFacingMode,
    toggleMirror,
    switchDevice,
  };
}
