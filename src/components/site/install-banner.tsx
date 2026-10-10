"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share, PlusSquare, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";

/**
 * InstallBanner — a floating "Install Ridgewood App" banner that appears
 * after the welcome gate opens. Triggers the native PWA install prompt on
 * Chrome/Edge/Android. On iOS Safari, shows instructions instead (since iOS
 * doesn't support the beforeinstallprompt event).
 *
 * Behavior:
 *  - Shows automatically when the user lands on the site
 *  - Dismissable with X (remembers dismissal in localStorage for 7 days)
 *  - Hidden if app is already installed
 */

const DISMISS_KEY = "ridgewood-install-dismissed-v1";
const DISMISS_DAYS = 7;

function shouldShowAfterDismiss(): boolean {
  try {
    const v = window.localStorage.getItem(DISMISS_KEY);
    if (!v) return true;
    const dismissedAt = new Date(v).getTime();
    if (Number.isNaN(dismissedAt)) return true;
    const days = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return days >= DISMISS_DAYS;
  } catch {
    return true;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(DISMISS_KEY, new Date().toISOString());
  } catch {
    // ignore
  }
}

export function InstallBanner() {
  const { canInstall, promptInstall, isInstalled, isIOS } = usePWAInstall();
  const [show, setShow] = React.useState(false);
  const [installing, setInstalling] = React.useState(false);

  React.useEffect(() => {
    if (isInstalled) {
      setShow(false);
      return;
    }
    // Only show if not dismissed recently
    if (!shouldShowAfterDismiss()) return;

    // Small delay so it doesn't fight with the welcome gate's exit animation
    const t = setTimeout(() => {
      // Show on:
      //  - Chrome/Edge/Android (canInstall = true) — has the native prompt
      //  - iOS Safari (isIOS = true) — show instructions instead
      if (canInstall || isIOS) {
        setShow(true);
      }
    }, 1800);
    return () => clearTimeout(t);
  }, [canInstall, isIOS, isInstalled]);

  const handleInstall = async () => {
    if (!canInstall) return;
    setInstalling(true);
    const accepted = await promptInstall();
    setInstalling(false);
    if (accepted) setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    rememberDismissal();
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[150] mx-auto max-w-md"
        >
          <div className="relative rounded-2xl bg-navy-gradient border border-gold/40 shadow-luxe p-4 text-cream flex items-start gap-3 overflow-hidden">
            {/* Decorative gold glow */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold/15 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-navy-light/20 blur-[60px] pointer-events-none" />

            {/* Icon */}
            <div className="relative grid place-items-center h-11 w-11 rounded-xl bg-gold/15 border border-gold/30 shrink-0">
              <Download className="h-5 w-5 text-gold" />
            </div>

            {/* Text + button */}
            <div className="relative flex-1 min-w-0">
              <p className="font-heading text-[14px] font-bold text-cream leading-tight">
                Install Ridgewood App
              </p>
              {isIOS && !canInstall ? (
                // iOS instructions
                <>
                  <p className="text-[12px] text-cream/75 mt-0.5 leading-snug">
                    Tap{" "}
                    <Share className="inline h-3.5 w-3.5 align-text-bottom text-gold mx-0.5" />{" "}
                    then{" "}
                    <PlusSquare className="inline h-3.5 w-3.5 align-text-bottom text-gold mx-0.5" />{" "}
                    "Add to Home Screen"
                  </p>
                </>
              ) : (
                // Chrome/Edge/Android — native install prompt
                <p className="text-[12px] text-cream/75 mt-0.5 leading-snug">
                  Quick access to admissions & parent portal — works offline
                </p>
              )}
              {canInstall && (
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-navy-dark font-semibold px-4 py-1.5 text-[12px] hover:shadow-gold transition-all disabled:opacity-60"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  {installing ? "Installing…" : "Install now"}
                </button>
              )}
            </div>

            {/* Dismiss X */}
            <button
              onClick={handleDismiss}
              className="relative grid place-items-center h-7 w-7 rounded-full bg-navy/40 border border-cream/15 text-cream/70 hover:bg-navy hover:text-cream transition-colors shrink-0"
              aria-label="Dismiss install banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
