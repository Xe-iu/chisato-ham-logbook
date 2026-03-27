import type { LocaleId, StationStatus } from "./i18n";

export interface ProfileSection {
  id: string;
  label: string;
}

export interface ProfileMeta {
  lang: LocaleId;
  stationId: string;
  callsign: string;
  status: StationStatus;
  pageTitle: string;
  hero: {
    blurb: string;
    quote: string;
    quoteSource?: string;
  };
}

export interface ProfileModule {
  default: unknown;
  profile: ProfileMeta;
  sections: readonly ProfileSection[];
}
