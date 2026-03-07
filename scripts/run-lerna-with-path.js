#!/usr/bin/env node
// Wrapper per far trovare theiaext ai sotto-pacchetti quando Lerna esegue gli script
const path = require('path');
const { spawnSync } = require('child_process');

const rootBin = path.join(process.cwd(), 'node_modules', '.bin');
const newPath = process.platform === 'win32'
  ? `${rootBin};${process.env.PATH}`
  : `${rootBin}:${process.env.PATH}`;

const result = spawnSync(
  'npx',
  ['lerna', 'run', process.argv[2] || 'compile', ...process.argv.slice(3)],
  { stdio: 'inherit', env: { ...process.env, PATH: newPath } }
);
process.exit(result.status || result.signal ? 1 : 0);
