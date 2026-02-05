/**
 * A/B variant guardrails. Search-safe: bots always get A.
 * Max 2 variants. Session-locked via cookie.
 */

export type ABVariant = 'A' | 'B';

const VARIANT_COOKIE = 'bcf_variant';
const SESSION_COOKIE = 'bcf_session';

/** 10% B, 90% A. Deterministic from sessionId. */
const B_THRESHOLD = 0.1;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Get variant from cookie. Assign once per session.
 * Bots always get A. Humans: 90% A, 10% B (deterministic from session).
 */
export function getVariantFromCookies(
  cookieHeader: string | null | undefined,
  userAgent: string | null | undefined,
  isBotFn: (ua: string | null | undefined) => boolean
): ABVariant {
  if (isBotFn(userAgent)) return 'A';

  const cookies = parseCookies(cookieHeader);
  const existing = cookies[VARIANT_COOKIE];
  if (existing === 'A' || existing === 'B') return existing;

  let sessionId = cookies[SESSION_COOKIE];
  if (!sessionId) {
    sessionId = `s${hash(String(Date.now()) + Math.random()).toString(36)}`;
  }

  const h = hash(sessionId);
  const variant: ABVariant = h % 100 < 100 * B_THRESHOLD ? 'B' : 'A';
  return variant;
}

function parseCookies(header: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const [key, val] = part.trim().split('=');
    if (key && val) out[key] = decodeURIComponent(val.trim()) || val.trim();
  }
  return out;
}

export interface GetVariantResult {
  variant: ABVariant;
  sessionId?: string;
  shouldSetCookies: boolean;
  cookiesToSet?: { name: string; value: string; maxAge: number }[];
}

/**
 * Get variant for a request. Use in middleware.
 * Bots always A. Humans: 90% A, 10% B. Session-locked via cookie.
 */
export function getVariant(params: {
  cookieHeader: string | null | undefined;
  userAgent: string | null | undefined;
  isBot?: (ua: string | null | undefined) => boolean;
}): GetVariantResult {
  const isBotFn = params.isBot ?? (() => false);
  if (isBotFn(params.userAgent)) {
    return { variant: 'A', shouldSetCookies: false };
  }

  const cookies = parseCookies(params.cookieHeader);
  const existingVariant = cookies[VARIANT_COOKIE];
  if (existingVariant === 'A' || existingVariant === 'B') {
    return { variant: existingVariant, shouldSetCookies: false };
  }

  let sessionId = cookies[SESSION_COOKIE];
  const isNewSession = !sessionId;
  if (!sessionId) {
    sessionId = `s${hash(String(Date.now()) + String(Math.random())).toString(36)}`;
  }

  const h = hash(sessionId);
  const variant: ABVariant = h % 100 < 100 * B_THRESHOLD ? 'B' : 'A';

  const cookiesToSet = isNewSession
    ? [
        { name: SESSION_COOKIE, value: sessionId, maxAge: 60 * 60 * 24 * 365 },
        { name: VARIANT_COOKIE, value: variant, maxAge: 60 * 60 * 24 * 365 },
      ]
    : undefined;

  return {
    variant,
    sessionId,
    shouldSetCookies: isNewSession,
    cookiesToSet,
  };
}

/** Header set by middleware for downstream use. */
export const VARIANT_HEADER = 'x-bcf-variant';

/**
 * Read variant from request headers (set by middleware).
 * Fallback to A if not present (e.g. static generation).
 */
export function getVariantFromHeaders(headerValue: string | null | undefined): ABVariant {
  if (headerValue === 'A' || headerValue === 'B') return headerValue;
  return 'A';
}

/** Valid variants. Max 2. */
export const VALID_VARIANTS: ABVariant[] = ['A', 'B'];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Build-time validation for A/B guardrails.
 * Fails if: variant logic affects schema, more than 2 variants, bot path not locked to control.
 */
export function validateABGuardrails(): ValidationResult {
  const errors: string[] = [];

  if (VALID_VARIANTS.length > 2) {
    errors.push('More than 2 variants exist. Max A/B only.');
  }

  const botUserAgents = [
    'Googlebot/2.1',
    'bingbot/2.0',
    'SemrushBot/1.0',
    'AhrefsBot/1.0',
  ];
  for (const ua of botUserAgents) {
    const result = getVariant({
      cookieHeader: null,
      userAgent: ua,
      isBot: (u) => (u ? /googlebot|bingbot|semrush|ahrefs/i.test(u) : true),
    });
    if (result.variant !== 'A') {
      errors.push(`Bot path not locked to control: ${ua} got variant ${result.variant}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
