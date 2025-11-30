// src/pages/FAQSection.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

const faqs = [
  { qKey: "faq.items.0.q", aKey: "faq.items.0.a" },
  { qKey: "faq.items.1.q", aKey: "faq.items.1.a" },
  { qKey: "faq.items.2.q", aKey: "faq.items.2.a" },
  { qKey: "faq.items.3.q", aKey: "faq.items.3.a" },
  { qKey: "faq.items.4.q", aKey: "faq.items.4.a" },
  { qKey: "faq.items.5.q", aKey: "faq.items.5.a" },
  { qKey: "faq.items.6.q", aKey: "faq.items.6.a" },
  { qKey: "faq.items.7.q", aKey: "faq.items.7.a" },
  { qKey: "faq.items.8.q", aKey: "faq.items.8.a" },
  { qKey: "faq.items.9.q", aKey: "faq.items.9.a" },
  { qKey: "faq.items.10.q", aKey: "faq.items.10.a" },
  { qKey: "faq.items.11.q", aKey: "faq.items.11.a" },
  { qKey: "faq.items.12.q", aKey: "faq.items.12.a" },
  { qKey: "faq.items.13.q", aKey: "faq.items.13.a" },
  { qKey: "faq.items.14.q", aKey: "faq.items.14.a" },
  { qKey: "faq.items.15.q", aKey: "faq.items.15.a" },
  { qKey: "faq.items.16.q", aKey: "faq.items.16.a" },
  { qKey: "faq.items.17.q", aKey: "faq.items.17.a" },
];

const FAQSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    const children = Array.from(el.children);
    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    setActiveIndex(bestIdx);
  }, []);

  const scrollToIndex = useCallback((index) => {
    const el = containerRef.current;
    if (!el) return;
    const child = el.children[index];
    if (!child) return;
    const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const id = setTimeout(() => scrollToIndex(0), 60);
    return () => clearTimeout(id);
  }, [scrollToIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        handleScroll();
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [handleScroll]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        scrollToIndex(Math.min(activeIndex + 1, faqs.length - 1));
      } else if (e.key === "ArrowLeft") {
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, scrollToIndex]);

  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-slate-900/60 via-slate-900 to-slate-900/80">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          {t("faq.title", "Frequently Asked Questions")}
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 max-w-2xl mx-auto mb-8">
          {t(
            "faq.subtitle",
            "Common questions about CareSync and how it helps patients, doctors and pharmacists."
          )}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <button
          aria-label="Previous"
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shadow-md hidden md:flex"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12 15L7 10l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          aria-label="Next"
          onClick={() => scrollToIndex(Math.min(activeIndex + 1, faqs.length - 1))}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shadow-md hidden md:flex"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div
          ref={containerRef}
          role="list"
          aria-label={t("faq.carouselLabel", "FAQ carousel")}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 md:px-8 py-6 flex gap-6 items-stretch"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {faqs.map((faq, idx) => {
            const isActive = idx === activeIndex;
            return (
              <article
                key={faq.qKey + idx}
                role="listitem"
                tabIndex={0}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(idx)}
                className={`
                  snap-center
                  flex-none
                  rounded-2xl
                  p-6 md:p-8
                  transition-transform duration-300 ease-in-out
                  transform
                  ${isActive ? "scale-105 z-10" : "scale-95 z-0"}
                  ${isActive ? "shadow-2xl" : "shadow-md"}
                  ${isActive ? "opacity-100" : "opacity-80"}
                  cursor-pointer
                  bg-gradient-to-b from-white/95 to-white/90 text-slate-900
                  dark:from-slate-800 dark:to-slate-900 dark:text-slate-100
                  border border-slate-200/20 dark:border-slate-700/30
                `}
                // remove inline minWidth; CSS below controls responsive widths
              >
                <h3 className="text-lg md:text-xl font-semibold mb-3">
                  {t(faq.qKey)}
                </h3>

                <div className="text-sm md:text-base leading-relaxed max-h-[160px] overflow-y-auto pr-2">
                  {t(faq.aKey)}
                </div>

                {/* Screen-reader only indicator for accessibility */}
                {isActive && (
                  <span className="sr-only">{t("faq.srActive", "Active slide")}</span>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {faqs.map((_, i) => (
            <button
              key={`dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === activeIndex ? "scale-125 bg-emerald-400" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 639px) {
          section article { min-width: 80vw; max-width: 80vw; }
        }
        @media (min-width: 640px) and (max-width: 767px) {
          section article { min-width: 45vw; max-width: 45vw; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          section article { min-width: 30vw; max-width: 30vw; }
        }
        @media (min-width: 1024px) {
          section article { min-width: 22vw; max-width: 22vw; }
        }

        section ::-webkit-scrollbar { height: 10px; }
        section ::-webkit-scrollbar-track { background: transparent; }
        section ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
