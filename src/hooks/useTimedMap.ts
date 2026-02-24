import { useCallback, useEffect, useState } from "react";

/**
 * 일정 시간이 지나면 항목이 자동으로 제거되는 Map을 관리하는 훅.
 * 게임 카드 이펙트(정답 fade-out, 오답 shake, 만료 fade-out)처럼
 * 짧은 시간 동안만 유지되는 상태에 사용한다.
 */
export function useTimedMap(timeoutMs: number) {
  const [map, setMap] = useState<Map<string, number>>(() => new Map());

  const add = useCallback((id: string) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(id, Date.now());
      return next;
    });
  }, []);

  const addAll = useCallback((ids: string[]) => {
    setMap((prev) => {
      const next = new Map(prev);
      const now = Date.now();
      for (const id of ids) next.set(id, now);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  useEffect(() => {
    if (map.size === 0) return;
    const timer = setTimeout(() => {
      setMap((prev) => {
        const now = Date.now();
        const next = new Map(prev);
        for (const [id, t] of next) {
          if (now - t > timeoutMs) next.delete(id);
        }
        return next.size === prev.size ? prev : next;
      });
    }, timeoutMs);
    return () => clearTimeout(timer);
  }, [map, timeoutMs]);

  return { map, add, addAll, remove } as const;
}
