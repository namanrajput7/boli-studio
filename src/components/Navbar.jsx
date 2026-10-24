import React from 'react';
import { Volume2, Wifi, WifiOff, Sparkles, BookOpen, GraduationCap, BarChart3, Globe } from 'lucide-react';
import { INDIGENOUS_LANGUAGES } from '../data/languages';

export function Navbar({ 
  currentLang, 
  setCurrentLang, 
  activeTab, 
  setActiveTab, 
  isOffline, 
  setIsOffline 
}) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-[2px] shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🗣️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  BOLI Studio
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold tracking-wider uppercase">
                  NEP 2020 Co-Pilot
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Mother-Tongue Classroom Studio for India's Indigenous Languages
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'studio'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/25 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Teacher Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'playground'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Arena</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'metrics'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-slate-950 shadow-md shadow-blue-500/25 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Impact & Policy</span>
            </button>
          </nav>

          {/* Language Selector & Village Node Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-slate-900 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer appearance-none"
              >
                {Object.values(INDIGENOUS_LANGUAGES).map((lang) => (
                  <option key={lang.id} value={lang.id} className="bg-slate-900 text-slate-200">
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Offline Village Node Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              title="Simulates Rural Connectivity. Toggles between cloud API and cached offline village node."
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isOffline
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {isOffline ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Village Node (Offline)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Cloud Connected</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
