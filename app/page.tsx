import React from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ImageShowcase from "@/components/ImageShowcase";
import Directions from "@/components/Directions";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch dynamic data from database for SEO-friendly SSR rendering
  const prices = await prisma.goldPrice.findMany({
    orderBy: { id: "asc" },
  });

  const showcaseImages = await prisma.showcaseImage.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-zinc-900 selection:bg-gold/30 selection:text-zinc-900">
      {/* 1. Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Banner (integrates gold prices and trading charts) */}
        <HeroBanner initialPrices={prices} />

        {/* 4. Administrator Image Showcase */}
        <ImageShowcase initialImages={showcaseImages} />

        {/* 5. Location & Directions */}
        <Directions />

        {/* 6. Facilities & Convenience */}
        <Facilities />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Floating Action Widgets */}
      <FloatingWidgets />
    </div>
  );
}

