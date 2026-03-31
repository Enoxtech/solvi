"use client";

import { useEffect } from "react";

export function PWAInstaller() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration.scope);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    }

    // Handle install prompt
    let deferredPrompt: BeforeInstallPromptEvent | null = null;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      // Could show an "Install App" button here
      console.log("Install prompt captured");
    });

    // Handle online/offline
    const updateOnlineStatus = () => {
      if (!navigator.onLine) {
        window.location.href = "/offline";
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return null;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
