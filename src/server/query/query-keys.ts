export const queryKeys = {
  users: {
    all: ["users"] as const,
    stats: (params: unknown) =>
      [...queryKeys.users.all, "stats", params] as const,
  },
};
