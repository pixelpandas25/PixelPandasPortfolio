import { BreakTheRules } from '@/components/experimental/BreakTheRules';

/**
 * Development-only preview route for the "Break the Rules" kinetic-typography
 * transition. Registered at /dev/break-the-rules (see routes/router.tsx) only
 * in dev builds, outside PageShell, so it is a clean full-screen prototype that
 * does not affect the production homepage, navigation, or booking page.
 */
export default function BreakTheRulesPrototype() {
  return <BreakTheRules />;
}
