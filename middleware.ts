// export { auth as middleware } from '@/auth';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const authRoutes = ['sign-in', 'sign-up'];
const protectedRoutes = ['/dashboard'];
const adminRoutes = ['/admin'];

export default auth((req) => {
  const { nextUrl, auth } = req;
  const { pathname } = nextUrl;
  const isLoggedIn = !!auth?.user;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (adminRoutes.includes(pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // if (user.role !== 'admin') {
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
