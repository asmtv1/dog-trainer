import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const { pathname } = request.nextUrl;
  console.log("🌐 middleware caught request to:", pathname); // ← добавь это

  // Разрешаем публичные маршруты без авторизации
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/api/auth"); // сам NextAuth API

  if (isPublic) {
    console.log("✅ Public route, allow");
    return NextResponse.next();
  }

  // Если нет токена, редирект на главную
  if (!token) {
    console.log("⛔ No token, redirecting");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Если токен есть — пропускаем
  console.log("🔓 Token found, allow");
  return NextResponse.next();
}

// Применяем middleware ко всем маршрутам, кроме статических файлов
//Эта версия исключает все изображения по расширению, а также маршруты /auth и API авторизации. (gpt так посоветовал)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|auth|api/auth).*)",
  ],
};
