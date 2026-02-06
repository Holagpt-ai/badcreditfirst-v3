/**
 * Builds the tracked outbound URL for affiliate clicks.
 * Routes through /api/outbound to increment affiliate_metrics_daily.clicks.
 */

export function getOutboundRedirectUrl(issuerId: string, destinationUrl: string): string {
  if (!issuerId || !destinationUrl) return destinationUrl;
  return `/api/outbound?issuer=${encodeURIComponent(issuerId)}&to=${encodeURIComponent(destinationUrl)}`;
}
