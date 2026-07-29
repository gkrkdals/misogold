import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> | { filename: string } }
) {
  try {
    const resolvedParams = await params;
    const filename = resolvedParams.filename;

    // Securely resolve file path under uploads_data
    const uploadDir = path.join(process.cwd(), "uploads_data");
    const filePath = path.join(uploadDir, filename);

    // Prevent directory traversal attacks
    const relative = path.relative(uploadDir, filePath);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type
    let contentType = "image/jpeg";
    const ext = path.extname(filename).toLowerCase();
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".webp") contentType = "image/webp";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
