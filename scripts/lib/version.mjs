import { readJson, writeJson } from './fs.mjs';
import { info } from './npm.mjs';

export const setPackageJsonDependencies = async (
  path,
  packages,
  key = 'dependencies',
) => {
  const pkg = await readJson(path);

  for (const [dep, version] of Object.entries(packages)) {
    pkg[key][dep] = version;
  }

  await writeJson(path, pkg);
};

export const getLatestVersion = async (pkg, distTag = 'latest') =>
  (await info(`${pkg}@${distTag}`)).version;
