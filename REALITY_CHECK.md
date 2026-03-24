# 🛡️ Reality Sheild — On-Device AI Guardian Against Deepfakes & Scams

> **HackXtreme Submission**  
> **Category:** 🌐 Web Applications — Problem Statement #2: Vision-Powered Web Applications  
> **Stack:** RunAnywhere SDK · React · Web (WebGPU/WebAssembly) · 100% Offline  
> **Starter Base:** [github.com/RunanywhereAI/web-starter-app](https://github.com/RunanywhereAI/web-starter-app)

---

## 🚨 The Problem

People can't tell what's real anymore.

| Threat | Real-World Impact |
|--------|-------------------|
| AI voice cloning scams | $2.7B lost in 2023 (FTC Report) |
| Deepfake video fraud | 3,000% increase year-over-year |
| Manipulated image scams | 1 in 4 social media images altered |
| Real-time scam calls | 68.4M Americans targeted in 2023 |

Existing detection tools fail people when it matters most:

- **Cloud-based** → 300–500ms latency. The scam call is already over.
- **Privacy nightmare** → Your voice recording gets uploaded to a server you don't control.
- **Internet-dependent** → No signal? No protection.
- **Expensive to scale** → $0.08–$0.35/min. Impossible to offer free to everyone who needs it.

**The real problem:** By the time someone realizes they've been deceived, the damage is done.

---

## 💡 Our Solution: Reality Sheild

**An on-device AI guardian that detects fake voices, manipulated images, and scam patterns — in real time, entirely on your device.**

Reality Sheild is a fully offline Progressive Web App powered by the **RunAnywhere SDK**. All AI inference runs locally in the browser via WebGPU/WebAssembly. No cloud. No API keys. No uploads. Ever.

### What it detects:

| Threat Type | How |
|-------------|-----|
| 🎙️ AI-cloned / synthetic voice | Local STT + LLM reasoning on audio transcript patterns |
| 🖼️ Manipulated / AI-generated images | RunAnywhere Vision model analyzing uploaded or camera images |
| 📞 Scam call scripts | LLM classifies live transcribed speech against known scam patterns |
| 🤖 Deepfake video frames | Vision model on sampled frames — no upload needed |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                Reality Sheild — React PWA                  │
│         (Forked from RunAnywhere web-starter-app)        │
├────────────────┬─────────────────┬───────────────────────┤
│  Voice Module  │  Vision Module  │   LLM Analysis Layer  │
│  (STT → LLM)  │ (Camera/Upload) │  (Scam Classification) │
├────────────────┴─────────────────┴───────────────────────┤
│              RunAnywhere SDK  (WebGPU / WASM)            │
│   STT: Whisper local  │  LLM: SmolLM2 / Llama local     │
│   Vision: Local VLM   │  TTS: Voice synthesis local      │
└──────────────────────────────────────────────────────────┘
       ↑ Everything runs client-side. Zero network calls.
```

### Why RunAnywhere SDK is the Right Tool Here

This problem *requires* local AI — not as a nice-to-have, but as a hard requirement:

| Requirement | Why Cloud Fails | Why RunAnywhere Wins |
|-------------|----------------|----------------------|
| Real-time call analysis | 300–400ms cloud lag = too late | Sub-100ms local inference |
| Voice privacy | Recording uploaded to server | Audio never leaves device |
| Always available | No signal = no protection | Offline-first by default |
| Cost at scale | $0.08–$0.35/min × users = unsustainable | $0.00 inference forever |
| User trust | "Is my voice being stored?" | Privacy by architecture |

---

## ⚡ Core Features

### 1. 🎙️ Live Voice & Call Scam Detector
**RunAnywhere SDK modules used:** `STT (Whisper)` + `LLM (SmolLM2)`

- Captures mic input via Web Audio API
- Transcribes speech locally using **RunAnywhere's on-device Whisper STT**
- Feeds transcript to **local LLM** with a scam-detection system prompt
- LLM flags urgency language, impersonation patterns, threat scripts
- Returns a **Trust Score** with plain-language explanation — instantly

```javascript
import { RunAnywhere } from '@runanywhere/sdk';

const ra = new RunAnywhere();
await ra.init();

// Step 1: Transcribe audio locally (Whisper on-device)
const transcript = await ra.stt.transcribe(audioBlob);

// Step 2: LLM classifies transcript for scam patterns
const result = await ra.llm.chat([
  {
    role: 'system',
    content: `You are a scam detection AI. Analyze the following phone call transcript.
    Flag: urgency language, impersonation, gift card requests, threat scripts, unusual asks.
    Respond ONLY in JSON: { "trustScore": 0-100, "riskLevel": "safe|suspicious|scam", "flags": [], "explanation": "" }`
  },
  { role: 'user', content: `Transcript: "${transcript}"` }
]);

const analysis = JSON.parse(result.content);
// { trustScore: 18, riskLevel: "scam", flags: ["urgency", "impersonation"], explanation: "..." }
```

---

### 2. 🖼️ Image Integrity Scanner
**RunAnywhere SDK modules used:** `Vision Model (VLM)`

- User uploads an image or uses camera
- **RunAnywhere's local vision model** analyzes it for manipulation signals
- LLM layer interprets vision output and explains findings in plain English
- No image ever leaves the browser

```javascript
// Analyze image with local vision model
const visionResult = await ra.vision.analyze(imageFile, {
  prompt: `Analyze this image for signs of AI generation or manipulation.
  Look for: unnatural textures, inconsistent lighting, facial artifacts,
  background anomalies, metadata mismatches.
  Respond ONLY in JSON: { "trustScore": 0-100, "isManipulated": bool, "signals": [], "explanation": "" }`
});
```

---

### 3. 📞 Real-Time Scam Call Monitor
**RunAnywhere SDK modules used:** `STT` + `LLM` + `TTS`

- Full voice pipeline: Speech → Transcription → LLM Analysis → Voice Alert
- Runs as an overlay during active calls
- Uses **RunAnywhere TTS** to speak warnings aloud ("⚠️ Possible scam detected")
- Hands-free — no screen interaction needed during a call

```javascript
// Complete voice pipeline via RunAnywhere
const pipeline = await ra.voicePipeline({
  onTranscript: async (text) => {
    const risk = await analyzeForScam(text); // local LLM call
    if (risk.level === 'high') {
      await ra.tts.speak(`Warning: ${risk.explanation}`); // local TTS alert
    }
  }
});
```

---

### 4. 🎥 Video Deepfake Frame Checker
**RunAnywhere SDK modules used:** `Vision Model`

- User uploads a short video clip (e.g., a suspicious video message)
- App samples frames client-side using Canvas API
- Each frame analyzed by **local vision model** for deepfake artifacts
- Aggregated Trust Score across all frames

---

### 5. 🔔 Universal Trust Score UI

Every scan produces a single **Trust Score (0–100)**:

```
╔══════════════════════════════════════╗
║         TRUST SCORE: 23 / 100        ║
║  ████████████░░░░░░░░░░░░░░   HIGH RISK ║
╠══════════════════════════════════════╣
║ ⚠️  Synthetic voice detected          ║
║ ⚠️  Urgency scripting identified      ║
║ ⚠️  Known scam pattern match: IRS     ║
╠══════════════════════════════════════╣
║  [  Block & Report  ]  [  Dismiss  ] ║
╚══════════════════════════════════════╝
```

- 🟢 **70–100** → Safe
- 🟡 **40–69** → Suspicious — proceed with caution
- 🔴 **0–39** → High Risk — likely fake or scam

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (forked from RunAnywhere web-starter-app) |
| On-device AI | RunAnywhere SDK (STT, LLM, Vision, TTS) |
| Audio capture | Web Audio API + MediaRecorder |
| Image/Video processing | Canvas API (client-side frame sampling) |
| State management | React Context + useReducer |
| Offline support | Service Worker + Cache API |
| Runtime | WebGPU (primary) → WebAssembly (fallback) |
| Storage | IndexedDB (scan history, local only) |

### RunAnywhere SDK Capabilities Used

| SDK Feature | Used For |
|------------|----------|
| `STT (Whisper)` | Live call transcription, voice memo analysis |
| `LLM (SmolLM2/Llama)` | Scam pattern classification, explanation generation |
| `Vision Model (VLM)` | Image manipulation detection, video frame analysis |
| `TTS` | Hands-free audio alerts during scam calls |
| `Voice Pipeline` | End-to-end call monitoring (STT → LLM → TTS) |

---

## 🚀 Getting Started

### Step 1: Fork & Set Up

```bash
# Fork from RunAnywhere's official web starter
git clone https://github.com/RunanywhereAI/web-starter-app
mv web-starter-app reality-check
cd reality-check
npm install
npm run dev
```

### Step 2: Project Structure

```
reality-check/
├── src/
│   ├── modules/
│   │   ├── voiceScanner.js     # STT + LLM scam detection pipeline
│   │   ├── imageScanner.js     # Vision model image analysis
│   │   ├── videoScanner.js     # Frame sampling + vision analysis
│   │   └── callMonitor.js      # Real-time voice pipeline (STT→LLM→TTS)
│   ├── components/
│   │   ├── TrustScore.jsx      # Core trust score display component
│   │   ├── LiveCallView.jsx    # Real-time call monitoring UI
│   │   ├── ImageScanView.jsx   # Image upload and result view
│   │   └── HistoryView.jsx     # Past scans (stored locally)
│   ├── prompts/
│   │   ├── scamDetection.js    # LLM system prompts for scam analysis
│   │   └── imageAnalysis.js    # Vision prompts for manipulation detection
│   └── App.jsx                 # Main app with RunAnywhere SDK init
├── public/
│   └── sw.js                   # Service Worker for offline support
└── package.json
```

### Step 3: Initialize RunAnywhere SDK

```javascript
// src/App.jsx
import { RunAnywhere } from '@runanywhere/sdk';

const ra = new RunAnywhere();

// Load only what's needed for the active module
await ra.init({
  models: ['stt', 'llm', 'vision', 'tts'],
  offlineFirst: true
});
```

### Resources

- **RunAnywhere Docs:** [docs.runanywhere.ai/web/introduction](https://docs.runanywhere.ai/web/introduction)
- **Web Starter App:** [github.com/RunanywhereAI/web-starter-app](https://github.com/RunanywhereAI/web-starter-app)
- **GitHub SDKs:** [github.com/RunanywhereAI/runanywhere-sdks](https://github.com/RunanywhereAI/runanywhere-sdks)
- **Discord Support:** [discord.com/invite/N359FBbDVd](https://discord.com/invite/N359FBbDVd)

---

## 🏆 Why Reality Sheild Wins

### Judging Criteria Alignment

| Judging Criterion | Our Approach |
|------------------|-------------|
| **Innovation & Creativity** | First deepfake + scam detector as an offline PWA — novel STT + Vision + LLM combo for personal security |
| **Technical Execution** | Clean RunAnywhere SDK integration across all 4 modalities (STT, LLM, Vision, TTS). Built on official starter. |
| **User Experience** | Single Trust Score anyone can read. Voice alerts for hands-free use. Zero technical knowledge required. |
| **Practical Impact** | Addresses $10B+ annual fraud problem. Protects the most vulnerable users at highest risk. |
| **Local AI Benefits** | Privacy is not a feature here — it's the entire value proposition. Zero cloud = zero surveillance. |

### Competitive Advantage

| Existing Tools | Reality Sheild |
|---------------|--------------|
| Cloud-based (Google, Microsoft) | 100% on-device — no data transmitted |
| Reactive (forensics after the fact) | Real-time — during the interaction |
| Single threat type | Multi-modal: voice + image + video in one app |
| Internet required | Fully offline — works anywhere |
| Developer/enterprise tools | Consumer UX — one Trust Score anyone understands |

---

## 🌍 Real-World Impact

- **Elderly users** — most targeted demographic for voice scams, least able to detect AI voices
- **Rural / low-connectivity users** — no internet = no cloud tools = currently unprotected
- **Privacy-conscious users** — voice recordings never leave device
- **Scale:** 1B+ smartphone users globally exposed to these threats, growing every year

---

## 🔮 Roadmap Beyond the Hackathon

| Version | Feature | ETA |
|---------|---------|-----|
| v1.0 | Voice + Image detection PWA (Hackathon demo) | Demo Day |
| v1.1 | Video deepfake analysis | +2 weeks |
| v1.2 | Browser extension for passive protection | +1 month |
| v2.0 | React Native mobile app (iOS + Android) | +2 months |
| v3.0 | Community scam pattern sharing (P2P, no server) | +6 months |

---

## 👥 Team

| Name | 
|------|
| Vaishnavi Rapolu (Team Leader)|
| Manduri Aswitha Chowdary |
| Vishal S V | 
| Pranav Juyal | 

---

## 📄 License

MIT License — Open source for public safety.

---

*Built at HackXtreme 2026 · Protecting real people from synthetic threats · Powered by RunAnywhere SDK*
