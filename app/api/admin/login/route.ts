import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encryptSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      console.error("Admin credentials are not configured in environment variables.");
      return NextResponse.json(
        { error: "서버 설정 오류: 관리자 계정 정보가 구성되지 않았습니다." },
        { status: 500 }
      );
    }

    if (username === expectedUsername && password === expectedPassword) {
      const sessionData = {
        username: expectedUsername,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      const encrypted = encryptSession(sessionData);
      const cookieStore = await cookies();
      cookieStore.set("misogold_admin_session", encrypted, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
