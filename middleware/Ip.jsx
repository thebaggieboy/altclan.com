// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Get IP address
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  
  // Get country from IP (cached to reduce API calls)
  const countryResponse = await fetch(`https://ipapi.co/${ip}/country/`);
  const country = await countryResponse.text();
  
  // Clone the response and set headers
  const response = NextResponse.next();
  response.headers.set('x-country', country);
  
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};