"use client";

import { Howler } from "howler";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { AUDIO_PATHS, AUDIO_VOLUME } from "@/constants/audio";
import { createSound, playOneShot } from "@/utils/sound";

const BGM_ROUTES = new Set(["/", "/ranking", "/report", "/game"]);
const FADE_MS = 800;

export function useMainBGM() {
  const pathname = usePathname();
  const activatedRef = useRef(false);
  const bgmRef = useRef<ReturnType<typeof createSound> | null>(null);
  const fadePauseRef = useRef<(() => void) | null>(null);

  const shouldPlay = BGM_ROUTES.has(pathname);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      Howler.mute(true);
    }

    bgmRef.current = createSound(AUDIO_PATHS.MAIN_BGM, {
      loop: true,
      volume: 0,
    });
  }, []);

  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm) return;

    if (fadePauseRef.current) {
      bgm.off("fade", fadePauseRef.current);
      fadePauseRef.current = null;
    }

    if (shouldPlay && activatedRef.current) {
      if (!bgm.playing()) {
        bgm.volume(0);
        bgm.play();
      }
      bgm.fade(bgm.volume(), AUDIO_VOLUME.BGM, FADE_MS);
    } else if (!shouldPlay && bgm.playing()) {
      bgm.fade(bgm.volume(), 0, FADE_MS);
      const onFade = () => {
        bgm.pause();
        fadePauseRef.current = null;
      };
      fadePauseRef.current = onFade;
      bgm.once("fade", onFade);
    }
  }, [shouldPlay]);

  useEffect(() => {
    if (activatedRef.current) return;

    const activate = () => {
      if (activatedRef.current) return;
      activatedRef.current = true;

      const bgm = bgmRef.current;
      if (bgm && shouldPlay) {
        bgm.volume(0);
        bgm.play();
        bgm.fade(0, AUDIO_VOLUME.BGM, FADE_MS);
      }

      for (const e of events) window.removeEventListener(e, activate);
    };

    const events = ["click", "pointerdown", "touchstart", "keydown"];
    for (const e of events)
      window.addEventListener(e, activate, { once: true });

    return () => {
      for (const e of events) window.removeEventListener(e, activate);
    };
  }, [shouldPlay]);

  useEffect(() => {
    createSound(AUDIO_PATHS.SFX_TYPING);
  }, []);

  useEffect(() => {
    if (pathname === "/game/play") return;

    let throttleTimer: ReturnType<typeof setTimeout> | null = null;

    const handleInput = (e: Event) => {
      const target = e.target;
      if (
        !(
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement
        )
      )
        return;
      if (throttleTimer) return;

      playOneShot(AUDIO_PATHS.SFX_TYPING);
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, 50);
    };

    document.addEventListener("input", handleInput);
    return () => {
      document.removeEventListener("input", handleInput);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [pathname]);
}
