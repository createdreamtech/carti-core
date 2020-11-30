export type Uri = string;
export type LocationType = string;
/**
 *
 * Cartesi Machine Configuration
 *
 */
export interface MirrorConfig {
  uri: Uri;
  locationType: LocationType;
}