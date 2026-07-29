"use client";

import React, { useEffect, useRef } from "react";

interface ChartCardProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ChartCard = ({ containerRef }: ChartCardProps) => {
  return (
    <div className="w-full flex flex-col justify-center p-3 rounded-3xl bg-white border border-zinc-200 shadow-2xl relative overflow-hidden group backdrop-blur-md">
      {/* Subtle interior glow effect */}
      <div className="absolute top-[-30%] right-[-30%] w-[60%] h-[60%] rounded-full bg-zinc-500/5 blur-[50px] pointer-events-none" />

      {/* TradingView Widget Target Div */}
      <div className="w-full h-[176px] z-10 relative">
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

  useEffect(() => {
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
        width: "100%",
        height: "176",
        locale: "ko",
        dateRange: "3M",
        colorTheme: "light",
        trendLineColor: color,
        underLineColor: color.replace("1)", "0.15)"),
        underLineBottomColor: color.replace("1)", "0)"),
        isTransparent: true,
        autosize: false,
        largeChartUrl: ""
      });
      ref.current.appendChild(script);
    };

    createWidget(goldRef, "TVC:GOLD", "rgba(245, 158, 11, 1)");      // Gold (amber-500)
    createWidget(silverRef, "TVC:SILVER", "rgba(156, 163, 175, 1)");  // Silver (zinc-400)
    createWidget(usdRef, "FX_IDC:USDKRW", "rgba(59, 130, 246, 1)");   // USD/KRW (blue-500)
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <ChartCard containerRef={goldRef} />
      <ChartCard containerRef={silverRef} />
      <ChartCard containerRef={usdRef} />
    </div>
  );
}
