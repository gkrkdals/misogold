"use client";

import React, { useState } from "react";

export default function FloatingWidgets() {
  const [isOpen, setIsOpen] = useState(true);

  const scrollToDirections = () => {
    const element = document.getElementById("directions");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-1.5 items-center">
      
      {/* Expanded Items */}
      {isOpen && (
        <>
          {/* 1. Phone Call Action */}
          <a
            href="tel:010-7634-2231"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-xl hover:bg-gold-dark hover:scale-110 transition-all duration-200"
            title="전화 문의하기"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>

          {/* 2. Scroll to Directions (Location) */}
          <button
            onClick={scrollToDirections}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-xl hover:bg-gold-dark hover:scale-110 transition-all duration-200 cursor-pointer"
            title="오시는 길"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* 3. Naver Talk Talk (Message Widget) */}
          <a
            href="https://talk.naver.com/ct/w9ehxwv?frm=home"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-xl hover:bg-gold-dark hover:scale-110 transition-all duration-200"
            title="톡톡 상담하기"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>

          {/* 4. Naver Map Link (Green Circle Button) */}
          <a
            href="https://map.naver.com/p/entry/place/2040610373?placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607041746%26locale%3Dko%26svcName%3Dmap_pcv5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full shadow-xl hover:scale-110 transition-all duration-200 cursor-pointer overflow-hidden"
            title="네이버 지도에서 보기"
          >
            <img
              src="/naver-map-icon.png"
              alt="네이버 지도"
              className="w-full h-full object-cover"
            />
          </a>
        </>
      )}

      {/* Toggle Open/Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-600 shadow-xl hover:bg-zinc-100 hover:scale-110 transition-all duration-200 cursor-pointer border border-zinc-300"
        title={isOpen ? "메뉴 접기" : "메뉴 펼치기"}
      >
        {isOpen ? (
          // Close (X) icon
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Plus (+) icon
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>

    </div>
  );
}
