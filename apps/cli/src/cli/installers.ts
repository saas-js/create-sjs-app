import type { AvailablePackages, Installer } from "~ct3/installers/index.js";
import { availablePackages as t3AvailablePackages } from "~ct3/installers/index.js";
import { buildPkgInstallerMap as t3BuildPkgInstallerMap } from "~ct3/installers/index.js";
import { saasUiInstaller } from "@sui/installer.js";

export const saasUiAvailablePackages = ["saasUI"] as const;

type NoTailwind = Exclude<AvailablePackages, "tailwind">;

export type SaasUiAvailablePackages =
  | typeof saasUiAvailablePackages[number]
  | NoTailwind;

export const availablePackages = [
  ...saasUiAvailablePackages,
  ...t3AvailablePackages,
];

/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // SaasUI
  "@saas-ui/react": "^4.10.2",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;

export type PkgInstallerMap = {
  [pkg in SaasUiAvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: SaasUiAvailablePackages[]
): PkgInstallerMap => ({
  // let create-t3-app do its thing
  ...t3BuildPkgInstallerMap(
    packages.filter(
      (pkg) => !t3AvailablePackages.includes(pkg)
    ) as AvailablePackages[]
  ),
  saasUI: {
    inUse: packages.includes("saasUI"),
    installer: saasUiInstaller,
  },
});
