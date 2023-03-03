import  { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

type Environment = "production" | "development" | "other";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers.get("x-forwarded-proto") !== "https" || !req.headers.get('host')?.includes('desired-domain.com')) {
        return NextResponse.redirect(
           `https://www.desired-domain.com${req.nextUrl.pathname}`,
           301
        );
    } 
    return NextResponse.next();
}