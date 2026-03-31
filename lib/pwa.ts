"use client";

export function installPWAListener() {
  if (typeof window === "undefined") return;

  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration.scope);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    });
  }

  // Handle online/offline
  const updateOnlineStatus = () => {
    if (!navigator.onLine) {
      window.location.href = "/offline";
    }
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
}
