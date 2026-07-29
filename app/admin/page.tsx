import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("misogold_admin_session")?.value;
  const session = token ? decryptSession(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch initial data directly on the server
  const prices = await prisma.goldPrice.findMany({
    orderBy: { id: "asc" },
  });

  const images = await prisma.showcaseImage.findMany({
    orderBy: { displayOrder: "asc" },
  });

  // Serialize data objects to plain JSON values to pass safely to Client Component
  const serializedPrices = prices.map((p) => ({
    id: p.id,
    type: p.type,
    buyPrice: p.buyPrice,
    sellPrice: p.sellPrice,
  }));

  const serializedImages = images.map((img) => ({
    id: img.id,
    url: img.url,
    filename: img.filename,
    displayOrder: img.displayOrder,
  }));

  return (
    <AdminDashboard
      initialPrices={serializedPrices}
      initialImages={serializedImages}
    />
  );
}
