// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/context
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {
  compareBindingsByTag,
  Context,
  filterByTag,
  Handler,
  HandlerChain,
  Next,
} from '../..';

describe('HandlerChain', () => {
  let ctx: Context;
  let handlerChain: HandlerChain;
  let events: string[];

  beforeEach(givenContext);

  it('invokes handler functions', async () => {
    givenHandlerChain(
      givenNamedHandler('handler1'),
      givenNamedHandler('handler2'),
    );
    const result = await handlerChain.invokeHandlers();
    expect(events).to.eql([
      'before-handler1',
      'before-handler2',
      'after-handler2',
      'after-handler1',
    ]);
    expect(result).to.be.undefined();
  });

  it('honors return value', async () => {
    givenHandlerChain(givenNamedHandler('handler1'), async (context, next) => {
      await next();
      return 'ABC';
    });
    const result = await handlerChain.invokeHandlers();
    expect(result).to.eql('ABC');
  });

  it('skips downstream handlers if next is not invoked', async () => {
    givenHandlerChain(async (context, next) => {
      return 'ABC';
    }, givenNamedHandler('handler2'));
    await handlerChain.invokeHandlers();
    expect(events).to.eql([]);
  });

  it('passes bindings via context', async () => {
    givenHandlerChain(
      async (context, next) => {
        context.bind('foo').to('1-req');
        await next();
        const foo = await context.get('foo');
        expect(foo).to.eql('2-res');
        context.bind('foo').to('1-res');
      },
      async (context, next) => {
        const foo = await context.get('foo');
        expect(foo).to.eql('1-req');
        await next();
        context.bind('foo').to('2-res');
      },
    );

    await handlerChain.invokeHandlers();
    const fooVal = await ctx.get('foo');
    expect(fooVal).to.eql('1-res');
  });

  it('catches error from second handler', async () => {
    givenHandlerChain(givenNamedHandler('handler1'), async (context, next) => {
      events.push('before-handler2');
      throw new Error('error in handler2');
    });
    const resultPromise = handlerChain.invokeHandlers();
    await expect(resultPromise).to.be.rejectedWith('error in handler2');
    expect(events).to.eql(['before-handler1', 'before-handler2']);
  });

  it('catches error from first handler', async () => {
    givenHandlerChain(async (context, next) => {
      events.push('before-handler1');
      await next();
      throw new Error('error in handler1');
    }, givenNamedHandler('handler2'));
    const resultPromise = handlerChain.invokeHandlers();
    await expect(resultPromise).to.be.rejectedWith('error in handler1');
    expect(events).to.eql([
      'before-handler1',
      'before-handler2',
      'after-handler2',
    ]);
  });

  it('allows discovery of handlers in context', async () => {
    const handler1 = givenNamedHandler('handler1');
    const handler2 = givenNamedHandler('handler2');
    ctx
      .bind('handler2')
      .to(handler2)
      .tag('my-handler-tag');
    ctx
      .bind('handler1')
      .to(handler1)
      .tag('my-handler-tag');
    handlerChain = new HandlerChain(ctx, filterByTag('my-handler-tag'));
    await handlerChain.invokeHandlers();
    expect(events).to.eql([
      'before-handler2',
      'before-handler1',
      'after-handler1',
      'after-handler2',
    ]);
  });

  it('allows discovery and sorting of handlers in context', async () => {
    const handler1 = givenNamedHandler('handler1');
    const handler2 = givenNamedHandler('handler2');
    ctx
      .bind('handler2')
      .to(handler2)
      .tag('handler')
      .tag({phase: 'p2'});
    ctx
      .bind('handler1')
      .to(handler1)
      .tag('handler')
      .tag({phase: 'p1'});
    handlerChain = new HandlerChain(
      ctx,
      filterByTag('handler'),
      compareBindingsByTag('phase', ['p1', 'p2']),
    );
    await handlerChain.invokeHandlers();
    expect(events).to.eql([
      'before-handler1',
      'before-handler2',
      'after-handler2',
      'after-handler1',
    ]);
  });

  function givenContext() {
    events = [];
    ctx = new Context();
  }

  function givenHandlerChain(...handlers: Handler[]) {
    handlerChain = new HandlerChain(ctx, handlers);
  }

  function givenNamedHandler(name: string) {
    async function handler(context: Context, next: Next) {
      events.push(`before-${name}`);
      const result = await next();
      events.push(`after-${name}`);
      return result;
    }
    return handler;
  }
});
