// TODO Need to write our own because it doesn't accept the additional packages
import { Installer } from "~ct3/installers/index.js";
import { addPackageDependency } from "~ct3/utils/addPackageDependency";

export const saasUiInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@saas-ui/react",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
    ],
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  // define template source and dest

  // fs.copySync(src, dst) template files to project
};
