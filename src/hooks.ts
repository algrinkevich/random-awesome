import { useCallback, useState } from "react";

interface UseIntervalCallProps {
  reset: boolean;
  intervalMs: number
  callback: () => void;
}

export function useIntervalCall({ reset, callback, intervalMs }: UseIntervalCallProps) {
  const [intervalId, setIntervalId] = useState<
    NodeJS.Timeout | null
  >(null);

  const scheduleInterval = useCallback(() => {
    if (intervalId) {
      return;
    }
    const newIntervalId = setInterval(callback, intervalMs);
    setIntervalId(newIntervalId);
  }, [intervalId, callback, intervalMs]);

  if (reset && intervalId) {
    clearInterval(intervalId);
    setIntervalId(null);
  }
  return scheduleInterval;
}
