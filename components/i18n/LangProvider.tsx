"use client";

import { createContext, useContext } from "react";
import type { Content, Locale } from "@/content";

type LangValue = { lang: Locale; ui: Content["ui"]; contactPage: Content["contactPage"] };

const LangContext = createContext<LangValue | null>(null);

/** Gives client components (pop-up, form, cookie notice, switcher…) the strings of the current language. */
export function LangProvider({ value, children }: { value: LangValue; children: React.ReactNode }) {
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang() must be used inside <LangProvider>");
  return value;
}
