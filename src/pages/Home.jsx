import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import TemplatesPreview from '../components/TemplatesPreview';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function Home({ onStartPhotobooth, onSelectTemplate }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow">
        <Hero
          onStartPhotobooth={() => onStartPhotobooth()}
          onSelectTemplate={(tmplId) => {
            onSelectTemplate(tmplId);
            onStartPhotobooth();
          }}
        />
        <HowItWorks onStartPhotobooth={() => onStartPhotobooth()} />
        <TemplatesPreview
          onSelectTemplate={(tmplId) => {
            onSelectTemplate(tmplId);
            onStartPhotobooth();
          }}
        />
        <Features />
      </main>
      <Footer onStartPhotobooth={() => onStartPhotobooth()} />
    </div>
  );
}
