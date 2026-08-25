/**
 * The shape of every locale file.
 *
 * Each of en/de/fr/hi/ta must satisfy this interface exactly. Adding a field
 * here and forgetting one language is a build error, not a silently missing
 * string on a live page — which on a site whose entire proposition is
 * multilingual competence would be the worst possible bug.
 */

export interface Credential {
  label: string;
}

export interface Entry {
  /** Organisation or institution. */
  org: string;
  /** Role held, or degree earned. */
  role: string;
  /** Human-readable period, e.g. "Mar 2025 – Jul 2025". */
  period: string;
  /** One or more descriptive lines. */
  detail: string[];
  /** Optional emphasis flag for the most significant entries. */
  feature?: boolean;
}

export interface LanguageRow {
  name: string;
  level: string;
  /** Professional qualification attached to this language, if any. */
  note?: string;
}

export interface Content {
  /** BCP-47 tag used on <html lang>. */
  htmlLang: string;
  /** Endonym shown in the language switcher. */
  endonym: string;

  meta: {
    title: string;
    description: string;
  };

  nav: {
    about: string;
    practice: string;
    experience: string;
    education: string;
    languages: string;
    contact: string;
    skipToContent: string;
    chooseLanguage: string;
  };

  hero: {
    name: string;
    role: string;
    tagline: string;
    credentials: Credential[];
    ctaContact: string;
    ctaLinkedIn: string;
    portraitAlt: string;
  };

  /** The same sentence rendered in every language, shown under the hero. */
  booth: {
    heading: string;
    note: string;
  };

  about: {
    heading: string;
    paragraphs: string[];
  };

  practice: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };

  experience: {
    heading: string;
    entries: Entry[];
  };

  education: {
    heading: string;
    entries: Entry[];
    qualificationsHeading: string;
    qualifications: string[];
  };

  languages: {
    heading: string;
    intro: string;
    rows: LanguageRow[];
    combinationHeading: string;
    combinationNote: string;
  };

  contact: {
    heading: string;
    intro: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    location: string;
  };

  footer: {
    rights: string;
    imprintNote: string;
  };

  legal: {
    /**
     * Footer link text. Kept as "Impressum" in every language: it is the
     * legally recognised term in Germany and § 5 DDG compliance is judged
     * on German terms, so a translated label is a needless risk.
     */
    impressumLabel: string;
    privacyLabel: string;
    backHome: string;
  };
}
