"use client";

import React, { useEffect, useRef, useState } from "react";

interface ChartCardProps {
  label: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ChartCard = ({ label, containerRef }: ChartCardProps) => {
  return (
    <div className="w-full flex flex-col justify-center p-1.5 sm:p-3 rounded-xl sm:rounded-3xl bg-white border border-gold/50 relative overflow-hidden group backdrop-blur-md">
      {/* Subtle interior glow effect */}
      <div className="absolute top-[-30%] right-[-30%] w-[60%] h-[60%] rounded-full bg-zinc-500/5 blur-[50px] pointer-events-none" />

      {/* Card label — mobile only; on desktop the widget shows its own symbol info */}
      <div className="pt-1 text-center text-[11px] font-bold text-gold-dark z-10 relative sm:hidden">
        {label}
      </div>

      {/* TradingView Widget Target Div */}
      <div className="w-full h-[110px] sm:h-[176px] z-10 relative overflow-hidden">
        <div ref={containerRef} className="w-full h-full">
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GoldChart() {
  const goldRef = useRef<HTMLDivElement>(null);
  const silverRef = useRef<HTMLDivElement>(null);
  const usdRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // Track the sm breakpoint so the widgets can be rebuilt with the right config
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isDesktop === null) return;

    const createWidget = (
      ref: React.RefObject<HTMLDivElement | null>,
      symbol: string,
      color: string
    ) => {
      if (!ref.current) return;
      ref.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        locale: "ko",
        dateRange: "3M",
        colorTheme: "light",
        trendLineColor: color,
        underLineColor: color.replace("1)", "0.15)"),
        underLineBottomColor: color.replace("1)", "0)"),
        isTransparent: true,
        autosize: true,
        chartOnly: !isDesktop,
        largeChartUrl: ""
      });
      ref.current.appendChild(script);
    };

    createWidget(goldRef, "TVC:GOLD", "rgba(245, 158, 11, 1)");      // Gold (amber-500)
    createWidget(silverRef, "TVC:SILVER", "rgba(156, 163, 175, 1)");  // Silver (zinc-400)
    createWidget(usdRef, "FX_IDC:USDKRW", "rgba(59, 130, 246, 1)");   // USD/KRW (blue-500)
  }, [isDesktop]);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full">
      <ChartCard label="금 (GOLD)" containerRef={goldRef} />
      <ChartCard label="은 (SILVER)" containerRef={silverRef} />
      <ChartCard label="원/달러" containerRef={usdRef} />
    </div>
  );
}
