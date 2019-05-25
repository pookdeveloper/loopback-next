// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import * as debugFactory from 'debug';
import {main} from '../../__examples__';

const debug = debugFactory('loopback:context:test');

describe('__examples__', () => {
  let originalLog = console.log;

  before(disableConsoleLog);

  it('runs all examples', async () => {
    await main();
  });

  after(restoreConsoleLog);

  function disableConsoleLog() {
    originalLog = console.log;
    console.log = debug;
  }

  function restoreConsoleLog() {
    console.log = originalLog;
  }
});
