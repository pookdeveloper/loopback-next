// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {format} from 'util';
import {main} from '../..';

describe('context examples', () => {
  let logs: string[] = [];
  let originalLog = console.log;

  before(disableConsoleLog);

  it('runs all examples', async () => {
    await main();
    expect(replaceDates(logs)).to.eql(replaceDates(expectedLogs));
  });

  after(restoreConsoleLog);

  function disableConsoleLog() {
    originalLog = console.log;
    console.log = (...args) => {
      logs.push(format(...args));
    };
  }

  function restoreConsoleLog() {
    console.log = originalLog;
    logs = [];
  }

  function replaceDates(items: string[]) {
    return items.map(str => str.replace(/\[\d+[\w\d\-\.\:]+\]/g, '[DATE]'));
  }

  const expectedLogs = [
    '> binding-types.js',
    '[2019-05-26T21:49:04.249Z] (/greet#1) Hello, John',
    '[2019-05-26T21:49:04.249Z] (/greet#2) Hello, John',
    '',
    '> configuration-injection.js',
    '[2019-05-26T21:49:04.250Z] >>>: Hello, Ray',
    '',
    '> context-chain.js',
    '[app] Hello, John!',
    '[request] Hello, John!',
    '[request] Hello, John!',
    '',
    '> context-observation.js',
    'Adding EnglishGreeter',
    '[observer] bind greeters.EnglishGreeter',
    `[view.refresh] ["greeters.EnglishGreeter"]`,
    'Adding ChineseGreeter',
    '[observer] bind greeters.ChineseGreeter',
    `[view.refresh] ["greeters.EnglishGreeter","greeters.ChineseGreeter"]`,
    'Removing ChineseGreeter',
    '[observer] unbind greeters.ChineseGreeter',
    `[view.refresh] ["greeters.EnglishGreeter"]`,
    'Adding ChineseGreeter to request context',
    `[view.refresh] ["greeters.ChineseGreeter","greeters.EnglishGreeter"]`,
    '',
    '> custom-configuration-resolver.js',
    "{ bar: 'abc' }",
    'xyz',
    '',
    '> custom-inject-decorator.js',
    'Hello, John',
    '',
    '> custom-inject-resolve.js',
    'Context: invocation-context Binding: greeter',
    'Injection: Greeter.constructor[0]',
    'Context: invocation-context Binding: greeter',
    'Injection: Greeter.prototype.prefix',
    '[2019-05-26T21:49:04.254Z] Hello, John',
    '',
    '> dependency-injection.js',
    '[2019-05-26T21:49:04.255Z] (en) Hello, Jane!',
    '[2019-05-26T21:49:04.255Z] Hello, John!',
    '[2019-05-26T21:49:04.255Z] (zh) 你好，John！',
    '[2019-05-26T21:49:04.255Z] (en) Hello, Jane!',
    '',
    '> find-bindings.js',
    'greeters.EnglishGreeter',
    "[ 'greeters.EnglishGreeter' ]",
    "[ 'greeters.EnglishGreeter' ]",
    "[ 'greeters.EnglishGreeter', 'greeters.ChineseGreeter' ]",
    "[ 'greeters.EnglishGreeter', 'greeters.ChineseGreeter' ]",
    "[ 'greeters.EnglishGreeter', 'greeters.ChineseGreeter' ]",
    "[ 'greeters.ChineseGreeter', 'greeters.EnglishGreeter' ]",
    '',
    '> injection-without-binding.js',
    'Hello, John',
    '',
    '> interceptor-proxy.js',
    'Adding request id at Greeter.prototype.greet: ' + '[request] 1',
    'Request id found at ' +
      'Converter.prototype.toUpperCase: [request] ' +
      '1',
    'Hello, JOHN',
    '',
    '> parameterized-decoration.js',
    "1: { tags: { prefix: '1' } }",
    "2: { tags: { prefix: '2' } }",
    '1: Hello, John',
    '2: Hello, Jane',
    '',
  ];
});
