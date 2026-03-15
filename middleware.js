import { NextResponse } from 'next/server';

export function middleware(request) {
  // যে IP গুলোকে এলাও করতে চান
  const whitelist = ['202.181.4.175'];
  
  // ইউজারের IP শনাক্ত করা
  const ip = request.ip || request.headers.get('x-forwarded-for');

  if (!whitelist.includes(ip)) {
    return new NextResponse('Access Denied: You are not authorized.', { status: 403 });
  }

  return NextResponse.next();
}

// এটি কোন কোন পাথে কাজ করবে তা নির্ধারণ করে
export const config = {
  matcher: '/(.*)', 
};
