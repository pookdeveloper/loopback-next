// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import * as fs from 'fs';

export async function main() {
  const files = fs.readdirSync(__dirname);
  for (const f of files) {
    if (!f.endsWith('.js') || f === 'index.js') continue;
    console.log('> %s', f);
    const example = await import(`./${f}`);
    await example.main();
    console.log();
  }
}

if (require.main === module) {
  process.env.FOO = JSON.stringify({bar: 'xyz'});
  main();
}
