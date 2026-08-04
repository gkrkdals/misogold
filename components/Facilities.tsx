"use client";

import React from "react";

export default function Facilities() {
  const items = [
    {
      name: "무료주차",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="3" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 16V8h3a2.5 2.5 0 010 5h-3" />
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
          {/* Paw print */}
          <circle cx="6" cy="10.5" r="1.7" strokeWidth={1.5} />
          <circle cx="10" cy="7" r="1.7" strokeWidth={1.5} />
          <circle cx="14" cy="7" r="1.7" strokeWidth={1.5} />
          <circle cx="18" cy="10.5" r="1.7" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12.5c-2.6 0-4.7 2.1-4.7 4.2 0 1.5 1.2 2.6 2.6 2.6.8 0 1.4-.3 2.1-.3s1.3.3 2.1.3c1.4 0 2.6-1.1 2.6-2.6 0-2.1-2.1-4.2-4.7-4.2z" />
        </svg>
      ),
    },
    {
      name: "남/녀 화장실 구분",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Male / divider / female pictograms */}
          <circle cx="7" cy="4.8" r="1.8" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7.5v5.5m0 0l-1.8 6.2M7 13l1.8 6.2M4.3 9.3h5.4" />
          <path strokeLinecap="round" strokeWidth={1.2} d="M12 4v16" />
          <circle cx="17" cy="4.8" r="1.8" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7.5l-2.4 6.7h4.8L17 7.5zm-1.2 6.7v5m2.4-5v5" />
        </svg>
      ),
    },
    {
      name: "장애인 편의시설",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Wheelchair icon */}
          <circle cx="10" cy="4.3" r="1.8" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6.5v6.5h5.5l2.5 5.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.3 19.4a4.6 4.6 0 11-6.6-6.2" />
        </svg>
      ),
    },
    {
      name: "예약",
      icon: (
        <svg className="w-8 h-8 text-zinc-500 group-hover:text-gold transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Calendar with check */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14.5l2 2 4-4" />
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
