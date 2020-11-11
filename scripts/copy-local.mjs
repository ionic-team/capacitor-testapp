import { join } from 'path';

import {
  CORE_PACKAGES,
  CORE_DEV_PACKAGES,
  PLUGIN_PACKAGES,
} from './lib/capacitor.mjs';
import { copy, readJson, rmdir } from './lib/fs.mjs';
import { execute } from './lib/cli.mjs';
import { root } from './lib/repo.mjs';

execute(async () => {
  const corePkgs = [...CORE_PACKAGES, ...CORE_DEV_PACKAGES];
  for (const corePkgName of corePkgs) {
    const src = join(root, '..', 'capacitor', corePkgName);
    const dest = join(root, 'node_modules', '@capacitor', corePkgName);
    await copyLocalPackage(src, dest);
  }

  for (const pluginPkgName of PLUGIN_PACKAGES) {
    const src = join(root, '..', 'capacitor-plugins', pluginPkgName);
    const dest = join(root, 'node_modules', '@capacitor', pluginPkgName);
    await copyLocalPackage(src, dest);
  }
});

async function copyLocalPackage(src, dest) {
  console.log(`copy ${src} to ${dest}`);

  await rmdir(dest, { recursive: true });

  const srcPkgJsonPath = join(src, 'package.json');
  const destPkgJsonPath = join(dest, 'package.json');

  console.log(`  - ${srcPkgJsonPath} to ${destPkgJsonPath}`);
  await copy(srcPkgJsonPath, destPkgJsonPath);

  const pkgJson = await readJson(srcPkgJsonPath);
  if (pkgJson.files) {
    await Promise.all(
      pkgJson.files.map(async f => {
        f = f.split('/')[0];
        const srcFile = join(src, f);
        const destFile = join(dest, f);
        console.log(`  - ${srcFile} to ${destFile}`);
        await copy(srcFile, destFile);
      }),
    );
  }

  console.log('');
}
