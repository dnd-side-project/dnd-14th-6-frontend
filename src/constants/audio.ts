export const AUDIO_PATHS = {
  MAIN_BGM: "/assets/audio/bgm/main-bgm.mp3",
  GAME_BGM: "/assets/audio/bgm/game-bgm.mp3",
  SFX_GAME_ENTER: "/assets/audio/sfx/game-enter.mp3",
  SFX_BUTTON_CLICK: "/assets/audio/sfx/button-click.mp3",
  SFX_CORRECT: "/assets/audio/sfx/correct.mp3",
  SFX_WRONG: "/assets/audio/sfx/wrong.mp3",
  SFX_TYPING: "/assets/audio/sfx/typing.mp3",
  SFX_TIMEOUT: "/assets/audio/sfx/timeout.mp3",
  SFX_PERFECT_CLEAR: "/assets/audio/sfx/perfect-clear.mp3",
  SFX_COUNTDOWN_WARNING: "/assets/audio/sfx/countdown-warning.mp3",
} as const;

export const AUDIO_VOLUME = {
  BGM: 0.3,
  SFX: 0.6,
} as const;

export const COUNTDOWN_WARNING_THRESHOLD = 12;

export type SfxKey = Exclude<keyof typeof AUDIO_PATHS, "MAIN_BGM" | "GAME_BGM">;
