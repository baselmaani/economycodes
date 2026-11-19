"use client";

import { useEffect } from "react";

import {
  classifyContactHref,
  contactEventNames,
  pushDataLayer,
} from "@/lib/analytics";

/**
 * One delegated listener for every call / WhatsApp / email link on the site,
 * so the (server-rendered) buttons need no client JS of their own. Where the
 * click happened comes from the nearest `data-track-location` attribute.
 */
export function ContactClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const channel = classifyContactHref(link.getAttribute("href") ?? "");
      if (!channel) return;
      const location =
        link.closest<HTMLElement>("[data-track-location]")?.dataset
          .trackLocation ?? "content";
      pushDataLayer(contactEventNames[channel], { link_location: location });
    }

    // Capture phase: still fires if a handler further down stops propagation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
