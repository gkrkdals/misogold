"use client";

import React from "react";

export default function AboutUs() {
  return (
    <section id="about-us" className="py-24 bg-zinc-50 border-y border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Values & Details */}
          <div>
            <h2 className="text-base font-semibold leading-7 text-gold uppercase tracking-wider">WHY JEONJIN GOLD</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              믿을 수 있는 금 거래의 기준
            </p>
            <p className="mt-6 text-base leading-7 text-zinc-600">
              미소금거래소는 다년간의 귀금속 매매 노하우와 철저한 직영 시스템을 바탕으로, 
              고객님의 소중한 자산을 가감 없이 정직하게 평가합니다.
            </p>

            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-zinc-600">
              
              <div className="relative pl-12">
                <dt className="inline font-bold text-zinc-900">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  정확하고 투명한 감정
                </dt>{" "}
                <dd className="mt-1 block text-sm text-zinc-500">
                  고도화된 고정밀 분석 기기를 활용하여 고객님의 귀금속(24K, 18K, 14K, 치금, 은 등) 함량을 눈앞에서 투명하게 측정 및 감정합니다.
                </dd>
              </div>

              <div className="relative pl-12">
                <dt className="inline font-bold text-zinc-900">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  업계 최고가 매입 실현
                </dt>{" "}
                <dd className="mt-1 block text-sm text-zinc-500">
                  중간 유통 단계를 대폭 생략한 직접 수출 및 가공 직영 채널을 통해 수수료를 절감하고, 당일 최고 수준의 마진 없는 매입 단가를 제시합니다.
                </dd>
              </div>

              <div className="relative pl-12">
                <dt className="inline font-bold text-zinc-900">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  철저한 기밀 보장 및 정산
                </dt>{" "}
                <dd className="mt-1 block text-sm text-zinc-500">
                  거래 내역에 대해 철저히 보안을 유지하며, 계좌 이체 또는 즉시 현금 지급 등 고객님이 원하시는 방식으로 신속하고 유연하게 대금을 정산합니다.
                </dd>
              </div>

            </dl>
          </div>

          {/* Right Column: Visual Showcase Placeholder */}
          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col justify-between p-8 text-center shadow-lg relative overflow-hidden">
              <div className="w-full flex justify-between items-center text-zinc-400 font-mono text-[10px]">
                <span>STORE SHOWCASE</span>
                <span>01</span>
              </div>

              <div className="my-auto space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full border border-zinc-300 bg-zinc-200 flex items-center justify-center text-zinc-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-800">매장 외부 & 내부 전경 이미지</h3>
                  <p className="text-xs text-zinc-400 mt-1">고객 대기실과 보안 금고, 1:1 프라이빗 상담석을 보여주는 사진이 배치되는 위치입니다.</p>
                </div>
              </div>

              <div className="w-full text-zinc-400 font-mono text-[10px]">
                [ 400 x 400 Border Placeholder ]
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
