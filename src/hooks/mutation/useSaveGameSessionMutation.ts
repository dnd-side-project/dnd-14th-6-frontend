import { useMutation } from "@tanstack/react-query";
import { POST } from "@/server";
import type {
  SaveGameSessionRequestDto,
  SaveGameSessionResponseDto,
} from "@/types/api";

export const useSaveGameSessionMutation = () =>
  useMutation({
    mutationFn: (data: SaveGameSessionRequestDto) =>
      POST<SaveGameSessionResponseDto>("api/games/save", data),
  });
