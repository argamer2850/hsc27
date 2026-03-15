import { NextResponse } from 'next/server';

export function middleware(request) {
  const whitelist = ['202.181.4.175'];
  const ip = request.ip || request.headers.get('x-forwarded-for');

  if (whitelist.includes(ip)) {
    return NextResponse.next();
  }

  return new NextResponse('Access Denied', { status: 403 });
}

export const config = {
  matcher: '/(.*)', 
};
