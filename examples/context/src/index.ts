// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import * as fs from 'fs';

export async function main() {
  let files = fs.readdirSync(__dirname);

  // Sort the files by name for consistency
  files = files.filter(f => f.endsWith('.js') && f !== 'index.js').sort();
  for (const name of files) {
    console.log('> %s', name);
    const example = await import(`./${name}`);
    await example.main();
    console.log();
  }
}

if (require.main === module) {
  process.env.FOO = JSON.stringify({bar: 'xyz'});
  // tslint:disable-next-line:no-floating-promises
  main();
}
