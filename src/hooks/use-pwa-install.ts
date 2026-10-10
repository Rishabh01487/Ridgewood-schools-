"use client";

import * as React from "react";

/**
 * usePWAInstall — manages the PWA install prompt lifecycle.
 *
 * Captures the browser's `beforeinstallprompt` event (fired by Chrome/Edge/Android
 * when the PWA criteria are met: HTTPS + manifest + service worker + engagement).
 * Stores the event so we can trigger the native install prompt when the user
 * clicks our "Install App" button.
 *
 * Returns:
 *  - canInstall  — true if the browser is ready to show the install prompt
 *  - promptInstall — call this to show the native install prompt (returns true if accepted)
 *  - isInstalled — true if the app is already installed (running in standalone mode)
 *  - isIOS — true if user is on iOS Safari (which doesn't support beforeinstallprompt)
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function detectIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOSDevice =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
  const isStandalone =
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    (window.navigator as any).standalone === true;
  return isIOSDevice && !isStandalone;
}

function detectStandalone() {
  if (typeof window === "undefined") return false;
  return (
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    (window.navigator as any).standalone === true
  );
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);

  React.useEffect(() => {
    // Register the service worker (required for install prompt on Chrome/Android)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.warn("[sw] Registration failed:", err));
    }

    // Already installed? (running in standalone mode)
    if (detectStandalone()) {
      setIsInstalled(true);
      return;
    }

    setIsIOS(detectIOS());

    // Capture the install prompt event so we can trigger it later from our button
    const handler = (e: Event) => {
      e.preventDefault(); // prevent the default mini-infobar
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    return choice.outcome === "accepted";
  };

  return {
    canInstall: !!deferredPrompt,
    promptInstall,
    isInstalled,
    isIOS,
  };
}
