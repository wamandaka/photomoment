import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Photobooth from './pages/Photobooth';
import Result from './pages/Result';
import { useCamera } from './hooks/useCamera';
import { useAudioFx } from './hooks/useAudioFx';
import { formatPhotoDate, getSamplePhotos } from './utils/photoProcessor';

export default function App() {
  // Navigation State: 'home' | 'photobooth' | 'result'
  const [currentView, setCurrentView] = useState('home');

  // DaisyUI Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('photomoment_theme') || 'photomoment';
  });

  // Photo Configuration & Captured State
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [totalShots, setTotalShots] = useState(4);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [selectedFrame, setSelectedFrame] = useState('white');
  const [caption, setCaption] = useState('Our little moment ♡');
  const [dateText, setDateText] = useState(() => formatPhotoDate());
  const [showDate, setShowDate] = useState(true);
  const [activeStickers, setActiveStickers] = useState([
    { id: 'heart', label: 'Heart', emoji: '♡', color: '#FF5E7E' },
    { id: 'sparkle', label: 'Sparkle', emoji: '✦', color: '#FFD166' }
  ]);

  // Hooks
  const camera = useCamera();
  const audioFx = useAudioFx();

  // Apply theme to document HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('photomoment_theme', theme);
  }, [theme]);

  // Clean up camera stream if navigating away from studio
  const handleNavigate = (view) => {
    if (currentView === 'photobooth' && view !== 'photobooth') {
      camera.stopCamera();
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add captured photo to array
  const handleAddPhoto = useCallback((photoUrl) => {
    setCapturedPhotos((prev) => [...prev, photoUrl]);
  }, []);

  // Clear all captured photos
  const handleClearPhotos = useCallback(() => {
    setCapturedPhotos([]);
  }, []);

  // Retake a specific photo slot
  const handleRetakeSinglePhoto = useCallback((index) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Start new session
  const handleTakeAnother = () => {
    setCapturedPhotos([]);
    handleNavigate('photobooth');
  };

  // Toggle Sticker
  const handleToggleSticker = (sticker) => {
    setActiveStickers((prev) => {
      const exists = prev.some((s) => s.id === sticker.id);
      if (exists) {
        return prev.filter((s) => s.id !== sticker.id);
      } else {
        if (prev.length >= 6) {
          // Limit max 6 stickers to avoid visual clutter
          return [...prev.slice(1), sticker];
        }
        return [...prev, sticker];
      }
    });
  };

  // Demo shortcut for quick testing or users without webcams
  const handleLoadDemoSession = (count = 4) => {
    const demos = getSamplePhotos(count);
    setCapturedPhotos(demos);
    setTotalShots(count);
    handleNavigate('result');
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isAudioMuted={audioFx.isMuted}
        onToggleAudio={audioFx.toggleMute}
        currentTheme={theme}
        onThemeChange={setTheme}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            onStartPhotobooth={() => handleNavigate('photobooth')}
            onSelectTemplate={(tmplId) => {
              setSelectedTemplate(tmplId);
              handleNavigate('photobooth');
            }}
          />
        )}

        {currentView === 'photobooth' && (
          <Photobooth
            camera={camera}
            audioFx={audioFx}
            capturedPhotos={capturedPhotos}
            onAddPhoto={handleAddPhoto}
            onClearPhotos={handleClearPhotos}
            onRetakeSinglePhoto={handleRetakeSinglePhoto}
            totalShots={totalShots}
            onChangeTotalShots={(cnt) => {
              setTotalShots(cnt);
              setCapturedPhotos([]);
            }}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            selectedFilter={selectedFilter}
            selectedFrame={selectedFrame}
            caption={caption}
            dateText={dateText}
            showDate={showDate}
            onProceedToResult={() => handleNavigate('result')}
            onExitStudio={() => handleNavigate('home')}
          />
        )}

        {currentView === 'result' && (
          <Result
            capturedPhotos={
              capturedPhotos.length > 0 ? capturedPhotos : getSamplePhotos(totalShots)
            }
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            selectedFrame={selectedFrame}
            onSelectFrame={setSelectedFrame}
            caption={caption}
            onCaptionChange={setCaption}
            dateText={dateText}
            onDateTextChange={setDateText}
            showDate={showDate}
            onToggleDate={() => setShowDate((prev) => !prev)}
            activeStickers={activeStickers}
            onToggleSticker={handleToggleSticker}
            onTakeAnother={handleTakeAnother}
            onBackToStudio={() => handleNavigate('photobooth')}
          />
        )}
      </main>

    </div>
  );
}
