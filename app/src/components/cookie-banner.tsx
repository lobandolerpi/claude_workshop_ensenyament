"use client";

import * as React from "react";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getConsent,
  saveConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  // "unknown" mentre no s'ha llegit localStorage (SSR / primer paint) → no pinta
  // res, evitant desajust d'hidratació. `null` = encara sense decisió → mostra'l.
  const [decision, setDecision] = React.useState<
    CookieConsent | null | "unknown"
  >("unknown");

  React.useEffect(() => {
    setDecision(getConsent());
  }, []);

  function decide(value: CookieConsent) {
    saveConsent(value);
    setDecision(value);
  }

  // Només es mostra quan hi ha absència de decisió coneguda.
  if (decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentiment de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          Fem servir emmagatzematge local per recordar les teves preferències.
          Pots acceptar-ho o rebutjar-ho.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => decide("rejected")}
          >
            Rebutjar
          </Button>
          <Button size="sm" onClick={() => decide("accepted")}>
            Acceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
