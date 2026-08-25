import type { Content } from "./types";
import { en } from "./en";
import { de } from "./de";
import { fr } from "./fr";
import { hi } from "./hi";
import { ta } from "./ta";

export const DEFAULT_LOCALE = "en" as const;

/** Order here is the order shown in the language switcher. */
export const LOCALES = ["en", "de", "fr", "hi", "ta"] as const;

export type Locale = (typeof LOCALES)[number];

export const CONTENT: Record<Locale, Content> = { en, de, fr, hi, ta };

/** Locales other than the default get a URL prefix: /de/, /fr/, /hi/, /ta/. */
export function localeHref(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

/** Scripts that need a looser line-height and slightly different sizing. */
export const INDIC: ReadonlySet<string> = new Set(["hi", "ta"]);

export type { Content };
