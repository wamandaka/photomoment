import React, { useState, useEffect } from 'react';
import { Camera, Palette, Volume2, VolumeX, Menu, X, Sparkles, Home, Play, Layout, ChevronDown } from 'lucide-react';

const THEMES = [
  { id: 'cat', name: '🐱 Meow Neko' },
  { id: 'photomoment', name: '🌸 Light Moment' },
  { id: 'photomomentDark', name: '🌙 Dark Moment' },
  { id: 'valentine', name: '💌 Valentine Love' },
  { id: 'garden', name: '🌼 Flower Garden' },
  { id: 'cupcake', name: '🍓 Strawberry Cupcake' },
  { id: 'autumn', name: '🧸 Teddy Autumn' },
  { id: 'retro', name: '📸 Retro 90s' },
  { id: 'pastel', name: '🎀 Pastel Kawaii' },
  { id: 'cyberpunk', name: '⚡ Cyberpunk' },
  { id: 'nord', name: '❄️ Nord Ice' },
  { id: 'synthwave', name: '🌆 Synthwave Neon' },
];

export default function Navbar({
  currentView,
  onNavigate,
  isAudioMuted,
  onToggleAudio,
  currentTheme,
  onThemeChange
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  // Close mobile drawer on navigation
  const handleNav = (view, anchorId = null) => {
    setDrawerOpen(false);
    onNavigate(view);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-md border-b-2 border-base-content/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none shrink-0"
            aria-label="PHOTOMOMENT Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-primary text-primary-content flex items-center justify-center border-2 border-base-content shadow-neo-sm group-hover:scale-105 transition-transform shrink-0">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-base-content font-display flex items-center gap-1">
                PHOTO<span className="text-primary">MOMENT</span>
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse" />
              </span>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-base-content/60 -mt-1 hidden xs:block">
                Digital Photobooth
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => handleNav('home', 'templates-section')}
              className="btn btn-ghost btn-sm text-sm font-semibold rounded-xl hover:bg-base-200"
            >
              <Layout className="w-4 h-4 mr-1 text-primary" />
              Templates
            </button>
            <button
              onClick={() => handleNav('home', 'how-it-works-section')}
              className="btn btn-ghost btn-sm text-sm font-semibold rounded-xl hover:bg-base-200"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNav('home', 'features-section')}
              className="btn btn-ghost btn-sm text-sm font-semibold rounded-xl hover:bg-base-200"
            >
              Features
            </button>
          </nav>

          {/* Desktop Right Action Controls (Hidden on mobile < md) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            
            {/* Sound Toggle */}
            <button
              onClick={onToggleAudio}
              className="btn btn-circle btn-sm btn-ghost border border-base-content/15 text-base-content hover:bg-base-200"
              title={isAudioMuted ? 'Unmute camera sound effects' : 'Mute sound effects'}
              aria-label="Toggle sound"
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 text-base-content/50" />
              ) : (
                <Volume2 className="w-4 h-4 text-primary" />
              )}
            </button>

            {/* Theme Selector Dropdown (Wide 2-Column Grid) */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-sm rounded-xl btn-ghost border-2 border-base-content/15 flex items-center gap-1.5 px-3 hover:border-primary transition-colors cursor-pointer"
                title="Ganti Tema UI"
              >
                <Palette className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-extrabold max-w-[110px] truncate">
                  {activeThemeObj.name.split(' ')[0]} {activeThemeObj.name.split(' ')[1]}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
              </label>
              <div
                tabIndex={0}
                className="dropdown-content z-50 p-3 shadow-neo-lg bg-base-100 rounded-3xl w-80 border-3 border-black mt-2 space-y-2"
              >
                <div className="flex items-center justify-between px-1 pb-1 border-b border-base-content/10">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-base-content/70 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-primary" />
                    <span>Pilih Tema UI ({THEMES.length})</span>
                  </span>
                  <span className="badge badge-xs badge-primary font-bold">
                    DaisyUI
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-0.5">
                  {THEMES.map((t) => {
                    const isActive = currentTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => onThemeChange(t.id)}
                        className={`text-left p-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                          isActive
                            ? 'bg-primary text-primary-content border-black shadow-xs font-black'
                            : 'bg-base-200/60 text-base-content hover:bg-base-300 border-base-content/10'
                        }`}
                      >
                        <span className="truncate">{t.name}</span>
                        {isActive && <span className="ml-1 text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            {currentView !== 'photobooth' ? (
              <button
                onClick={() => onNavigate('photobooth')}
                className="btn btn-sm lg:btn-md btn-neo-primary rounded-2xl flex items-center gap-2 text-xs lg:text-sm px-4"
                id="navbar-start-btn"
              >
                <Sparkles className="w-4 h-4 fill-current shrink-0" />
                <span>Start Photobooth</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="btn btn-sm lg:btn-md btn-neo-ghost rounded-2xl flex items-center gap-1.5 text-xs lg:text-sm px-4"
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Exit Studio</span>
              </button>
            )}
          </div>

          {/* Mobile Only: Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="btn btn-circle btn-sm btn-ghost border-2 border-base-content/20 shadow-neo-sm text-base-content"
              aria-label="Toggle menu"
            >
              {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Full controls for mobile users) */}
      {drawerOpen && (
        <div className="md:hidden border-t-2 border-base-content/10 bg-base-100 p-4 space-y-4 shadow-neo animate-fade-in">
          
          {/* Main Action in Mobile Menu */}
          {currentView !== 'photobooth' ? (
            <button
              onClick={() => handleNav('photobooth')}
              className="w-full btn btn-md btn-neo-primary rounded-2xl font-bold flex items-center justify-center gap-2 shadow-neo"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Photobooth</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('home')}
              className="w-full btn btn-md btn-neo-ghost rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Exit Studio to Home</span>
            </button>
          )}

          {/* Navigation Links */}
          <div className="space-y-1 pt-1 border-t border-base-content/10">
            <button
              onClick={() => handleNav('home', 'templates-section')}
              className="w-full btn btn-ghost btn-sm justify-start rounded-xl font-bold text-sm"
            >
              <Layout className="w-4 h-4 mr-2 text-primary" />
              Templates Preview
            </button>
            <button
              onClick={() => handleNav('home', 'how-it-works-section')}
              className="w-full btn btn-ghost btn-sm justify-start rounded-xl font-bold text-sm"
            >
              <Sparkles className="w-4 h-4 mr-2 text-warning" />
              How It Works
            </button>
            <button
              onClick={() => handleNav('home', 'features-section')}
              className="w-full btn btn-ghost btn-sm justify-start rounded-xl font-bold text-sm"
            >
              <Camera className="w-4 h-4 mr-2 text-accent" />
              Features
            </button>
          </div>

          {/* Sound & Theme Controls in Mobile Menu */}
          <div className="pt-2 border-t border-base-content/10 space-y-3">
            
            {/* Audio Toggle Row */}
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-bold text-base-content/80 flex items-center gap-2">
                {isAudioMuted ? (
                  <VolumeX className="w-4 h-4 text-base-content/50" />
                ) : (
                  <Volume2 className="w-4 h-4 text-primary" />
                )}
                <span>Sound Effects</span>
              </span>
              <button
                onClick={onToggleAudio}
                className={`btn btn-xs rounded-xl font-bold ${
                  !isAudioMuted ? 'btn-primary' : 'btn-ghost border border-base-content/20'
                }`}
              >
                {!isAudioMuted ? 'ON' : 'MUTED'}
              </button>
            </div>

            {/* Theme Selector in Mobile Menu */}
            <div className="space-y-2 px-2">
              <span className="text-xs font-bold text-base-content/80 flex items-center gap-2">
                <Palette className="w-4 h-4 text-secondary-content" />
                <span>Choose Theme</span>
              </span>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-base-200/50 rounded-xl border border-base-content/10">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                    }}
                    className={`btn btn-xs justify-start rounded-lg text-[11px] font-semibold truncate ${
                      currentTheme === t.id
                        ? 'btn-primary font-bold'
                        : 'btn-ghost hover:bg-base-300'
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </header>
  );
}
