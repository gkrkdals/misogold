"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const accumulatedScrollUp = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If mobile menu is open, keep header visible
      if (isMobileMenuOpen) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (diff > 0) {
        // Scrolling down -> hide header and reset accumulated scroll up
        accumulatedScrollUp.current = 0;
        if (currentScrollY > 65) {
          setIsHidden(true);
        }
      } else {
        // Scrolling up -> accumulate how much we scroll up
        accumulatedScrollUp.current += Math.abs(diff);

        // Show if we scrolled up by more than 50px OR we are very close to the top
        if (accumulatedScrollUp.current > 50 || currentScrollY < 15) {
          setIsHidden(false);
        }
      }

      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 transform ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-zinc-200/80 shadow-md py-4"
          : "bg-background/70 backdrop-blur-md border-b border-zinc-200/40 py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <img
              src="/miso-logo.png"
              alt="미소금거래소"
              className="h-14 sm:h-16 w-auto py-1"
            />
            <span className="ml-2 text-lg sm:text-xl font-extrabold tracking-tight text-gold-dark">
              미소금거래소
            </span>
          </button>
        </div>

        <nav className="hidden md:flex md:gap-x-12">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-semibold leading-6 text-zinc-700 hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            홈
          </button>


          <button
            onClick={() => scrollToSection("directions")}
            className="text-sm font-semibold leading-6 text-zinc-700 hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            오시는 길
          </button>
        </nav>

        {/* Contact/CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="tel:010-6655-2299"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gold-dark transition-colors duration-200"
          >
            전화 상담 문의
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-600 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">메뉴 열기</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-background px-6 py-4 shadow-inner">
          <div className="space-y-1 py-2">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-700 hover:bg-zinc-100 hover:text-gold cursor-pointer"
            >
              홈
            </button>


            <button
              onClick={() => scrollToSection("directions")}
              className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-700 hover:bg-zinc-100 hover:text-gold cursor-pointer"
            >
              오시는 길
            </button>
            <a
              href="tel:010-6655-2299"
              className="mt-4 block w-full text-center rounded-lg bg-gold py-2.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-gold-dark"
            >
              전화 상담 문의
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
