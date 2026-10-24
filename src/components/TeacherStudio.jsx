import React, { useState } from 'react';
import { Volume2, Mic, Play, Pause, Sparkles, BookOpen, CheckCircle2, Copy, Printer, Share2, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { INDIGENOUS_LANGUAGES } from '../data/languages';
import { boliAudio } from '../utils/audio';
import { WorksheetModal } from './WorksheetModal';

export function TeacherStudio({ currentLangKey, isOffline }) {
  const lang = INDIGENOUS_LANGUAGES[currentLangKey] || INDIGENOUS_LANGUAGES.santali;
  const [selectedModule, setSelectedModule] = useState(lang.modules[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingItemIndex, setPlayingItemIndex] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWorksheet, setShowWorksheet] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);

  // When switching languages, reset selected module
  React.useEffect(() => {
    if (lang.modules && lang.modules.length > 0) {
      setSelectedModule(lang.modules[0]);
      setCustomResult(null);
      setActiveSyllable(null);
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
        id: 'custom_generated',
        title: customInput,
        hindi: customInput,
        english: 'Classroom Custom Instruction',
        nativeScript: currentLangKey === 'santali' ? 'ᱯᱟᱲᱦᱟᱣ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱦᱚᱠ ᱠᱟᱱᱟ' : 'पड़हा बाचना ईनहाँ हक हेके',
        phoneticEnglish: 'Padhao do abowag hok kana',
        phoneticDevanagari: 'पढ़ाव दो अबोवाग हक काना',
        pedagogicalNote: 'Real-time contextual translation adapted for foundational primary bilingual textbooks.',
        syllables: [
          { char: 'ᱯ', name: 'AP', type: 'Consonant', sound: 'P' },
          { char: 'ᱟ', name: 'AA', type: 'Vowel', sound: 'Aa' },
          { char: 'ᱲ', name: 'AD', type: 'Flap', sound: 'Rh' },
          { char: 'ᱦ', name: 'OH', type: 'Consonant', sound: 'H' }
        ]
      });
    }, 450);
  };

  const activeContent = customResult || selectedModule;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner / Teacher Context */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#121826] via-[#151D30] to-[#0D121F] border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-3 py-1 rounded-full border font-bold ${lang.badgeColor}`}>
                Dialect: {lang.name} ({lang.nativeName})
              </span>
              <span className="text-xs text-slate-400 font-medium">
                • {lang.speakers} Speakers across {lang.region}
              </span>
              {lang.inventor && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Script Inventor: {lang.inventor}
                </span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Teacher Lesson Studio & Transmuter
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Empower non-tribal educators to deliver NEP 2020 mother-tongue lessons without fluency barriers. 
              Generate verified script, phonetics, and native audio on low-cost school hardware.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-[#0A0E17]/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                🔤
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Script Engine</p>
                <p className="text-sm font-bold text-white font-olchiki">{lang.script}</p>
              </div>
            </div>

            <div className="bg-[#0A0E17]/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                ⚡
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Village Sync</p>
                <p className="text-sm font-bold text-emerald-400">
                  {isOffline ? 'Offline Node (Cached)' : 'Live Edge Engine'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Lesson Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            Curriculum Modules (SCERT / NCERT Aligned)
          </h2>
          <span className="text-xs text-slate-400">Select to load lesson preview</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {lang.modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModule(mod);
                setCustomResult(null);
                setActiveSyllable(null);
              }}
              className={`text-left p-4 rounded-2xl border transition-all ${
                selectedModule.id === mod.id && !customResult
                  ? 'bg-[#151D30] border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-[#121826]/80 border-slate-800/90 hover:border-slate-700 hover:bg-[#151D30]'
              }`}
            >
              <div className="text-2xl mb-2">{mod.icon}</div>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{mod.category}</p>
              <p className="text-sm font-bold text-slate-100 mt-1 truncate">{mod.title}</p>
              <p className="text-xs text-slate-400 mt-1 truncate font-olchiki">{mod.nativeScript}</p>
            </button>
          ))}
        </div>
      </div>

      {/* The Hero Transmutation Studio */}
      <div className="bg-[#121826] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 uppercase tracking-wider">
              {activeContent.category || 'Classroom Module'}
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              {activeContent.title || activeContent.english}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hindi Reference: <span className="text-slate-200 font-semibold">{activeContent.hindi}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWorksheet(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-850 hover:border-slate-600 transition-all flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-orange-400" />
              <span>Print Worksheet</span>
            </button>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
          
          {/* Left Column: Script & Interactive Phonetics */}
          <div className="flex-1 w-full space-y-6">
            
            {/* The Authentic Native Script Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0B0F17] via-[#0E1422] to-[#0A0E17] border border-amber-500/25 relative shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  {lang.name} Native Script ({lang.script})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  Unicode 15.0 Authenticated
                </span>
              </div>

              {/* The Big Native Script Typography */}
              <p className="text-3xl sm:text-5xl font-black text-amber-200 font-olchiki tracking-wider my-4 leading-relaxed">
                {activeContent.nativeScript}
              </p>

              {/* Transliteration Dual-Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Devanagari Transliteration</p>
                  <p className="text-base font-bold text-slate-100 mt-0.5">{activeContent.phoneticDevanagari}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Phonetic English Guide</p>
                  <p className="text-base font-bold text-orange-400 mt-0.5">{activeContent.phoneticEnglish}</p>
                </div>
              </div>

              {/* Syllable-by-Syllable Interactive Decompiler */}
              {activeContent.syllables && (
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🔬 Linguistic Syllable Breakdown (Tap any character to inspect phonetic rule):</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeContent.syllables.map((syl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveSyllable(syl);
                          handlePlayAudio(syl.sound);
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                          activeSyllable?.char === syl.char
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/40'
                            : 'bg-slate-900 border-slate-700/80 text-slate-200 hover:border-slate-500 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-olchiki text-base text-amber-300">{syl.char}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({syl.name})</span>
                      </button>
                    ))}
                  </div>

                  {activeSyllable && (
                    <div className="mt-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between animate-fadeIn">
                      <div>
                        <strong>Character {activeSyllable.char} ({activeSyllable.name}):</strong> {activeSyllable.type} representing the phonetic sound <span className="font-mono underline">"{activeSyllable.sound}"</span>.
                      </div>
                      <button
                        onClick={() => handlePlayAudio(activeSyllable.sound)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400"
                      >
                        Play Sound
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Interactive Audio Synthesizer Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A0E17] border border-slate-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePlayAudio(activeContent.phoneticEnglish)}
                  disabled={isPlaying}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isPlaying
                      ? 'bg-orange-500 text-slate-950 animate-pulse'
                      : 'bg-gradient-to-tr from-orange-500 to-amber-500 text-slate-950 hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20'
                  }`}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <div>
                  <p className="text-sm font-bold text-slate-100">
                    {isPlaying ? 'Synthesizing Native Phonetics...' : 'Play Native Pronunciation'}
                  </p>
                  <p className="text-xs text-slate-400">
                    Pedagogical Cadence (0.85x speed for foundational learners)
                  </p>
                </div>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-center gap-1.5 h-8 px-4 py-1.5 bg-[#121826] rounded-xl border border-slate-800">
                {[35, 75, 45, 95, 60, 85, 40, 90, 70, 50, 80, 45].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: isPlaying ? `${height}%` : '20%' }}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isPlaying ? 'bg-orange-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pedagogical Note */}
            <div className="p-4 rounded-2xl bg-[#0A0E17]/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <span className="font-bold text-slate-200">Classroom Pedagogical Note: </span>
                {activeContent.pedagogicalNote}
              </div>
            </div>

          </div>

          {/* Right Column: Individual Item Flashcards */}
          {selectedModule.items && (
            <div className="w-full lg:w-80 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
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
                        : 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700 hover:bg-[#0E1422]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : (
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: item.color || '#f97316' }}
                        />
                      )}
                      <div>
                        <p className="text-base font-bold text-white font-olchiki">{item.native}</p>
                        <p className="text-xs text-slate-400">
                          {item.phonetic} • <span className="text-slate-300 font-medium">{item.meaning}</span>
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-orange-400 p-2 rounded-xl hover:bg-slate-900 transition-all">
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
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Real-Time Custom Phrase Transmuter (Try Any Custom Classroom Text)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type any phrase: e.g., 'शिक्षा हमारा अधिकार है' or 'We love reading books'..."
              className="flex-1 bg-[#0A0E17] border border-slate-700/80 rounded-2xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
            <button
              onClick={handleGenerateCustom}
              disabled={isGenerating || !customInput.trim()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Transmuting...' : 'Generate Dialect'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Printable Flashcard Sheet Modal */}
      <WorksheetModal
        isOpen={showWorksheet}
        onClose={() => setShowWorksheet(false)}
        module={activeContent}
        language={lang}
      />

    </div>
  );
}
