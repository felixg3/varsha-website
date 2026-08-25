/**
 * Legally mandated details for the Impressum (§ 5 DDG).
 *
 * Everything a lawyer would need to check lives in this one file. Any value
 * left as null, or any flag left false, renders a loud review banner at the
 * top of /impressum — so an incomplete legal notice cannot ship quietly.
 * Fill these in, and the banner disappears by itself.
 */

export const LEGAL = {
  name: "Varsha Iyer",
  role: "Konferenzdolmetscherin",

  address: {
    street: "Eichstraße 24",
    postcode: "42349",
    city: "Wuppertal",
    country: "Deutschland",
  },

  email: "mail@varsha.de",

  /**
   * § 5 Abs. 1 Nr. 2 DDG requires an email address plus one further means of
   * rapid, direct electronic contact. This is the public Sipgate Satellite
   * virtual number, deliberately separate from the private mobile that
   * appears on her CV. Confirmed 2026-08-15.
   */
  phone: "+49 15678 248382",
  phoneConfirmed: true,

  /**
   * § 5 Abs. 1 Nr. 5 DDG: protected designations, together with the body and
   * state that conferred them.
   *
   * Two separate things, conferred by two different authorities, so they are
   * listed separately rather than merged:
   *
   *   - the academic degree (akademischer Grad) from Heidelberg, which is
   *     what qualifies her as a conference interpreter;
   *   - the state examination for Hindi–German, conferred by a Land
   *     authority, which is a distinct protected designation.
   *
   * Conference interpreting itself is not a regulated profession in Germany:
   * there is no chamber and no compulsory professional body.
   *
   * Wording should match each certificate. Regierungspräsidium documents are
   * normally phrased "Staatlich geprüfte Dolmetscherin für die <X>e Sprache" —
   * check the original and copy it verbatim.
   */
  titles: [
    {
      kind: "Akademischer Grad",
      title: "Master of Arts (M.A.) Konferenzdolmetschen",
      conferredBy:
        "Ruprecht-Karls-Universität Heidelberg, Bundesrepublik Deutschland",
    },
    {
      kind: "Berufsbezeichnung",
      title: "Staatlich geprüfte Dolmetscherin für die Hindi-Sprache",
      conferredBy: "Regierungspräsidium Karlsruhe, Bundesrepublik Deutschland",
    },
  ],

  /**
   * Set to true only if a Landgericht has additionally sworn her in
   * (allgemein beeidigt / öffentlich bestellt). Passing the state examination
   * and being sworn are two separate things, and only the latter may be
   * advertised as such. If true, name the court in swornBy.
   */
  sworn: false,
  swornBy: null as string | null,

  /**
   * § 27a UStG VAT identification number. Validated against the EU VIES
   * register on 2026-08-15: valid.
   *
   * NOTE — the Steuernummer is deliberately NOT recorded here and NOT
   * published. § 5 DDG asks only for the USt-IdNr. A Steuernummer discloses
   * the responsible Finanzamt and case reference, is a known lever for
   * identity fraud and tax-office phishing, and carries no legal benefit on
   * a website. Keeping it out of the repository also keeps it off GitHub.
   */
  vatId: "DE400195075",
  kleinunternehmer: false,

  /**
   * Shown as the "Stand" date on the Datenschutzerklärung. Bump this by hand
   * whenever the substance changes — deliberately not the build date, so a
   * routine redeploy does not imply the policy was revised.
   */
  privacyLastUpdated: "15. August 2026",

  /** Processors named in the Datenschutzerklärung. */
  processors: {
    hosting: {
      name: "Cloudflare, Inc.",
      address: "101 Townsend Street, San Francisco, CA 94107, USA",
      /**
       * Cloudflare is certified under the EU-U.S. Data Privacy Framework, so
       * transfers rest on an adequacy decision rather than SCCs alone.
       */
      dpfCertified: true,
    },
    telephony: {
      name: "sipgate GmbH",
      address: "Düsseldorf, Deutschland",
    },
  },

  /** Competent supervisory authority for Wuppertal (North Rhine-Westphalia). */
  supervisoryAuthority: {
    name: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
    address: "Postfach 20 04 44, 40102 Düsseldorf",
    phone: "+49 211 38424-0",
    web: "https://www.ldi.nrw.de",
  },
} as const;

/** Which mandatory details are still outstanding. */
export function legalGaps(): string[] {
  const gaps: string[] = [];

  if (!LEGAL.phoneConfirmed) {
    gaps.push(
      "Telefonnummer ist nicht bestätigt — auf der Website und im Lebenslauf stehen zwei verschiedene Nummern.",
    );
  }
  if (LEGAL.vatId === null && LEGAL.kleinunternehmer === null) {
    gaps.push(
      "Umsatzsteuer: entweder USt-IdNr. nach § 27a UStG angeben oder Kleinunternehmerregelung nach § 19 UStG kennzeichnen.",
    );
  }
  return gaps;
}
