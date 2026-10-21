import { EscapeTransition } from '@/components/experimental/EscapeTransition';

/**
 * Development-only preview route for the "Escape the Ordinary" screen-break
 * transition. Registered at /dev/escape (routes/router.tsx) only in dev builds,
 * outside PageShell, so it is a clean full-screen prototype that does not affect
 * the production homepage, navigation, or booking page.
 */
export default function EscapePrototype() {
  return <EscapeTransition />;
}
