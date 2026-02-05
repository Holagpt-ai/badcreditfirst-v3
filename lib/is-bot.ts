/**
 * Bot detection for search-safe A/B testing.
 * Bots always see control variant. Default to bot = true if uncertain.
 */

const BOT_PATTERNS = [
  'googlebot',
  'bingbot',
  'adsbot',
  'semrush',
  'ahrefsbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'slurp', // Yahoo
  'facebookexternalhit',
  'twitterbot',
  'rogerbot', // Moz
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'qwantify',
  'pocket',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
] as const;

/**
 * Detect if the request is from a known bot/crawler.
 * Default to true (treat as bot) if uncertain — search-safe.
 */
export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent || typeof userAgent !== 'string') return true;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((pattern) => ua.includes(pattern));
}
