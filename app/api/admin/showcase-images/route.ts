import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("misogold_admin_session")?.value;
  const session = token ? decryptSession(token) : null;
  return !!session;
}

export async function GET() {
  try {
    const images = await prisma.showcaseImage.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "이미지 목록을 불러오지 못했습니다." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "업로드할 파일이 없습니다." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to uploads_data
    const uploadDir = path.join(process.cwd(), "uploads_data");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.name) || ".jpg";
    const filename = `showcase-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Get max display order
    const maxOrderImage = await prisma.showcaseImage.findFirst({
      orderBy: { displayOrder: "desc" },
    });
    const nextOrder = maxOrderImage ? maxOrderImage.displayOrder + 1 : 1;

    // Create DB entry
    const newImage = await prisma.showcaseImage.create({
      data: {
        url: `/uploads/${filename}`,
        filename: file.name,
        displayOrder: nextOrder,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newImage);
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "이미지 업로드 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  try {
    const { action, ids } = await req.json();

    if (action === "reorder" && Array.isArray(ids)) {
      // Reorder images
      await prisma.$transaction(
        ids.map((id: number, idx: number) =>
          prisma.showcaseImage.update({
            where: { id: Number(id) },
            data: { displayOrder: idx + 1 },
          })
        )
      );
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "올바르지 않은 요청입니다." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "순서 변경 중 오류가 발생했습니다." }, { status: 500 });
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

    const image = await prisma.showcaseImage.findUnique({
      where: { id: Number(id) },
    });

    if (!image) {
      return NextResponse.json({ error: "이미지를 찾을 수 없습니다." }, { status: 404 });
    }

    // Remove file from disk
    const filePath = path.join(process.cwd(), "uploads_data", path.basename(image.url));
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fsErr) {
      console.error("Failed to delete file from disk:", fsErr);
    }

    // Delete DB entry
    await prisma.showcaseImage.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "이미지 삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}
