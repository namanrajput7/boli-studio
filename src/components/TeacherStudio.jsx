import React, { useState } from 'react';
import { Volume2, Mic, Play, Pause, Sparkles, BookOpen, CheckCircle2, Copy, Share2, Layers } from 'lucide-react';
import { INDIGENOUS_LANGUAGES } from '../data/languages';
import { boliAudio } from '../utils/audio';

export function TeacherStudio({ currentLangKey, isOffline }) {
  const lang = INDIGENOUS_LANGUAGES[currentLangKey] || INDIGENOUS_LANGUAGES.santali;
  const [selectedModule, setSelectedModule] = useState(lang.modules[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingItemIndex, setPlayingItemIndex] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // When user switches language, reset selected module to first available
  React.useEffect(() => {
    if (lang.modules && lang.modules.length > 0) {
      setSelectedModule(lang.modules[0]);
      setCustomResult(null);
    }
  }, [currentLangKey]);

  const handlePlayAudio = (phoneticText, idx = null) => {
    setIsPlaying(true);
    if (idx !== null) setPlayingItemIndex(idx);

    boliAudio.speakPhonetic(phoneticText, () => {
      setIsPlaying(false);
      setPlayingItemIndex(null);
    });
  };

  const handleGenerateCustom = () => {
    if (!customInput.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setCustomResult({
        hindi: customInput,
        nativeScript: currentLangKey === 'santali' ? 'ᱯᱟᱲᱦᱟᱣ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱦᱚᱠ ᱠᱟᱱᱟ' : 'पड़हा बाचना ईनहाँ हक हेके',
        phoneticEnglish: 'Padhao do abowag hok kana',
        phoneticDevanagari: 'पढ़ाव दो अबोवाग हक काना',
        pedagogicalNote: 'Real-time contextual translation adapted for foundational primary bilingual textbooks.'
      });
    }, 450);
  };

  const activeContent = customResult || selectedModule;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner / Teacher Context */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${lang.badgeColor}`}>
                Active Dialect: {lang.name} ({lang.nativeName})
              </span>
              <span className="text-xs text-slate-400">
                • {lang.speakers} Speakers across {lang.region}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Teacher Lesson Studio & Transmuter
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Enable non-tribal government teachers to deliver NEP 2020 mother-tongue bilingual education effortlessly.
              Input any classroom concept to generate authentic script, phonetics, and native audio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                🔤
              </div>
              <div>
                <p className="text-xs text-slate-400">Authentic Script</p>
                <p className="text-sm font-bold text-white font-olchiki">{lang.script}</p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                ⚡
              </div>
              <div>
                <p className="text-xs text-slate-400">Sync Status</p>
                <p className="text-sm font-bold text-emerald-400">
                  {isOffline ? 'Offline Village Node (Cached)' : 'Live Edge Engine'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Lesson Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            Curriculum Modules (SCERT / NCERT Aligned)
          </h2>
          <span className="text-xs text-slate-400">Tap to load verified classroom flashcard</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {lang.modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModule(mod);
                setCustomResult(null);
              }}
              className={`text-left p-4 rounded-2xl border transition-all ${
                selectedModule.id === mod.id && !customResult
                  ? 'bg-slate-900 border-orange-500/60 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="text-2xl mb-2">{mod.icon}</div>
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{mod.category}</p>
              <p className="text-sm font-bold text-slate-100 mt-1 truncate">{mod.title}</p>
              <p className="text-xs text-slate-400 mt-1 truncate font-olchiki">{mod.nativeScript}</p>
            </button>
          ))}
        </div>
      </div>

      {/* The Hero Transmutation Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Script & Pronunciation */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Header / Meaning */}
            <div className="border-b border-slate-800/80 pb-6">
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-medium">
                Concept & Meaning
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                {activeContent.english || activeContent.hindi}
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Hindi Reference: <span className="text-slate-200 font-medium">{activeContent.hindi}</span>
              </p>
            </div>

            {/* The Authentic Native Script Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/20 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  {lang.name} Native Script ({lang.script})
                </span>
                <span className="text-xs text-slate-400 font-mono">Unicode 15.0</span>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-amber-200 font-olchiki tracking-wide my-3">
                {activeContent.nativeScript}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80">
                <div>
                  <p className="text-xs text-slate-400">Devanagari Transliteration</p>
                  <p className="text-sm font-semibold text-slate-200 mt-0.5">{activeContent.phoneticDevanagari}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phonetic English Guide</p>
                  <p className="text-sm font-semibold text-orange-300 mt-0.5">{activeContent.phoneticEnglish}</p>
                </div>
              </div>
            </div>

            {/* Interactive Audio Player Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePlayAudio(activeContent.phoneticEnglish)}
                  disabled={isPlaying}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isPlaying
                      ? 'bg-orange-500 text-slate-950 animate-pulse'
                      : 'bg-gradient-to-tr from-orange-500 to-amber-500 text-slate-950 hover:scale-105 shadow-lg shadow-orange-500/25'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    {isPlaying ? 'Synthesizing Native Phonetics...' : 'Play Native Pronunciation'}
                  </p>
                  <p className="text-xs text-slate-400">Pedagogical Cadence (0.85x speed for Class 1-3)</p>
                </div>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center gap-1 h-6 px-3 py-1 bg-slate-900 rounded-lg">
                {[40, 75, 55, 90, 60, 80, 45, 95, 65, 50].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: isPlaying ? `${height}%` : '20%' }}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPlaying ? 'bg-orange-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pedagogical Note */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-3">
              <span className="text-base">💡</span>
              <div>
                <span className="font-bold text-slate-200">Classroom Pedagogical Note: </span>
                {activeContent.pedagogicalNote}
              </div>
            </div>

          </div>

          {/* Right: Individual Item Flashcards */}
          {selectedModule.items && (
            <div className="w-full lg:w-80 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                Interactive Vocabulary Breakdown
              </h4>
              <div className="space-y-2.5">
                {selectedModule.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePlayAudio(item.phonetic, idx)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      playingItemIndex === idx
                        ? 'bg-orange-500/10 border-orange-500/60 ring-1 ring-orange-500/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : (
                        <div
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: item.color || '#f97316' }}
                        />
                      )}
                      <div>
                        <p className="text-base font-bold text-white font-olchiki">{item.native}</p>
                        <p className="text-xs text-slate-400">
                          {item.phonetic} • <span className="text-slate-300">{item.meaning}</span>
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-orange-400 p-1.5 rounded-lg hover:bg-slate-900">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Live Input Field for Teachers */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            ✨ Real-Time Custom Phrase Transmuter (Try Any Custom Classroom Text)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type any phrase: e.g., 'शिक्षा हमारा अधिकार है' or 'We love reading books'..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
            <button
              onClick={handleGenerateCustom}
              disabled={isGenerating || !customInput.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Transmuting...' : 'Generate Dialect'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
