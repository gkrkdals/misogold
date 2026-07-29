"use client";

import React from "react";

interface ShowcaseImage {
  id: number;
  url: string;
  filename: string;
}

interface ImageShowcaseProps {
  initialImages?: ShowcaseImage[];
}

export default function ImageShowcase({ initialImages }: ImageShowcaseProps) {
  const images = initialImages || [];

  // If no promotional images are registered by the administrator, do not render this section
  if (images.length === 0) {
    return null;
  }

  return (
    <section id="image-showcase" className="py-12 bg-background">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Render images raw without borders, rounded corners, or shadows */}
        <div className="flex flex-col gap-8">
          {images.map((img) => (
            <div key={img.id} className="w-full flex justify-center">
              <img
                src={img.url}
                alt={img.filename}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
