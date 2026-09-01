import { useEffect, useRef } from 'react';
import { TypewriterSoundEngine } from '@/lib/typewriterSoundEngine';

/**
 * Returns a `playClick()` function that triggers a synthesized key-click.
 * Pass `enabled={false}` (e.g. for `prefers-reduced-motion`) to skip creating
 * any audio resources at all — `playClick` becomes a no-op.
 */
export function useTypewriterSound(enabled: boolean) {
  const engineRef = useRef<TypewriterSoundEngine | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const engine = new TypewriterSoundEngine();
    engineRef.current = engine;

    const unlock = () => engine.resume();
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      engine.destroy();
      engineRef.current = null;
    };
  }, [enabled]);

  return () => engineRef.current?.click();
}
