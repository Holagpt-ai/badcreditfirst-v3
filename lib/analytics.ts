/**
 * Google Analytics (gtag) event helper.
 * Requires gtag loaded in layout (e.g. G-5JXXYC365C).
 */

declare global {
  interface Window {
    gtag?: (command: 'event', action: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Fire a GA4 event. Safe to call on server (no-op).
 * @param action - Event name (e.g. 'apply_click', 'funnel_complete')
 * @param category - Event category (e.g. 'Card', 'Funnel')
 * @param label - Optional label (e.g. card slug, segment)
 * @param value - Optional numeric value (e.g. position)
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const params: Record<string, unknown> = { event_category: category };
  if (label != null) params.event_label = label;
  if (value != null) params.value = value;
  window.gtag('event', action, params);
}
