import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getVariant } from '@/lib/ab-guardrails';
import { isBot } from '@/lib/is-bot';
import { shouldShowAffiliateLinks } from '@/lib/hybrid-seo-rules';

/** Geo: Vercel sets x-vercel-ip-country. Fallback: assume US in dev if unset (for local testing). */
function getCountryCode(request: NextRequest): string | null {
  const country = request.headers.get('x-vercel-ip-country') ?? (request as NextRequest & { geo?: { country?: string } }).geo?.country ?? null;
  if (!country && process.env.NODE_ENV === 'development') return 'US';
  return country;
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  const cookieHeader = request.headers.get('cookie');
  const result = getVariant({
    cookieHeader,
    userAgent,
    isBot,
  });

  const countryCode = getCountryCode(request);
  const allowAffiliate = shouldShowAffiliateLinks(countryCode);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-bcf-allow-affiliate', allowAffiliate ? '1' : '0');

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('x-bcf-variant', result.variant);

  if (result.shouldSetCookies && result.cookiesToSet) {
    for (const c of result.cookiesToSet) {
      response.cookies.set(c.name, c.value, {
        maxAge: c.maxAge,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/credit-cards/review/:path*',
    '/credit-cards/category/:path*',
    '/credit-cards/results/:path*',
    '/compare/:path*',
    '/education/:path*',
  ],
};
