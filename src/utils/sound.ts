import { Howl } from "howler";

import { AUDIO_VOLUME } from "@/constants/audio";

const cache = new Map<string, Howl>();

export function createSound(
  src: string,
  options?: Partial<{ loop: boolean; volume: number; html5: boolean }>,
): Howl {
  const cached = cache.get(src);
  if (cached) return cached;

  const howl = new Howl({
    src: [src],
    loop: options?.loop ?? false,
    volume: options?.volume ?? AUDIO_VOLUME.SFX,
    html5: options?.html5 ?? false,
    preload: true,
  });

  cache.set(src, howl);
  return howl;
}

export function playOneShot(src: string): void {
  const howl = createSound(src);
  howl.play();
}

export function unloadSound(src: string): void {
  const howl = cache.get(src);
  if (howl) {
    howl.unload();
    cache.delete(src);
  }
}
