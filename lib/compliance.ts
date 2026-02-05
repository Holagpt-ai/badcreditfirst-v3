/**
 * Affiliate network compliance flags and disclosure copy.
 * Centralized logic for CJ, Impact, Partnerize. No duplicated copy per page.
 */

export type AffiliateNetwork = 'cj' | 'impact' | 'partnerize';

export const COMPLIANCE = {
  /** Active networks. Set to true when approved. */
  networks: {
    cj: true,
    impact: true,
    partnerize: true,
  } as Record<AffiliateNetwork, boolean>,

  /** Max monetized (affiliate) CTAs per page. */
  maxMonetizedCtasPerPage: 3,

  /** Disclosure must appear before first monetized CTA. */
  disclosureBeforeFirstCta: true,
} as const;

/** Network-specific disclosure snippets. Use getDisclosureForNetwork(). */
const NETWORK_DISCLOSURES: Record<AffiliateNetwork, { short: string; full: string }> = {
  cj: {
    short: 'We may earn a commission when you apply. Editorial content is independent.',
    full: 'BadCreditFirst participates in affiliate programs. We may earn a commission when you apply for products through our links. Our reviews and rankings are independent and not influenced by compensation.',
  },
  impact: {
    short: 'We may receive compensation when you apply. Our recommendations are editorial.',
    full: 'BadCreditFirst is part of the Impact affiliate network. We may receive compensation when you apply through our links. Our editorial content and product rankings are independent.',
  },
  partnerize: {
    short: 'We may earn a commission from partner links. Editorial opinions are our own.',
    full: 'BadCreditFirst works with Partnerize and other affiliate networks. We may earn a commission when you apply through our links. Our reviews and ratings are independent.',
  },
};

/** Default disclosure when multiple networks or none specified. */
const DEFAULT_DISCLOSURE = {
  short: 'Independent & advertising-supported.',
  full: 'BadCreditFirst is independent and advertising-supported. We may earn a commission when you apply through our links. Our reviews are editorial.',
};

/**
 * Returns disclosure copy for the active network(s).
 * When multiple networks active, uses default. Single network uses network-specific copy.
 */
export function getDisclosureForNetwork(network?: AffiliateNetwork): { short: string; full: string } {
  if (network && COMPLIANCE.networks[network]) {
    return NETWORK_DISCLOSURES[network];
  }
  const activeNetworks = (Object.keys(COMPLIANCE.networks) as AffiliateNetwork[]).filter(
    (n) => COMPLIANCE.networks[n]
  );
  const singleActive = activeNetworks.length === 1 ? activeNetworks[0] : undefined;
  return singleActive ? NETWORK_DISCLOSURES[singleActive] : DEFAULT_DISCLOSURE;
}

/** Primary network for disclosure copy. Set via env or config. */
export function getActiveNetwork(): AffiliateNetwork | undefined {
  const env = process.env.NEXT_PUBLIC_AFFILIATE_NETWORK?.toLowerCase();
  if (env === 'cj' || env === 'impact' || env === 'partnerize') {
    return env;
  }
  return undefined;
}
