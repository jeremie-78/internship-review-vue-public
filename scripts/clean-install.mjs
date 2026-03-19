#!/usr/bin/env node
/**
 * Nettoie node_modules et package-lock.json puis lance npm install.
 * Utilisable quand "npm install" échoue (erreurs partielles, cache corrompu, etc.).
 */
import { rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const toRemove = [
  'node_modules',
  'apps/vue/node_modules',
  'apps/nuxt/node_modules',
  'package-lock.json',
  // Lock files dans les workspaces = source de conflits avec npm workspaces
  'apps/vue/package-lock.json',
  'apps/nuxt/package-lock.json',
];

for (const p of toRemove) {
  const full = join(root, p);
  if (existsSync(full)) {
    try {
      rmSync(full, { recursive: true, force: true });
      console.log('Supprimé:', p);
    } catch (e) {
      console.warn('Impossible de supprimer', p, e.message);
    }
  }
}

console.log('\nLancement de npm install...\n');
execSync('npm install', { stdio: 'inherit', cwd: root });
