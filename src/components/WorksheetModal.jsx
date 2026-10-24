import React from 'react';
import { X, Printer, Download, CheckCircle2, FileText, Share2 } from 'lucide-react';

export function WorksheetModal({ isOpen, onClose, module, language }) {
  if (!isOpen || !module) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Classroom Printable Worksheet</h3>
              <p className="text-xs text-slate-400">Bilingual Mother-Tongue Learning Sheet • NEP 2020</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Paper Card */}
        <div className="my-6 p-6 rounded-2xl bg-white text-slate-900 shadow-inner font-sans border border-slate-200">
          
          {/* School Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4">
            <div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                SCERT / Eklavya Multilingual Education (MLE)
              </p>
              <h4 className="text-xl font-extrabold text-slate-950">
                BOLI Bilingual Study Sheet: {module.title}
              </h4>
            </div>
            <div className="text-right text-xs text-slate-600 font-mono">
              <p>Language: <strong>{language.name}</strong></p>
              <p>Script: <strong>{language.script}</strong></p>
            </div>
          </div>

          {/* Student Info Fields */}
          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-700 mb-6 pb-3 border-b border-dashed border-slate-300">
            <p>Student Name (विद्यार्थी का नाम): ____________________</p>
            <p>Roll No (क्रमांक): ________  Date: ________</p>
          </div>

          {/* Large Script Headline */}
          <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
            <p className="text-xs uppercase font-bold text-slate-500 mb-1">Target Concept in Native Script</p>
            <p className="text-4xl font-extrabold font-olchiki text-slate-950 tracking-wider">
              {module.nativeScript}
            </p>
            <p className="text-sm font-semibold text-slate-700 mt-2">
              Phonetic: <span className="font-mono text-orange-600">{module.phoneticEnglish}</span> ({module.phoneticDevanagari})
            </p>
            <p className="text-xs text-slate-500 mt-1">Meaning: {module.english} ({module.hindi})</p>
          </div>

          {/* Vocabulary Trace & Practice Table */}
          {module.items && (
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Trace, Pronounce & Connect (लिखें और अभ्यास करें):
              </p>
              <div className="space-y-2">
                {module.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-400">{idx + 1}.</span>
                      <span className="text-lg font-bold font-olchiki text-slate-950 w-20">{item.native}</span>
                      <span className="font-mono text-slate-600">{item.phonetic}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-semibold text-slate-800">{item.meaning}</span>
                      <div className="w-28 border-b-2 border-dotted border-slate-400 text-[10px] text-slate-400 text-center">
                        Trace Here
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teacher Signature */}
          <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500">
            <p>Verified under NEP 2020 Bilingual Foundational Learning Guidelines.</p>
            <p>Teacher Signature: __________________</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-400">
            Ready to print on standard A4 paper for rural classrooms.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
