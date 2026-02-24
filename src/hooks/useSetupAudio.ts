import { Howler } from "howler";
import { useCallback, useEffect, useRef } from "react";

import { AUDIO_PATHS, AUDIO_VOLUME } from "@/constants/audio";
import { createSound, unloadSound } from "@/utils/sound";

export function useSetupAudio() {
  const bgmRef = useRef<ReturnType<typeof createSound> | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      Howler.mute(true);
    }

    bgmRef.current = createSound(AUDIO_PATHS.MAIN_BGM, {
      loop: true,
      volume: AUDIO_VOLUME.BGM,
    });

    createSound(AUDIO_PATHS.SFX_BUTTON_CLICK);

    bgmRef.current.play();

    return () => {
      const bgm = bgmRef.current;
      if (bgm?.playing()) {
        bgm.fade(bgm.volume(), 0, 500);
        bgm.once("fade", () => {
          unloadSound(AUDIO_PATHS.MAIN_BGM);
        });
      } else {
        unloadSound(AUDIO_PATHS.MAIN_BGM);
      }
      unloadSound(AUDIO_PATHS.SFX_BUTTON_CLICK);
      bgmRef.current = null;
      initializedRef.current = false;
    };
  }, []);

  const playButtonClick = useCallback(() => {
    const sfx = createSound(AUDIO_PATHS.SFX_BUTTON_CLICK);
    sfx.play();
  }, []);

  return { playButtonClick };
}
