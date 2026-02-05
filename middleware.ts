import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getVariant } from '@/lib/ab-guardrails';
import { isBot } from '@/lib/is-bot';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  const cookieHeader = request.headers.get('cookie');
  const result = getVariant({
    cookieHeader,
    userAgent,
    isBot,
  });

  const response = NextResponse.next();
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
    '/compare/:path*',
  ],
};
