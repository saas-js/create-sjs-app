import type { PackageJson } from "type-fest";
import path from "path";
import fs from "fs-extra";
import { logNextSteps } from "~/helpers/logNextSteps.js";
import { runCli } from "@/cli/index.js";
import { logger } from "~ct3/utils/logger.js";
import { renderTitle } from "~ct3/utils/renderTitle.js";
import { parseNameAndPath } from "~ct3/utils/parseNameAndPath.js";
import { installDependencies } from "~ct3/helpers/installDependencies.js";
import { initializeGit } from "~ct3/helpers/initGit.js";
import { buildPkgInstallerMap } from "./cli/installers.js";

const main = async () => {
  renderTitle();

  const {
    appName,
    packages,
    flags: { noGit, noInstall },
  } = await runCli();

  logger.info("you selected:", appName, packages);

  const usePackages = buildPkgInstallerMap(packages);

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  // TODO need to write our own,
  // because it doesn't accept the additional packages
  // and we want to be able to output to a monorepo
  const projectDir = await createProject({
    projectName: appDir,
    packages: usePackages,
    noInstall,
  });

  if (!noInstall) {
    // run install in root folder, good enough for monorepos
    installDependencies(projectDir);
  }

  if (!noGit) {
    initializeGit(projectDir);
  }

  logNextSteps({
    projectName: appDir,
    packages: usePackages,
    noInstall,
  });

  // Write name to package.json
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  pkgJson.name = scopedAppName;
  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
