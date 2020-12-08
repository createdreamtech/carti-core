export type BundleType = string;
export type Uri = string;
export type Name = string;
export type Version = string;
export type FileName = string;
export type Id = string;
export type Deps = Id[];
export interface Bundle {
  bundleType: BundleType;
  uri?: Uri;
  name: Name;
  version: Version;
  fileName: FileName;
  deps?: Deps;
  id: Id;
}
export type BundleConfig = Bundle[];
/**
 *
 * Bundle Configuration Schema
 *
 */
export type UnorderedSetOfBundleConfigDK4F1QvR = BundleConfig[];