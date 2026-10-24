# BOLI Studio

> Offline-first multilingual classroom co-pilot and linguistic translation engine for indigenous languages (**Santali, Kurukh, Ho, Mundari, Sadri**). Built for foundational bilingual education under NEP 2020.

[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Unicode](https://img.shields.io/badge/Unicode-15.0_Ol_Chiki-amber?style=flat-square)](https://unicode.org)
[![Offline](https://img.shields.io/badge/Edge_Node-Offline_First-10B981?style=flat-square)](https://github.com/namanrajput7/boli-studio)
[![License](https://img.shields.io/badge/License-Apache_2.0-slate?style=flat-square)](LICENSE)

---

## 1. Problem Definition & Architectural Scope

In tribal regions across Jharkhand, Odisha, West Bengal, and Chhattisgarh, foundational education (Grades 1–5) faces a structural medium-of-instruction bottleneck:

* **Instructional Mismatch:** Over 85% of primary educators appointed to government and Eklavya Model Residential Schools (EMRS) do not speak or read local indigenous dialects.
* **Cognitive Load:** First-generation tribal learners speak their home languages at home, leading to high comprehension loss and dropout rates when instructional materials are exclusively delivered in standard Hindi or English.
* **Connectivity Constraints:** Rural schools in remote forest belts frequently operate with zero or intermittent cellular coverage, ruling out cloud-dependent API architectures.

**BOLI Studio** addresses this by providing an offline-resilient, pedagogical lesson preparation workbench that adapts standard curriculum inputs into authentic indigenous scripts, phonetic reading guides, synthesized audio, interactive flashcards, and printable worksheets.

---

## 2. System Architecture

```
                       [Curriculum Input]
              (Textbook Sample / Manual / OCR / ASR)
                                │
                                ▼
                     ┌─────────────────────┐
                     │ BOLI Studio Engine  │
                     └──────────┬──────────┘
                                │
       ┌────────────────────────┴────────────────────────┐
       ▼                                                 ▼
[Live Model Pipeline]                           [Village Edge Node]
(FastAPI Server :8001)                          (Client-Side Offline Engine)
├── AI4Bharat IndicTrans2 (sat_Olck)            ├── Verified Curriculum Lexicon
├── Fine-tuned mT5 (kru_Deva)                   ├── Unicode 15.0 Script Validator
├── Linguistic Transfer Core (hoc, unr, sck)    ├── Syllable & Phonetic Decompiler
└── Meta MMS-TTS & Speech Engine                └── Synthetic Web Audio Oscillator
       │                                                 │
       └────────────────────────┬────────────────────────┘
                                │
                                ▼
                     [Classroom Presentation]
       ├── Interactive Multimodal Studio Canvas
       ├── Syllable-by-Syllable Pronunciation Inspector
       ├── Gamified Bilingual Practice Quiz (QuizLab)
       └── Exportable A4 Printable Worksheets with QR Codes
```

---

## 3. Supported Dialects & Engine Matrix

| Language | ISO Code | Native Script | Primary Script Engine | Spoken Synthesis Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Santali** | `sat` | ᱥᱟᱱᱛᱟᱲᱤ | Ol Chiki (`sat_Olck`) Unicode 15.0 | AI4Bharat Indic Parler / Web Audio |
| **Kurukh** | `kru` | कुड़ुख़ | Tolong Siki & Devanagari (`kru_Deva`) | Meta MMS-TTS (`mms-tts-kru`) |
| **Ho** | `hoc` | ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ | Warang Chiti / Devanagari (`hoc_Deva`) | Meta MMS-TTS (`mms-tts-hoc`) |
| **Mundari** | `unr` | मुंडारी | Devanagari (`unr_Deva`) | Meta MMS-TTS (`mms-tts-unr`) |
| **Sadri** | `sck` | सादरी | Devanagari (`sck_Deva`) | Morphological Transfer / Web Audio |

---

## 4. Technical Capabilities

### Pedagogical Transmutation
* **Unicode Script Enforcement:** Native rendering of Ol Chiki characters via Google Noto Sans Ol Chiki.
* **Dual Transliteration:** Generates parallel Devanagari and Latin phonetic annotations to allow non-native instructors to read aloud correctly.
* **Syllable Decompiler:** Isolates individual consonants, vowels, and glottal stops with targeted audio playback.

### Zero-Cloud Village Cache
* The client implements an automated offline resilience layer (`src/services/api.js`). If upstream API endpoints are unreachable, execution routes through the pre-indexed regional vocabulary matrix without throwing unhandled exceptions or breaking the interface.

### Classroom Artifact Generation
* **Physical Worksheets:** Generates high-contrast, printable A4 lesson sheets with character tracing lines and vocabulary mapping for schools without digital displays.
* **Interactive Evaluation:** Client-side bilingual quiz modules with real-time feedback loops.

---

## 5. Local Setup & Development

### Prerequisites
* Node.js `>= 18.0.0`
* npm `>= 9.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/namanrajput7/boli-studio.git

# Enter project directory
cd boli-studio

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be served at `http://127.0.0.1:5173`.

### Production Build

```bash
# Compile and optimize assets
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Policy Alignment & Compliance

* **NEP 2020 § 4.11:** Adheres to foundational mother-tongue / regional-language instruction mandates for early childhood education.
* **SCERT Framework:** Mapped to multilingual education (MLE) standards in Jharkhand, Odisha, and Chhattisgarh.
* **Aspirational Districts:** Targeted for low-resource deployments across Dumka, Ranchi, Mayurbhanj, West Singhbhum, and Bastar.

---

## 7. License

Distributed under the Apache 2.0 License. See `LICENSE` for details.
