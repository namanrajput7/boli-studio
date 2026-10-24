import React from 'react';
import { motion } from 'framer-motion';

const INK = '#1f1f1f';

export function MonsoonNavbar({ activeView, setActiveView, isOffline, setIsOffline, onLaunchStudio }) {
  const navLinks = [
    { label: "Studio", id: "studio" },
    { label: "Flashcards", id: "flashcards" },
    { label: "QuizLab", id: "quiz" },
    { label: "Dialects", id: "dialects" },
    { label: "NEP 2020", id: "policy" }
  ];

  return (
    <div style={{ position: 'fixed', top: '18px', left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          padding: '10px 24px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Brand */}
        <div 
          onClick={() => {
            setActiveView('studio');
            onLaunchStudio();
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '18px', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>
            BOLI
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316', background: 'rgba(249, 115, 22, 0.14)', padding: '2px 8px', borderRadius: '999px' }}>
            बोल-चाल
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (link.id === 'studio') {
                  onLaunchStudio();
                } else {
                  setActiveView(link.id);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '13px',
                fontWeight: 600,
                color: activeView === link.id ? INK : 'rgba(40, 40, 40, 0.72)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = INK; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = activeView === link.id ? INK : 'rgba(40, 40, 40, 0.72)'; }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Offline Village Node Status Pill */}
        <button
          onClick={() => setIsOffline(!isOffline)}
          title="Toggles between Live Cloud and Cached Offline Village Node"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: isOffline ? 'rgba(16, 185, 129, 0.18)' : 'rgba(0, 0, 0, 0.06)',
            border: isOffline ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700,
            color: isOffline ? '#065f46' : '#4b5563',
            transition: 'all 0.2s ease',
          }}
        >
          {isOffline ? (
            <>
              <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: '#10b981' }} />
              <span>Village Node (Offline)</span>
            </>
          ) : (
            <>
              <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: '#3b82f6' }} />
              <span>Cloud Active</span>
            </>
          )}
        </button>

      </motion.nav>
    </div>
  );
}
