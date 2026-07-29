"use client";

import React from "react";
import GoldChart from "../GoldChart";

interface PriceItem {
  id?: number;
  type: string;
  buyPrice: number; // 살 때
  sellPrice: number; // 팔 때
}

interface GoldPriceProps {
  initialPrices?: PriceItem[];
}

export default function GoldPrice({ initialPrices }: GoldPriceProps) {
  // If there are no prices in the database, use an empty array
  const prices = initialPrices || [];

  // Format today's date in YYYY년 MM월 DD일
  const today = new Date();
  const lastUpdated = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, "0")}월 ${String(today.getDate()).padStart(2, "0")}일 기준`;

  const formatPrice = (price: number) => {
    if (price === 0) return "시세문의";
    return `${price.toLocaleString()} 원`;
  };

  return (
    <section id="today-price" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-gold uppercase tracking-wider">TODAY'S MARKET PRICE</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            오늘의 금시세 안내
          </p>
          <p className="mt-4 text-sm text-zinc-500 flex items-center justify-center gap-1">
            <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {lastUpdated} <br /> (시세는 시장 상황에 따라 변동될 수 있습니다.)
          </p>
        </div>

        {/* Stacked Layout: Table first, then Chart below */}
        <div className="space-y-12 max-w-4xl mx-auto">

          {/* Admin Managed Gold Prices Table */}
          <div className="overflow-hidden rounded-3xl border border-zinc-200 shadow-xl bg-zinc-50">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 text-center">
                <thead>
                  <tr className="bg-zinc-900 text-white font-sans">
                    <th scope="col" className="px-6 py-4 text-xs font-bold tracking-wider">구분 (품목)</th>
                    <th scope="col" className="px-6 py-4 text-xs font-bold tracking-wider text-amber-400">고객님이 살 때 (VAT 별도)</th>
                    <th scope="col" className="px-6 py-4 text-xs font-bold tracking-wider text-emerald-400">고객님이 팔 때 (최고가 매입)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {prices.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-16 text-sm font-medium text-zinc-500">
                        현재 등록된 금시세 정보가 없습니다. 전화 또는 카카오톡으로 실시간 시세를 문의해 주세요.
                      </td>
                    </tr>
                  ) : (
                    prices.map((item, index) => (
                      <tr key={index} className="hover:bg-zinc-50/80 transition-colors duration-150">
                        <td className="whitespace-nowrap px-6 py-5 text-sm font-bold text-zinc-950">{item.type}</td>
                        <td className="whitespace-nowrap px-6 py-5 text-base font-extrabold text-amber-600">
                          {formatPrice(item.buyPrice)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-5 text-base font-extrabold text-emerald-600">
                          {formatPrice(item.sellPrice)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time TradingView Chart */}
          <div className="w-full">
            <GoldChart />
          </div>

        </div>

      </div>
    </section>
  );
}
