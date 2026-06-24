import { useEffect, useRef } from "react";
import { registerServiceWorker } from "./registerSW";

export function useNotificationSound(
  currentCount: number | undefined,
  label: string = "New Report",
) {
  const prevCountRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swRegRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/notification.mp3");
    audioRef.current.volume = 0.7;

    // request permission + register SW
    const init = async () => {
      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }
      const reg = await registerServiceWorker();
      if (reg) swRegRef.current = reg;
    };

    init();
  }, []);

  useEffect(() => {
    if (currentCount === undefined) return;

    if (prevCountRef.current === null) {
      prevCountRef.current = currentCount;
      return;
    }

    if (currentCount > prevCountRef.current) {
      // always try to play sound
      audioRef.current?.play().catch(() => {});

      // send notification via service worker (works even when tab is hidden)
      if (Notification.permission === "granted") {
        if (swRegRef.current) {
          swRegRef.current.active?.postMessage({
            type: "SHOW_NOTIFICATION",
            title: "SafeRoute Alert 🚨",
            body: `A new ${label} has been submitted.`,
          });
        }
      }
    }

    prevCountRef.current = currentCount;
  }, [currentCount]);
}
