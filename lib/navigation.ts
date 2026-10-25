/** A horizontal gesture belongs to the dock only; vertical gestures remain scrolling. */
export function swipeTarget(
  active: number,
  dx: number,
  dy: number,
  count: number,
): number {
  const current = Math.max(0, active);
  if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) {
    return current;
  }
  return Math.min(count - 1, Math.max(0, current + (dx < 0 ? 1 : -1)));
}

/** Returns true when the viewport has reached the very bottom of the document. */
export function isAtPageBottom(
  scrollY: number,
  viewportHeight: number,
  scrollHeight: number,
  threshold = 4,
): boolean {
  return viewportHeight + Math.max(0, scrollY) >= scrollHeight - threshold;
}
