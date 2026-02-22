export const queryKeys = {
  users: {
    all: ["users"] as const,
    ranks: (params: unknown) =>
      [...queryKeys.users.all, "ranks", params] as const,
    analysis: (params: unknown) =>
      [...queryKeys.users.all, "analysis", params] as const,
    stats: (params: unknown) =>
      [...queryKeys.users.all, "stats", params] as const,
  },
  games: {
    all: ["games"] as const,
    sessions: (params: unknown) =>
      [...queryKeys.games.all, "sessions", params] as const,
    reports: (params: unknown) =>
      [...queryKeys.games.all, "reports", params] as const,
  },
};
