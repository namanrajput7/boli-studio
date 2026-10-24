import React from 'react';
import { motion } from 'framer-motion';

const INK = '#1f1f1f';
const partners = [
  "Ministry of Tribal Affairs",
  "EMRS India",
  "SCERT Jharkhand",
  "AI4Bharat IndicTrans",
  "UNESCO Language Atlas"
];

export function MonsoonHero({ onLaunchStudio, onExploreDialects }) {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '680px', overflow: 'hidden' }}>
      
      {/* Background Video */}
      <video
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Subtle Cinematic Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.14) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.35) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.08) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Central Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16vh 24px 0' }}>
        
        {/* Eyebrow Pill */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgba(30, 30, 30, 0.85)',
            marginBottom: '22px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#f97316' }} />
          <span>NEP 2020 § 4.11 Mother-Tongue Mandate</span>
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.1rem, 5vw, 3.8rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: INK,
            maxWidth: '820px'
          }}
        >
          Empower every tribal child in the classroom
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
          style={{
            margin: '18px 0 0',
            maxWidth: '560px',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(35, 35, 35, 0.8)',
            fontWeight: 500
          }}
        >
          The offline-first AI co-pilot bridging 88% of non-tribal educators to <strong>Santali (Ol Chiki), Kurukh, Ho, and Mundari</strong> classrooms — with zero cloud dependency.
        </motion.p>

        {/* Dual Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '32px' }}
        >
          <motion.button
            onClick={onLaunchStudio}
            whileHover={{ scale: 1.04, background: '#ea580c' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 28px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              background: '#f97316',
              boxShadow: '0 8px 24px rgba(249, 115, 22, 0.35)',
              transition: 'background 0.2s ease'
            }}
          >
            Launch Classroom Studio
          </motion.button>

          <motion.button
            onClick={onExploreDialects}
            whileHover={{ scale: 1.04, background: 'rgba(255, 255, 255, 0.92)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 26px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              color: INK,
              border: '1px solid rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              transition: 'background 0.2s ease'
            }}
          >
            Explore Dialects & Script
          </motion.button>
        </motion.div>

      </div>

      {/* Institutional Policy Strip (Pinned to bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '20px 24px 28px',
          textAlign: 'center'
        }}
      >
        <p style={{
          margin: '0 0 14px',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.8)',
          textShadow: '0 1px 8px rgba(0, 0, 0, 0.6)'
        }}>
          Aligned with curriculum frameworks at
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '36px',
          flexWrap: 'wrap',
          maxWidth: '920px',
          margin: '0 auto'
        }}>
          {partners.map((name) => (
            <span
              key={name}
              style={{
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.01em',
                color: 'rgba(255, 255, 255, 0.88)',
                transition: 'color 0.25s ease',
                cursor: 'default',
                textShadow: '0 1px 10px rgba(0, 0, 0, 0.65)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)'; }}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
