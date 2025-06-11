import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const { pathname } = request.nextUrl;

  // Разрешаем публичные маршруты без авторизации
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/confirm") ||
    pathname.startsWith("/passwordReset") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/api/auth");

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Если токен есть — пропускаем
  return NextResponse.next();
}

// Применяем middleware ко всем маршрутам, кроме статических файлов
//Эта версия исключает все изображения по расширению, а также маршруты /auth и API авторизации. (gpt так посоветовал)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|auth|api/auth).*)",
  ],
};
