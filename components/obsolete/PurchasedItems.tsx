"use client";

import React from "react";

interface ItemCard {
  title: string;
  sub: string;
  desc: string;
  icon: React.ReactNode;
}

export default function PurchasedItems() {
  const items: ItemCard[] = [
    {
      title: "골드바 & 실버바",
      sub: "Goldbar & Silverbar",
      desc: "LS-Nikko, 골드나라 등 국내외 브랜드 골드바, 실버바, 순금 덩어리 제품 등을 당일 최고 시세로 매입합니다.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h10M7 16h10" />
        </svg>
      ),
    },
    {
      title: "돌반지 & 아기 제품",
      sub: "Baby Gold Products",
      desc: "돌반지, 돌팔찌, 아기 메달 및 열쇠 등 선물받으신 순금 제품을 중량 손실 없이 최고가로 정밀 감정 후 매입합니다.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
          <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      title: "18K & 14K 귀금속",
      sub: "18K & 14K Jewelry",
      desc: "디자인이 유행 지나 안 끼는 금반지, 끊어진 금목걸이, 한쪽 잃어버린 금귀걸이 등 모든 14K, 18K 귀금속을 매입합니다.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V3m0 16v-3m-5-5H4m16 0h-3" />
        </svg>
      ),
    },
    {
      title: "치과용 폐금 (금이빨)",
      sub: "Dental Gold",
      desc: "인레이, 크라운, 브릿지 등 치과 치료 후 받아오신 치과용 폐금 및 합금을 정확한 함량 분석을 통해 최고가 매입합니다.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H3.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM12 7.25v3.5m0 2.25h.01" />
        </svg>
      ),
    },
    {
      title: "다이아몬드 & 유색보석",
      sub: "Diamond & Gemstones",
      desc: "GIA, 우신, 현대 등 감정서 유무에 관계없이 전문 보석 감정사가 4C(중량, 컬러, 투명도, 컷)를 직접 현장 감정하여 가치를 보장합니다.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "명품시계 & 유가증권",
      sub: "Luxury Watches & Valuables",
      desc: "롤렉스, 오메가, 까르띠에 등 해외 하이엔드 브랜드 시계 및 귀금속 명품 제품을 소장가치와 브랜드 프리미엄을 반영하여 최고가 매입합니다.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="purchased-items" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-gold uppercase tracking-wider">WE BUY EVERYTHING</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            주요 귀금속 매입 품목
          </p>
          <p className="mt-4 text-base text-zinc-500">
            집안에 잠자고 있는 다양한 형태의 금, 은, 보석류 제품을 최고가 시세로 정직하게 매입해 드립니다.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-md hover:shadow-xl hover:border-gold/50 transition-all duration-300 group"
            >
              <div>
                {/* Item Border Placeholder Image */}
                <div className="w-full aspect-[16/10] rounded-xl border border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300 mb-6">
                  <div className="text-center p-4">
                    <span className="inline-block p-3 rounded-full bg-white text-zinc-600 border border-zinc-200 shadow-sm mb-2 group-hover:text-gold group-hover:border-gold/20 transition-all duration-300">
                      {item.icon}
                    </span>
                    <p className="text-[10px] text-zinc-400 font-mono tracking-wider">
                      [ {item.title} 이미지 ]
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gold tracking-widest uppercase font-mono block">
                    {item.sub}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-gold transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-end">
                <a
                  href="tel:010-6655-2299"
                  className="text-xs font-semibold text-gold group-hover:text-gold-dark flex items-center gap-1 cursor-pointer"
                >
                  시세 및 매입 상담 문의 <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
