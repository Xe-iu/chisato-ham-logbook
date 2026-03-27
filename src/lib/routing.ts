import type { ProfileModule } from "./profile";

export const availableProfileModules = Object.values(
  import.meta.glob("../content/*/*.astro", { eager: true })
).map((it) => it) as ProfileModule[];
export const availableProfiles = availableProfileModules.map((it) => (it as ProfileModule).profile);

export function buildLangHref(lang: string) {
  return `/${lang}/`;
}

export function buildProfileHref(lang: string, station: string) {
  return `/${lang}/${station}/`;
}

export function getStationsOrdered(lang?: string) {
  const seen = new Set<string>();

  return availableProfiles
    .filter((entry) => !lang || entry.lang === lang)
    .sort((left, right) => {
      if (left.status !== right.status) {
        return left.status === "active" ? -1 : 1;
      }
      return left.callsign.localeCompare(right.callsign, "en");
    })
    .filter((station) => {
      if (seen.has(station.stationId)) {
        return false;
      }
      seen.add(station.stationId);
      return true;
    });
}

export function getMainStationId() {
  return (
    availableProfiles.find((entry) => entry.status === "active")?.stationId ??
    getStationsOrdered()[0].stationId
  );
}
