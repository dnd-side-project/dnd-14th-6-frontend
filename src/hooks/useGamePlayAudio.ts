import { Howl, Howler } from "howler";
import { useCallback, useEffect, useRef } from "react";

import { AUDIO_PATHS, AUDIO_VOLUME, type SfxKey } from "@/constants/audio";

interface UseGamePlayAudioOptions {
  muted?: boolean;
}

export function useGamePlayAudio(options: UseGamePlayAudioOptions = {}) {
  const bgmRef = useRef<Howl | null>(null);
  const sfxMapRef = useRef<Map<string, Howl>>(new Map());
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    Howler.mute(options.muted ?? false);
  }, [options.muted]);

  const preloadAll = useCallback(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Howl({
        src: [AUDIO_PATHS.GAME_BGM],
        loop: true,
        volume: AUDIO_VOLUME.BGM,
        preload: true,
        html5: true,
      });
    }

    const sfxKeys: SfxKey[] = [
      "SFX_CORRECT",
      "SFX_WRONG",
      "SFX_TYPING",
      "SFX_TIMEOUT",
      "SFX_PERFECT_CLEAR",
      "SFX_COUNTDOWN_WARNING",
    ];

    for (const key of sfxKeys) {
      if (!sfxMapRef.current.has(key)) {
        const howl = new Howl({
          src: [AUDIO_PATHS[key]],
          volume: AUDIO_VOLUME.SFX,
          preload: true,
        });
        sfxMapRef.current.set(key, howl);
      }
    }
  }, []);

  const playBgm = useCallback(() => {
    const bgm = bgmRef.current;
    if (bgm && !bgm.playing()) {
      bgm.play();
    }
  }, []);

  const stopBgm = useCallback(() => {
    bgmRef.current?.stop();
  }, []);

  const fadeBgmOut = useCallback((duration = 1000) => {
    const bgm = bgmRef.current;
    if (bgm?.playing()) {
      bgm.fade(bgm.volume(), 0, duration);
      bgm.once("fade", () => bgm.stop());
    }
  }, []);

  const playSfx = useCallback((key: SfxKey) => {
    if (key === "SFX_TYPING") {
      if (typingTimerRef.current) return;
      typingTimerRef.current = setTimeout(() => {
        typingTimerRef.current = null;
      }, 50);
    }

    const howl = sfxMapRef.current.get(key);
    if (howl) {
      howl.play();
    }
  }, []);

  const stopAllSfx = useCallback(() => {
    for (const howl of sfxMapRef.current.values()) {
      howl.stop();
    }
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    Howler.mute(muted);
  }, []);

  const cleanup = useCallback(() => {
    bgmRef.current?.unload();
    bgmRef.current = null;
    for (const howl of sfxMapRef.current.values()) {
      howl.unload();
    }
    sfxMapRef.current.clear();
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    preloadAll,
    playBgm,
    stopBgm,
    fadeBgmOut,
    playSfx,
    stopAllSfx,
    cleanup,
    setMuted,
  };
}
