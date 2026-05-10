# StudyStream — Proof of Learning Protocol

## Project Description

StudyStream is a decentralized peer-learning and micro-funding protocol built on Solana. It solves a fundamental problem in education: **there is no trust layer for peer-to-peer learning**. Traditional platforms are centralized gatekeepers — they control your data, your reputation, and your access to opportunity.

StudyStream flips this. Every mentorship session is logged on Solana. Every rating is peer-verified. Every reputation score is on-chain and immutable. Higher reputation unlocks merit-based micro-grants — no intermediaries, no gatekeepers.

**How it works:**
1. **Connect Wallet** — Your Solana wallet (Phantom/Solflare) is your identity. No account creation needed.
2. **Find a Mentor** — Browse the marketplace. Each mentor has a verifiable on-chain reputation.
3. **Learn & Earn** — Complete mentorship sessions. Earn peer ratings. Build your reputation score.
4. **Access Funding** — Your on-chain reputation determines your access to micro-grants and learning rewards.

**Why Solana:** Low fees (~$0.0001 per tx), sub-second finality, and the scalability to handle thousands of mentorship sessions on-chain. We use Anchor framework for program security and `@solana/wallet-adapter` for seamless wallet integration.

**Tech stack:** Next.js 16, React 19, Tailwind CSS v4, Prisma 7 + Neon (PostgreSQL), Framer Motion, Phantom/Solflare/ MetaMask wallets, ElevenLabs TTS.

---

## Partner Integrations

### ElevenLabs — Generate Speech (Text-to-Speech)

Integration file: `app/api/tts/route.ts`
GitHub: https://github.com/Kimmicorn-glitch/PeerChain/blob/main/app/api/tts/route.ts

StudyStream uses ElevenLabs' Text-to-Speech API to power **Audio Briefs** — spoken summaries of mentorship sessions, funding proposals, and reputation updates. Users on the dashboard can input any text, select a voice, and generate high-quality neural audio in real-time.

**What we built:**
- `POST /api/tts` endpoint that accepts `{ text, voiceId }`, calls `https://api.elevenlabs.io/v1/text-to-speech/{voice}` with the `xi-api-key` header and `eleven_monolingual_v1` model, and returns `audio/mpeg` binary.
- `AudioSuite` React component (`app/components/features/audio-suite.tsx`) with voice selector dropdown, text input, generate button, and audio player with play/pause and progress bar.
- Fallback to local audio generation if the API key is not configured — the app degrades gracefully for development.
- Voice settings configured for natural speech: stability 0.5, similarity boost 0.5.

**Why ElevenLabs:** Voice is the most natural way to consume information. By converting session notes, funding proposals, and reputation updates into spoken audio, we make the platform accessible to audio learners and users who prefer listening over reading.

**Impact:** Makes decentralized education truly accessible — learners can review session insights hands-free, and visually impaired users can interact with the platform through audio.

---

### Solana Mobile — Mobile Wallet Adapter Protocol

Integration files:
- `mobile-app/front-end/src/services/walletService.js`
- `mobile-app/front-end/PeerChainApp/src/services/walletService.js`
- `mobile-app/backend/src/services/solanaService.js`
GitHub: https://github.com/Kimmicorn-glitch/PeerChain/blob/main/mobile-app/front-end/src/services/walletService.js

StudyStream uses `@solana-mobile/mobile-wallet-adapter-protocol-web3js` to connect React Native mobile clients to Solana wallets on mobile devices.

**What we built:**
- `connectWallet()` — calls `wallet.authorize()` with the Solana cluster (devnet) and app identity, returns the wallet address and auth token.
- `signMessage()` — reauthorizes the session and signs messages for on-chain verification of learning sessions.
- `disconnectWallet()` — deauthorizes the session and cleans up.
- `solanaService.js` on the backend — verifies wallet addresses, fetches SOL balances, and confirms transactions landed on-chain.
- Web-side: `SolanaProvider` wrapping the full app with Phantom/Solflare wallet adapters, auto-connect, and wallet modal.
- `ConnectWallet` component with wallet picker (Solana + MetaMask), balance display, copy/explorer links, and disconnect.

**Why Solana Mobile:** Learning happens everywhere. The mobile wallet adapter lets users carry their on-chain reputation in their pocket, connect directly from a mobile dApp browser, and sign sessions without a desktop.

**Impact:** Enables real-world, in-person mentorship sessions where both mentor and learner verify the session by signing with their mobile wallets — creating an immutable record on Solana.

---

### LI.FI Integration

LI.FI is not yet integrated into the current codebase. The protocol currently handles SOL and SPL token transfers directly via Solana Web3.js. LI.FI's cross-chain swap and bridging capabilities would be a natural addition for a future version where learners can fund their accounts from any chain or receive grant payouts in their preferred token.

---

### Virtuals Integration

Virtuals is not yet integrated into the current codebase. Virtuals' AI agent framework would be a powerful addition for automating mentor matching, reputation analysis, and funding proposal evaluation in a future iteration of the protocol.

---

## Problem Solved

**The problem:** Today's online learning ecosystem is broken. Centralized platforms own your data, control your reputation, and take 20-40% of every transaction. Learners in underserved regions cannot access quality mentorship because they lack payment methods, credit history, or institutional affiliation. There is no portable, verifiable reputation system — every platform starts from zero.

**The solution:** StudyStream creates a **decentralized reputation economy for education**. Your learning history is stored on Solana — you own it, you control it, and you can take it anywhere. Your reputation is built through verifiable peer interactions, not arbitrary algorithms. And your reputation directly unlocks merit-based funding — no bank account, no credit check, no approval from a centralized authority.

**Why it wins:** It aligns incentives for everyone:
- **Learners** get access to quality mentorship and funding based on merit, not connections.
- **Mentors** build a portable, on-chain reputation they can use across any platform.
- **Funders** deploy capital to vetted, reputation-staked individuals with verifiable track records.

**Solana address of deployed program:** `Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS`
**Network:** Devnet
