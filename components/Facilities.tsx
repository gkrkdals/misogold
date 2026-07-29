"use client";

import React from "react";

export default function Facilities() {
  const items = [
    {
      name: "예약",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "주차",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2zM9 9h6" />
          <circle cx="8" cy="14" r="2" strokeWidth={1.5} />
          <circle cx="16" cy="14" r="2" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      name: "무선 인터넷",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 15a5 5 0 018 0M5 12a9 9 0 0114 0M2 9a13 13 0 0120 0" />
        </svg>
      ),
    },
    {
      name: "애완동물 동반",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Simple Pet Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      name: "남/녀 화장실 구분",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4a2 2 0 100-4 2 2 0 000 4zM9 11h6a1 1 0 011 1v6a1 1 0 01-1 1h-1v3a1 1 0 01-2 0v-3H9v3a1 1 0 01-2 0v-3H6a1 1 0 01-1-1v-6a1 1 0 011-1h3zm6-7a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      ),
    },
    {
      name: "장애인 편의시설",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Wheelchair simple icon */}
          <circle cx="12" cy="5" r="2" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13a4 4 0 004 4h3m-5 4v-8l3-3m0 0l2 2m-2-2H9" />
        </svg>
      ),
    },
  ];

  return (
    <section id="facilities" className="bg-background py-12 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 py-4">
          
          {/* Left Column: Title Icon */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-sm">
              !
            </div>
            <span className="text-base font-bold text-zinc-600 tracking-tight">이용안내</span>
          </div>

          {/* Right Column: Horizontally Aligned Items */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 md:gap-8 justify-items-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 group cursor-default"
                >
                  <div className="flex items-center justify-center p-2 rounded-xl bg-zinc-100 group-hover:bg-gold/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-zinc-600 group-hover:text-gold transition-colors duration-200 text-center whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
