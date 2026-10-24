import React, { useState } from 'react';
import { Volume2, Award, Sparkles, RefreshCw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INDIGENOUS_LANGUAGES } from '../data/languages';
import { boliAudio } from '../utils/audio';

export function StudentPlayground({ currentLangKey }) {
  const lang = INDIGENOUS_LANGUAGES[currentLangKey] || INDIGENOUS_LANGUAGES.santali;
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentModule = lang.modules[activeModuleIndex] || lang.modules[0];
  const quiz = currentModule.quiz;

  const handleSelectOption = (index) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
    setIsAnswerChecked(true);

    if (index === quiz.correctIndex) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      boliAudio.playVictory();

      // Trigger multi-color celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#22c55e', '#eab308', '#38bdf8']
      });
    } else {
      setStreak(0);
      boliAudio.playChime(300, 0.3); // Low tone for retry
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setActiveModuleIndex((prev) => (prev + 1) % lang.modules.length);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Top Gamification Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Student Arena • {lang.name} Learning Track
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            Interactive Bilingual Practice Quiz
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Stars Earned</p>
              <p className="text-sm font-black text-amber-300">{score} XP</p>
            </div>
          </div>

          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Current Streak</p>
              <p className="text-sm font-black text-emerald-400">{streak} 🔥</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Quiz Card */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Module Badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
            Module: {currentModule.title}
          </span>
          <button
            onClick={() => boliAudio.speakPhonetic(currentModule.phoneticEnglish)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all"
          >
            <Volume2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Listen Prompt</span>
          </button>
        </div>

        {/* Central Display Card (Visual + Native Script) */}
        <div className="text-center py-6 px-4 bg-slate-950/60 rounded-3xl border border-slate-800/80 mb-8">
          <div className="text-5xl sm:text-6xl mb-4 transform hover:scale-110 transition-transform cursor-pointer">
            {currentModule.icon}
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-olchiki tracking-wide">
            {currentModule.nativeScript}
          </p>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            Phonetic: <span className="text-slate-200 font-semibold">{currentModule.phoneticEnglish}</span>
          </p>
        </div>

        {/* The Question */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white text-center">
            {quiz ? quiz.question : 'What is the correct translation?'}
          </h3>
          <p className="text-xs text-slate-400 text-center mt-1">
            Tap the matching option to verify your answer
          </p>
        </div>

        {/* Options Grid */}
        {quiz && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === quiz.correctIndex;

              let buttonStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';
              if (isAnswerChecked) {
                if (isCorrect) {
                  buttonStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  buttonStyle = 'bg-rose-500/15 border-rose-500 text-rose-300 ring-2 ring-rose-500/30';
                } else {
                  buttonStyle = 'opacity-40 bg-slate-900 border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border text-base font-bold transition-all flex items-center justify-between ${buttonStyle}`}
                >
                  <span className="font-olchiki">{option}</span>
                  {isAnswerChecked && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Next Question / Feedback Bar */}
        {isAnswerChecked && (
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {selectedAnswer === quiz.correctIndex ? (
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Shabash! Perfect pronunciation and word match! 🎉
                </p>
              ) : (
                <p className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Almost there! Correct answer is: {quiz.options[quiz.correctIndex]}
                </p>
              )}
            </div>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
