/**
 * Deterministic offer rotation. Session-locked. Bots always get control.
 * No per-request randomization. Affiliate-network compliant.
 */

import { getActiveNetwork } from './compliance';

export type AffiliateNetwork = 'cj' | 'impact' | 'partnerize';

export interface Offer {
  id: string;
  href: string;
  network: AffiliateNetwork;
  priority: number;
  status: 'active' | 'paused';
}

export interface GetPrimaryOfferParams {
  pageId: string;
  sessionId: string;
  isBot: boolean;
  offers: Offer[];
}

/** Deterministic hash for session-locked selection. */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Get the winning offer for this page + session.
 * Bots always get control (first active offer). Humans get deterministic rotation.
 */
export function getPrimaryOffer({
  pageId,
  sessionId,
  isBot,
  offers,
}: GetPrimaryOfferParams): Offer | null {
  const active = offers
    .filter((o) => o.status === 'active')
    .sort((a, b) => b.priority - a.priority);

  if (active.length === 0) return null;

  if (isBot) return active[0];

  const seed = hash(`${pageId}|${sessionId}`);
  const idx = seed % active.length;
  return active[idx];
}

/**
 * Build a single offer from card href. Use when only one offer exists per page.
 */
export function buildOfferFromHref(
  id: string,
  href: string,
  status: 'active' | 'paused' = 'active'
): Offer {
  const network = getActiveNetwork() ?? 'cj';
  return {
    id,
    href,
    network,
    priority: 1,
    status,
  };
}
