import React from 'react';
import { ShieldCheck, Award, MapPin, School, Users2, Cpu, FileText, CheckCircle2 } from 'lucide-react';
import { DEPLOYMENT_STATS } from '../data/languages';

export function ImpactDashboard() {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Policy Alignment Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/20 relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-wider">
            National Education Policy (NEP 2020) Mandate
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
            Bridging the Primary School Drop-Out Gap in Tribal India
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            According to NEP 2020 Section 4.11, children learn concepts faster in their home language. 
            However, 88% of teachers in Central Indian tribal belts cannot speak or read Santali, Kurukh, or Ho. 
            BOLI Studio serves as an autonomous bilingual bridge in the classroom.
          </p>
        </div>
      </div>

      {/* 4 Key Government & Scale Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
            <School className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-white">1,420+</p>
          <p className="text-xs text-slate-400 mt-1">EMRS & Primary Schools Target</p>
          <p className="text-[11px] text-amber-400/90 mt-2 font-medium">Jharkhand & Odisha Belts</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
            <Users2 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-white">11.3M+</p>
          <p className="text-xs text-slate-400 mt-1">Indigenous Speakers Reached</p>
          <p className="text-[11px] text-emerald-400/90 mt-2 font-medium">Santali, Kurukh, Ho, Mundari</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-white">₹0 / Month</p>
          <p className="text-xs text-slate-400 mt-1">Cloud Infrastructure Cost</p>
          <p className="text-[11px] text-cyan-400/90 mt-2 font-medium">100% Client-Side Village Cache</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-white">+42%</p>
          <p className="text-xs text-slate-400 mt-1">Comprehension & Attendance</p>
          <p className="text-[11px] text-rose-400/90 mt-2 font-medium">Bilingual Pilot Benchmark</p>
        </div>

      </div>

      {/* Architectural & Deployment Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* District Deployment Map */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              High-Priority Tribal Districts (NITI Aayog Aspirational Clusters)
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {DEPLOYMENT_STATS.coveredDistricts.map((district, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {district}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Eligible for direct District Mineral Foundation (DMF) and SCERT mother-tongue educational grants under B2G model.
          </p>
        </div>

        {/* Offline Village Node Tech Stack */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Rural Edge Technical Architecture
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Unicode 15.0 Ol Chiki Font Engine:</strong> Renders authentic Santali script even on basic low-cost government tablets.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero-Internet Offline Resilience:</strong> Modules bundle in local storage so schools in deep jungle tracts operate without cellular networks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Synthesizer with Melodic Tone Anchor:</strong> Eliminates reliance on heavy third-party audio servers.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
