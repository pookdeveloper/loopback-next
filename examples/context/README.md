# @loopback/example-context

This project contains a list of standalone examples to illustrate Inversion of
Control (IoC) and Dependency Injection (DI) capabilities provided by
[`@loopback/context`](https://github.com/strongloop/loopback-next/blob/master/packages/context).

## Examples

| Example                          | Description                                                     |
| :------------------------------- | :-------------------------------------------------------------- |
| binding-types.ts                 | Various ways to provide values for a binding                    |
| configuration-injection.ts       | Configuration for bindings and injection of configurations      |
| context-chain.ts                 | Contexts are chained to create a hierarchy of registries        |
| context-observation.ts           | Observe context (bind/unbind) and context view (refresh) events |
| custom-configuration-resolver.ts | Override how configuration is resolved from a given binding     |
| custom-inject-decorator.ts       | How to create a new decorator for custom injections             |
| custom-inject-resolve.ts         | How to specify a custom resolve function for bindings           |
| dependency-injection.ts          | Different styles of dependency injection                        |
| find-bindings.ts                 | Different flavors of finding bindings in a context              |
| injection-without-binding.ts     | Perform dependency injection without binding a class            |
| interceptor-proxy.ts             | Get proxies to intercept method invocations                     |
| parameterized-decoration.ts      | Apply decorators that require parameters as arguments           |

## Use

Start all examples:

```sh
npm start
```

To run individual examples:

```sh
npm run build
node dist/<an-example>
```

## Contributions

- [Guidelines](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [Join the team](https://github.com/strongloop/loopback-next/issues/110)

## Tests

Run `npm test` from the root folder.

## Contributors

See
[all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## License

MIT
