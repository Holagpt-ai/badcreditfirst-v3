/**
 * Affiliate Throttling Engine
 * EPC caps, spike detection, issuer suppression.
 * Config from config/rules.config.json via lib/hybrid-seo-rules.ts
 */

import { AFFILIATE_THROTTLING } from './hybrid-seo-rules';

const { epcFloor, issuerCapPercentPerDay, spikeDetection } = AFFILIATE_THROTTLING;

export type IssuerId = string;

/** In-memory stub. Replace with Redis/DB for production. */
const issuerEpcByDay = new Map<string, Map<string, number>>();
const issuerVolumeByHour = new Map<string, number[]>();

/** Check if issuer EPC meets floor. Below floor → suppress. */
export function meetsEpcFloor(epc: number): boolean {
  return epc >= epcFloor;
}

/** Check if issuer has exceeded daily cap (percent of total volume). */
export function isWithinIssuerCap(issuerId: IssuerId, volumeToday: number, totalVolumeToday: number): boolean {
  if (totalVolumeToday === 0) return true;
  const percent = (volumeToday / totalVolumeToday) * 100;
  return percent <= issuerCapPercentPerDay;
}

/** Spike detection: max hourly increase percent. */
export function isSpikeDetected(issuerId: IssuerId, currentHourlyVolume: number, prevHourlyVolume: number): boolean {
  if (!spikeDetection.enabled || prevHourlyVolume === 0) return false;
  const increasePercent = ((currentHourlyVolume - prevHourlyVolume) / prevHourlyVolume) * 100;
  return increasePercent > spikeDetection.max_hourly_increase_percent;
}

/** Should we suppress this issuer? (EPC below floor, cap exceeded, or spike.) */
export function shouldSuppressIssuer(
  issuerId: IssuerId,
  epc: number,
  approvalRate: number,
  volumeToday: number,
  totalVolumeToday: number,
  currentHourlyVolume: number,
  prevHourlyVolume: number
): boolean {
  if (!meetsEpcFloor(epc)) return true;
  if (approvalRate < 0.4) return true;
  if (!isWithinIssuerCap(issuerId, volumeToday, totalVolumeToday)) return true;
  if (isSpikeDetected(issuerId, currentHourlyVolume, prevHourlyVolume)) return true;
  return false;
}
