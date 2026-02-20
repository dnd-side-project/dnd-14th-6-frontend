export const queryKeys = {
  users: {
    all: ["users"] as const,
    analysis: (params: unknown) =>
      [...queryKeys.users.all, "analysis", params] as const,
    stats: (params: unknown) =>
      [...queryKeys.users.all, "stats", params] as const,
  },
};
