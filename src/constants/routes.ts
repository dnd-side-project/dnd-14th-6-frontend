export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REPORT: "/report",
  RANKING: "/ranking",
  GAME: "/game",
  GAME_PLAY: "/game/play",
  GAME_RESULT: "/game/result",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.GAME,
  ROUTES.GAME_PLAY,
  ROUTES.GAME_RESULT,
] as const;
