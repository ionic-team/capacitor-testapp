import { root } from './repo.mjs';
import * as cp from './subprocess.mjs';

const stdio = 'inherit';
const cwd = root;

const execNpm = async command => await cp.exec(`npm ${command}`, { cwd });
const runNpm = async (args = []) => await cp.run('npm', args, { cwd, stdio });

export const info = async pkgspec =>
  JSON.parse((await execNpm(`info ${pkgspec} --json`)).stdout);
export const install = async (args = []) => await runNpm(['install', ...args]);
