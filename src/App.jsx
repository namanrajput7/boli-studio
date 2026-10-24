import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TeacherStudio } from './components/TeacherStudio';
import { StudentPlayground } from './components/StudentPlayground';
import { ImpactDashboard } from './components/ImpactDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [currentLang, setCurrentLang] = useState('santali');
  const [activeTab, setActiveTab] = useState('studio');
  const [isOffline, setIsOffline] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        
        {/* Top Navigation */}
        <Navbar
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOffline={isOffline}
          setIsOffline={setIsOffline}
        />

        {/* Hackathon Live Badge */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-center">
          <p className="text-xs font-semibold text-amber-300 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>InnoSprint 2.0 Live Build • Track: Social Impact & Foundational Education • Powered by Antigravity</span>
          </p>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {activeTab === 'studio' && (
            <TeacherStudio currentLangKey={currentLang} isOffline={isOffline} />
          )}

          {activeTab === 'playground' && (
            <StudentPlayground currentLangKey={currentLang} />
          )}

          {activeTab === 'metrics' && (
            <ImpactDashboard />
          )}
        </main>

        {/* Bottom Footer */}
        <footer className="border-t border-slate-900 bg-[#060910] py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">BOLI (बोली) Studio</span>
              <span>• Indigenous Language Classroom Co-Pilot</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Santali (Ol Chiki) • Kurukh • Ho</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">NEP 2020 Aligned</span>
            </div>
          </div>
        </footer>

      </div>
    </ErrorBoundary>
  );
}
