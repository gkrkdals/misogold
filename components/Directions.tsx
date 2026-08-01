"use client";

import React from "react";

export default function Directions() {
  const address = "경기도 구리시 이문안로 95, 104호(수택동, 해원빌딩)";
  const naverMapUrl = "https://naver.me/GVVx30K2";

  return (
    <section id="directions" className="py-24 bg-background border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-gold uppercase tracking-wider">LOCATION & CONTACT</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            찾아오시는 길 안내
          </p>
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column: Map Image */}
          <div className="w-full min-h-[400px] rounded-2xl border border-zinc-200 bg-zinc-50 shadow-lg relative overflow-hidden flex flex-col justify-between group">
            <div className="relative w-full h-full min-h-[350px] flex-1">
              <img
                src="/map.png"
                alt="미소금거래소 약도"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-zinc-100 text-zinc-900 flex justify-between items-center z-10">
              <span className="text-xs font-bold">미소금거래소 약도</span>
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-gold-dark transition-all duration-200 cursor-pointer"
              >
                네이버 지도로 보기
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Address and Info */}
          <div className="flex flex-col justify-between space-y-8 bg-zinc-50 border border-zinc-200 rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">

              {/* Address */}
              <div>
                <h4 className="text-xs font-bold text-gold uppercase tracking-wider">주소 및 오시는 길</h4>
                <p className="mt-2 text-lg font-extrabold text-zinc-900 leading-relaxed">
                  {address}
                </p>
                <p className="mt-1 text-xs sm:text-base font-bold text-gold-dark">
                  (수택동 장스365의원/럭키아파트 사거리앞)
                </p>
                {/* <p className="mt-1 text-sm text-zinc-500 font-semibold">
                  * 주차정보: 무료주차 가능
                </p> */}
              </div>

              {/* Business Hours */}
              <div>
                <h4 className="text-xs font-bold text-gold uppercase tracking-wider">이용시간</h4>
                <div className="mt-2 text-sm text-zinc-600 space-y-1">
                  <div className="flex justify-between border-b border-zinc-200 py-1.5">
                    <span className="font-bold">매일</span>
                    <span className="font-mono font-bold text-zinc-900">09:00 - 19:30</span>
                  </div>
                  <div className="py-2 text-emerald-600 font-bold text-base">
                    * 365일 휴일없이 영업합니다^^
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div>
                <h4 className="text-xs font-bold text-gold uppercase tracking-wider">전화번호</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-xl font-extrabold text-zinc-800 font-mono">
                    010-6655-2299
                  </p>
                </div>
              </div>

            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200">
              <a
                href="tel:010-6655-2299"
                className="flex items-center justify-center gap-2 rounded-xl bg-gold py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-gold-dark transition-all duration-150"
              >
                전화 바로 걸기
              </a>
              <a
                href="sms:010-6655-2299?body=안녕하세요. 금 시세 문의드립니다."
                className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-zinc-700 transition-all duration-150"
              >
                문자 문의하기
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
