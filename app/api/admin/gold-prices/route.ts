import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("misogold_admin_session")?.value;
  const session = token ? decryptSession(token) : null;
  return !!session;
}

export async function GET() {
  try {
    const prices = await prisma.goldPrice.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(prices);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  try {
    const { type, buyPrice, sellPrice } = await req.json();
    if (!type) {
      return NextResponse.json({ error: "구분(품목)은 필수 입력 사항입니다." }, { status: 400 });
    }

    const newPrice = await prisma.goldPrice.create({
      data: {
        type,
        buyPrice: buyPrice !== undefined ? String(buyPrice).trim() : "0",
        sellPrice: sellPrice !== undefined ? String(sellPrice).trim() : "0",
      },
    });

    revalidatePath("/");
    return NextResponse.json(newPrice);
  } catch (error) {
    return NextResponse.json({ error: "등록 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  try {
    const { id, type, buyPrice, sellPrice } = await req.json();
    if (!id || !type) {
      return NextResponse.json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const updatedPrice = await prisma.goldPrice.update({
      where: { id: Number(id) },
      data: {
        type,
        buyPrice: buyPrice !== undefined ? String(buyPrice).trim() : "0",
        sellPrice: sellPrice !== undefined ? String(sellPrice).trim() : "0",
      },
    });

    revalidatePath("/");
    return NextResponse.json(updatedPrice);
  } catch (error) {
    return NextResponse.json({ error: "수정 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID가 필요합니다." }, { status: 400 });
    }

    await prisma.goldPrice.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}
