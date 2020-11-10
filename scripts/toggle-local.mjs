import { resolve } from 'path';

import {
  CORE_PACKAGES,
  CORE_DEV_PACKAGES,
  PLUGIN_PACKAGES,
} from './lib/capacitor.mjs';
import { execute } from './lib/cli.mjs';
import { readJson } from './lib/fs.mjs';
import { root } from './lib/repo.mjs';
import { install } from './lib/npm.mjs';
import {
  getLatestVersion,
  setPackageJsonDependencies,
} from './lib/version.mjs';

execute(async () => {
  const path = resolve(root, 'package.json');
  const packageJson = await readJson(path);

  const dependencies = {
    ...Object.fromEntries(
      await Promise.all(
        CORE_PACKAGES.map(async project => [
          `@capacitor/${project}`,
          packageJson.dependencies[`@capacitor/${project}`].startsWith('file:')
            ? `^${await getLatestVersion(`@capacitor/${project}`, 'next')}`
            : `file:../capacitor/${project}`,
        ]),
      ),
    ),
    ...Object.fromEntries(
      await Promise.all(
        PLUGIN_PACKAGES.map(async project => [
          `@capacitor/${project}`,
          packageJson.dependencies[`@capacitor/${project}`].startsWith('file:')
            ? `^${await getLatestVersion(`@capacitor/${project}`)}`
            : `file:../capacitor-plugins/${project}`,
        ]),
      ),
    ),
  };

  const devDependencies = {
    ...Object.fromEntries(
      await Promise.all(
        CORE_DEV_PACKAGES.map(async project => [
          `@capacitor/${project}`,
          packageJson.devDependencies[`@capacitor/${project}`].startsWith(
            'file:',
          )
            ? `^${await getLatestVersion(`@capacitor/${project}`, 'next')}`
            : `file:../capacitor/${project}`,
        ]),
      ),
    ),
  };

  await setPackageJsonDependencies(path, dependencies);
  await setPackageJsonDependencies(path, devDependencies, 'devDependencies');
  await install();
});
