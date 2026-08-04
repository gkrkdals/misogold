"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import GoldChart from "./GoldChart";

interface PriceItem {
  id?: number;
  type: string;
  buyPrice: string | number;
  sellPrice: string | number;
}

interface HeroBannerProps {
  initialPrices?: PriceItem[];
}

export default function HeroBanner({ initialPrices }: HeroBannerProps) {
  const prices = initialPrices || [];
  const [todayDate, setTodayDate] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    const d = new Date();
    setTodayDate(`${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsZoomOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = isZoomOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  const formatPrice = (price: string | number) => {
    const str = String(price).trim();
    if (!str) return "시세문의";

    const cleanNumStr = str.replace(/,/g, "");
    if (/^\d+$/.test(cleanNumStr)) {
      const num = parseInt(cleanNumStr, 10);
      return `${num.toLocaleString()} 원`;
    }
    return str;
  };

  return (
    <section id="hero" className="relative bg-white overflow-hidden pb-16 sm:pb-24">

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 flex flex-col items-center gap-6 w-full z-10 pt-10 sm:pt-14">
        <div
          className="w-full cursor-zoom-in bg-white border border-gold/50 rounded-2xl p-4 sm:p-6"
          onDoubleClick={() => setIsZoomOpen(true)}
          title="더블클릭해서 확대 보기"
        >
          {/* Logo and Title above the table */}
          <div id="today-price" className="flex flex-col items-center gap-2">
            <div className="mt-2 flex items-center gap-2 sm:gap-3">
              <Image
                src="/miso-logo.png"
                alt="미소금거래소"
                width={327}
                height={335}
                priority
                className="h-20 sm:h-28 w-auto"
              />
              <span className="whitespace-nowrap text-xl sm:text-3xl font-extrabold tracking-tight text-gold-dark">
                미소금거래소
              </span>
              <Image
                src="/hero-gold-bars.png"
                alt=""
                aria-hidden="true"
                width={727}
                height={584}
                priority
                className="h-12 sm:h-20 w-auto"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-700">
              오늘의 시세표
            </h2>
          </div>

          {/* Unit and Date Row */}
          <div className="flex justify-between items-center w-full text-lg sm:text-xl font-semibold text-zinc-500 mb-2 px-1">
            <span className="text-xs sm:text-sm">단위 : 3.75g 한돈 기준</span>
            <span>{todayDate}</span>
          </div>

          {/* 2. Gold Prices Table (Dark/Gold theme transparent with horizontal lines) */}
          <div className="w-full bg-transparent border-none">
            <div className="overflow-x-auto">
              <table className="min-w-full text-center">
                <thead>
                  <tr className="bg-transparent text-zinc-500 font-sans border-t border-b border-gold/30">
                    <th scope="col" className="px-2 py-1 sm:px-6 sm:py-1.5 text-[11px] sm:text-[16px] xl:text-[18px] font-bold tracking-wider text-gold-dark">
                      <span className="hidden sm:inline">구분 (품목)</span>
                  
                      <span className="sm:hidden">품목</span>
                    </th>
                    <th scope="col" className="px-2 py-1 sm:px-6 sm:py-1.5 text-[11px] sm:text-[16px] xl:text-[18px] font-bold tracking-wider text-zinc-900">
                      <span className="hidden sm:inline">내가 살 때</span>
                      <span className="sm:hidden">내가 살 때</span>
                    </th>
                    <th scope="col" className="px-2 py-1 sm:px-6 sm:py-1.5 text-[11px] sm:text-[16px] xl:text-[18px] font-bold tracking-wider text-zinc-900">
                      <span className="hidden sm:inline">내가 팔 때</span>
                      <span className="sm:hidden">내가 팔 때</span>
                    </th>
                  </tr>
                  <tr className="border-b border-gold/30">
                    <th colSpan={3} className="px-2 py-1.5 sm:py-2 text-[12px] sm:text-[16px] xl:text-[17px] font-bold tracking-tight text-gold-dark">
                      * 추가적인 차감 없이 시세표 그대로 매입합니다 *
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gold/20">
                  {prices.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-2 py-16 text-sm font-medium text-zinc-500">
                        현재 등록된 금시세 정보가 없습니다. 전화 또는 카카오톡으로 실시간 시세를 문의해 주세요.
                      </td>
                    </tr>
                  ) : (
                    prices.map((item, index) => (
                      <tr key={index} className="hover:bg-amber-50 transition-colors duration-150">
                        <td className="whitespace-nowrap px-2 py-1.5 sm:px-6 sm:py-2 text-[11px] sm:text-[16px] xl:text-[18px] font-semibold text-gold-dark">{item.type}</td>
                        <td className="whitespace-nowrap px-2 py-1.5 sm:px-6 sm:py-2 text-[11px] sm:text-[16px] xl:text-[18px] font-extrabold text-zinc-900">
                          {formatPrice(item.buyPrice)}
                        </td>
                        <td className="whitespace-nowrap px-2 py-1.5 sm:px-6 sm:py-2 text-[11px] sm:text-[16px] xl:text-[18px] font-extrabold text-zinc-900">
                          {formatPrice(item.sellPrice)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Purchase promise notice */}
          <div className="mt-6 text-center">
            <h3 className="text-base sm:text-2xl font-extrabold tracking-tight text-zinc-900">
              최고가 매입 최저가 판매로<br className="sm:hidden" /> 정성껏 모시겠습니다
            </h3>
            <div className="mt-3 rounded-xl border-2 border-gold/50 px-3 py-5 sm:px-8 sm:py-6 text-[11px] sm:text-[15px] font-bold text-zinc-800">
              <p>순금, 18K, 14K 모든 제품 매입 및 할인가 판매</p>
              <p>치금, 은수저 등 모든 금/은제품 매입합니다.</p>
              <p>GIA, 우신, 현대 다이아매입전문</p>
              <p>감정서 없는 다이아몬드도 고가 매입해드립니다.</p>
              <p>작은 양이라도 정성껏 매입합니다.</p>
            </div>
          </div>
        </div>

        {/* 3. Real-time TradingView Chart */}
        <div className="w-full">
          <GoldChart />
        </div>
      </div>

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="시세표 확대 보기"
        >
          <div
            className="mx-auto h-full max-w-6xl overflow-y-auto overflow-x-hidden rounded-2xl border border-gold/30 bg-white/95 p-4 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="rounded-md border border-gold/40 px-3 py-1.5 text-sm font-semibold text-gold-dark hover:bg-gold/10"
              >
                닫기
              </button>
            </div>

            <div>
              <div className="flex justify-between items-center w-full text-lg sm:text-xl font-semibold text-zinc-700 mb-3 px-2 sm:px-6">
                <span className="text-xs sm:text-sm">단위 : 3.75g 한돈 기준</span>
                <span>{todayDate}</span>
              </div>

              <div className="w-full bg-transparent border-none">
                <div className="overflow-x-hidden">
                  <table className="w-full table-fixed text-center">
                    <thead>
                      <tr className="bg-transparent text-zinc-700 font-sans border-t border-b border-gold/25">
                        <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-[13px] sm:text-[18px] lg:text-[20px] font-bold tracking-wider text-gold-dark">
                          <span className="hidden sm:inline">구분 (품목)</span>
                          <span className="sm:hidden">품목</span>
                        </th>
                        <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-[13px] sm:text-[18px] lg:text-[20px] font-bold tracking-wider text-zinc-900">
                          <span className="hidden sm:inline">내가 살 때</span>
                          <span className="sm:hidden">내가 살 때</span>
                        </th>
                        <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-[13px] sm:text-[18px] lg:text-[20px] font-bold tracking-wider text-zinc-900">
                          <span className="hidden sm:inline">내가 팔 때</span>
                          <span className="sm:hidden">내가 팔 때</span>
                        </th>
                      </tr>
                      <tr className="border-b border-gold/25">
                        <th colSpan={3} className="px-2 py-2.5 sm:py-3 text-[14px] sm:text-[18px] lg:text-[19px] font-bold tracking-tight text-gold-dark">
                          * 추가적인 차감 없이 시세표 그대로 매입합니다 *
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-gold/20">
                      {prices.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-2 py-16 text-base font-medium text-zinc-500">
                            현재 등록된 금시세 정보가 없습니다. 전화 또는 카카오톡으로 실시간 시세를 문의해 주세요.
                          </td>
                        </tr>
                      ) : (
                        prices.map((item, index) => (
                          <tr key={`zoom-${index}`} className="hover:bg-amber-50 transition-colors duration-150">
                            <td className="px-2 py-3 sm:px-6 sm:py-4 text-[13px] sm:text-[18px] lg:text-[20px] font-semibold text-gold-dark wrap-break-word">{item.type}</td>
                            <td className="px-2 py-3 sm:px-6 sm:py-4 text-[13px] sm:text-[18px] lg:text-[20px] font-extrabold text-zinc-900 wrap-break-word">
                              {formatPrice(item.buyPrice)}
                            </td>
                            <td className="px-2 py-3 sm:px-6 sm:py-4 text-[13px] sm:text-[18px] lg:text-[20px] font-extrabold text-zinc-900 wrap-break-word">
                              {formatPrice(item.sellPrice)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Purchase promise notice */}
              <div className="mt-8 text-center">
                <h3 className="text-lg sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                  최고가 매입 최저가 판매로<br className="sm:hidden" /> 정성껏 모시겠습니다
                </h3>
                <div className="mt-4 rounded-xl border-2 border-gold/50 px-3 py-5 sm:px-8 sm:py-7 text-[12px] sm:text-[17px] font-bold text-zinc-800">
                  <p>순금, 18K, 14K 모든 제품 매입 및 할인가 판매</p>
                  <p>치금, 은수저 등 모든 금/은제품 매입합니다.</p>
                  <p>GIA, 우신, 현대 다이아매입전문</p>
                  <p>감정서 없는 다이아몬드도 고가 매입해드립니다.</p>
                  <p>작은 양이라도 정성껏 매입합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
