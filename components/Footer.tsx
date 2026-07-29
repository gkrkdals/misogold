"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 text-zinc-600 border-t border-zinc-200 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* Column 1: Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-zinc-900 tracking-wider">
            <span className="text-gold">미소</span>금거래소
          </h3>
          <p className="text-xs">
            © {currentYear} Miso Gold Exchange. All rights reserved.
          </p>
        </div>

        {/* Column 2: Business License details */}
        <div className="space-y-4 text-xs">
          <h4 className="text-sm font-bold text-zinc-900 tracking-wider">사업자 정보</h4>
          <ul className="space-y-2">
            <li>상호명: 미소금거래소</li>
            <li>대표자: 전진호</li>
            <li>사업자등록번호: 271-10-03331</li>
            <li>소재지: 경기도 이천시 이섭대천로 1273(창전동), 1층 101호</li>
          </ul>
        </div>

        {/* Column 3: CS Center & Bank Account Info */}
        <div className="space-y-4 text-xs">
          <h4 className="text-sm font-bold text-zinc-900 tracking-wider">고객 센터</h4>
          <ul className="space-y-2">
            <li className="text-base font-bold text-gold-dark">대표전화: 031-636-3060 / 010-7634-2231</li>
            <li>이메일: junjingold@naver.com</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
