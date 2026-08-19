import React, { useState, useEffect } from 'react';
import { Camera, Palette, Volume2, VolumeX, Menu, X, Sparkles, Home, Play, Layout } from 'lucide-react';

const THEMES = [
  { id: 'photomoment', name: '🌸 Photomoment (Light)' },
  { id: 'photomomentDark', name: '🌙 Photomoment (Dark)' },
  { id: 'retro', name: '📻 Retro 90s' },
  { id: 'cyberpunk', name: '⚡ Cyberpunk' },
  { id: 'cupcake', name: '🧁 Cupcake' },
  { id: 'valentine', name: '💖 Valentine' },
  { id: 'pastel', name: '🎨 Pastel' },
  { id: 'nord', name: '❄️ Nord' },
  { id: 'synthwave', name: '🌆 Synthwave' },
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

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Sound Toggle */}
            <button
              onClick={onToggleAudio}
              className="btn btn-circle btn-xs sm:btn-sm btn-ghost border border-base-content/15 text-base-content hover:bg-base-200"
              title={isAudioMuted ? 'Unmute camera sound effects' : 'Mute sound effects'}
              aria-label="Toggle sound"
            >
              {isAudioMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-base-content/50" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              )}
            </button>

            {/* Theme Selector Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-xs sm:btn-sm rounded-xl btn-ghost border border-base-content/15 flex items-center gap-1 px-2 sm:px-2.5"
                title="Change DaisyUI Theme"
              >
                <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-content" />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                  Theme
                </span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow-neo-lg bg-base-100 rounded-2xl w-52 sm:w-56 max-w-[calc(100vw-2rem)] border-2 border-base-content/20 mt-2 max-h-80 overflow-y-auto"
              >
                <li className="menu-title text-xs uppercase tracking-wider font-extrabold text-base-content/60 px-3 py-1">
                  Select Theme
                </li>
                {THEMES.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => onThemeChange(t.id)}
                      className={`text-xs font-semibold rounded-xl flex items-center justify-between py-2 ${
                        currentTheme === t.id ? 'bg-primary text-primary-content font-bold' : ''
                      }`}
                    >
                      <span className="truncate">{t.name}</span>
                      {currentTheme === t.id && <span>✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Action Button */}
            {currentView !== 'photobooth' ? (
              <button
                onClick={() => onNavigate('photobooth')}
                className="btn btn-xs sm:btn-sm md:btn-md btn-neo-primary rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm px-2.5 sm:px-4"
                id="navbar-start-btn"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                <span className="hidden xs:inline">Start Photobooth</span>
                <span className="xs:hidden">Studio</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="btn btn-xs sm:btn-sm md:btn-md btn-neo-ghost rounded-xl sm:rounded-2xl flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs md:text-sm px-2.5 sm:px-4"
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Exit</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="btn btn-square btn-xs sm:btn-sm btn-ghost md:hidden border border-base-content/15 rounded-xl ml-0.5"
              aria-label="Toggle menu"
            >
              {drawerOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {drawerOpen && (
        <div className="md:hidden border-t-2 border-base-content/10 bg-base-100 p-4 space-y-3 shadow-neo animate-fade-in">
          <button
            onClick={() => handleNav('home', 'templates-section')}
            className="w-full btn btn-ghost justify-start rounded-xl font-bold text-sm"
          >
            <Layout className="w-4 h-4 mr-2 text-primary" />
            Templates Preview
          </button>
          <button
            onClick={() => handleNav('home', 'how-it-works-section')}
            className="w-full btn btn-ghost justify-start rounded-xl font-bold text-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-warning" />
            How It Works
          </button>
          <button
            onClick={() => handleNav('home', 'features-section')}
            className="w-full btn btn-ghost justify-start rounded-xl font-bold text-sm"
          >
            <Camera className="w-4 h-4 mr-2 text-accent" />
            Features
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('photobooth')}
              className="w-full btn btn-neo-primary rounded-2xl font-bold"
            >
              <Play className="w-4 h-4 fill-current mr-1" />
              Launch Photobooth
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
