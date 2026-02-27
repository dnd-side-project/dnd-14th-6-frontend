"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import * as styles from "./page.css";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeOutQuad = (t: number) => 1 - (1 - t) ** 2;
const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const LERP_FACTOR = 0.04;

const PlanetParallax = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const currentY = useRef(0);
  const currentScale = useRef(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const animate = () => {
      const element = wrapperRef.current;
      if (!element) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.max(
        0,
        Math.min(window.scrollY / window.innerHeight, 1),
      );
      const targetY = easeOutCubic(progress) * 30;
      const targetScale = 1 + easeOutQuad(progress) * 0.29;

      currentY.current = lerp(currentY.current, targetY, LERP_FACTOR);
      currentScale.current = lerp(
        currentScale.current,
        targetScale,
        LERP_FACTOR,
      );

      element.style.transform = `translateY(${currentY.current}vh) scale(${currentScale.current})`;
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.planetImageWrapper}>
      <Image
        src="/assets/images/planet.png"
        alt=""
        width={850.96}
        height={703.75}
        className={styles.planetImage}
        priority
      />
    </div>
  );
};

export default PlanetParallax;
