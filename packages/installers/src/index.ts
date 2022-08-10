import type { PackageManager } from "~/utils/getUserPkgManager.js";
import type {
  AvailablePackages,
  InstallerOptions as t3InstallerOptions,
} from "~ct3/installers/index.js";
import {
  availablePackages as t3AvailablePackages,
  AvailablePackages as t3AvailablePackagesType,
} from "~ct3/installers/index.js";
import { buildPkgInstallerMap as t3BuildPkgInstallerMap } from "~ct3/installers/index.js";
import { saasUiInstaller } from "@sui/installer.js";

export const saasUiAvailablePackages = ["saasUI"] as const;

type t3AvailablePackagesNoTailwind = Exclude<AvailablePackages, "tailwind">;

export type SaasUiAvailablePackages =
  | typeof saasUiAvailablePackages[number]
  | t3AvailablePackagesNoTailwind;

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
  "@chakra-ui/react": "^2.2.6",
  "@emotion/react": "^11",
  "@emotion/styled": "^11",
  "framer-motion": "^6",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  projectName?: string;
}

export type Installer =
  | ((opts: InstallerOptions) => void)
  | ((opts: t3InstallerOptions) => void);

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
    packages
      .filter(
        (pkg) => t3AvailablePackages.includes(pkg) // TODO get rid of this type error
      )
      .map((pkg) => pkg as t3AvailablePackagesType)
  ),
  // add our own addon
  saasUI: {
    inUse: packages.includes("saasUI"),
    installer: saasUiInstaller,
  },
});
