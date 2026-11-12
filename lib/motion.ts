/**
 * Runs inline before first paint, from the root layout. It arms the drawn-in
 * traces only when the visitor has not asked for reduced motion, so a page
 * without script, or with reduced motion, never hides a line.
 */
export const motionArmScript =
  "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motion='ok'}}catch(e){}"
