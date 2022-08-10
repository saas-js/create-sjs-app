// TODO Need to write our own because it doesn't accept the additional packages
import { Installer, InstallerOptions } from "@installers/index.js";
import { addPackageDependency } from "@installers/addPackageDependency.js";

export const saasUiInstaller: Installer = ({
  projectDir,
  packages,
}: InstallerOptions) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@saas-ui/react",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  // TODO define template source and dest

  // TODO fs.copySync(src, dst) template files to project
};
