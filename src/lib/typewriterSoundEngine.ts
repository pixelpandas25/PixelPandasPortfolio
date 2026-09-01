/**
 * Synthesizes a short, subtle typewriter "key click" using the Web Audio API
 * — a brief filtered noise burst, not a sample — so there's no external audio
 * asset to license or load. Every method fails silently: browsers block audio
 * until a user gesture, and callers should never have to special-case that.
 */
export class TypewriterSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private ensureContext(): AudioContext | null {
    if (this.ctx) return this.ctx;
    const globalWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioContextCtor = globalWindow.AudioContext ?? globalWindow.webkitAudioContext;
    if (!AudioContextCtor) return null;

    try {
      const ctx = new AudioContextCtor();
      const gain = ctx.createGain();
      gain.gain.value = 0.16;
      gain.connect(ctx.destination);
      this.ctx = ctx;
      this.masterGain = gain;
      return ctx;
    } catch {
      return null;
    }
  }

  /** Call from a user-gesture handler (click/keydown) to unlock audio early. */
  resume() {
    const ctx = this.ensureContext();
    if (ctx?.state === 'suspended') ctx.resume().catch(() => {});
  }

  click() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
      if (ctx.state === 'suspended') return; // still locked — skip this click, no error
    }

    const duration = 0.02;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const decay = (1 - i / bufferSize) ** 2;
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2200 + Math.random() * 1600;
    filter.Q.value = 0.7;

    source.connect(filter);
    filter.connect(this.masterGain);

    try {
      source.start();
      source.stop(ctx.currentTime + duration);
    } catch {
      // ignore — context may have been closed mid-flight
    }
  }

  destroy() {
    this.masterGain?.disconnect();
    this.masterGain = null;
    void this.ctx?.close().catch(() => {});
    this.ctx = null;
  }
}
