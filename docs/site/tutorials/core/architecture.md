# Build large scale Node.js applications with LoopBack 4

## Overview

LoopBack 4 core is an open source TypeScript platform for Node.js, specializing
in building large scale applications with great flexibility, composability, and
extensibility.

## Key modules

- @loopback/metadata
- @loopback/context
- @loopback/core

These modules are used by the LoopBack framework to offer API and Microservice
capabilities. They can be used independently as a base platform to build large
scale applications in TypeScript and Node.js.

## Design goals

Some characteristics of large scale applications:

- Developed by many teams/developers
- Maintained for many years and releases
- Created as many modules
- Have many dependencies

Architectural disciplines are required to support such large scale applications.

- Modular/Decoupling
- Composable
- Extensible

Conflict of interest:

- Modular/Decoupling/Consistent vs. Fragmentation/Friction
- Composable vs. Extensible

## Scenario

https://github.com/strongloop/loopback-next/tree/master/examples/greeter-extension

## Series

1. Universal registration and resolution for all artifacts

(Introduce the idea of `Context` and `Binding`)

- registry as the knowledge base
- consistent apis to retrieve or search artifacts
- supply values for registered entries

2. Dependency injection

(Beyond locating artifacts proactively in code, push dependencies to the target
inversely)

- By key: `@inject(key)`
- By filter: `@inject(filter)`
- Defer resolution: `@inject.getter`
- Listen on changes: `@inject.view`

- Create your own `injector`

3. Configuration

(An accompanying facility for bound artifacts to provide configurations)

- ctx.configure
- ctx.gtConfig
- `@config.*`

- Create your own configuration resolver

4. Make your module or application extensible

- extension point/extension pattern

5. Aspect-oriented programming

- observers and interceptors

## Deep dive

The magic `Context` - Inversion of Control (IoC) container and Dependency
Injection (DI) framework

- Context

  - A registry of bindings
  - A hierarchy of contexts
  - Add/remove entries
  - Find entries
    - By key
    - By tags
  - Observe entries
  - Resolve bound value(s)

- Binding

  - An entry in the registry
  - Key/tags/scope
  - How is a value fulfilled
    - Constant (to)
    - A factory function (toDynamicValue)
    - A class to instantiate (toClass)
    - A class to provide the value (toProvider)
    - An alias to another binding
  - Configure a binding
    - Fluent APIs
    - BindingTemplate functional programming

- Dependency injection

  - Sync vs. Async (ValueOrPromise)
  - Only applicable to classes and their members
  - Constructor dependency injection/property dependency injection/method
    parameter dependency injection
  - Decorators
    - `@inject.*`
    - Create your own decorator for injection
  - Create your own `resolve`
  - Detect circular dependencies

- Decorator

- Component

  - Contribution of bindings

- Interceptors
- Observers

* (Deep dive - the patterns) Extensibility
  - Extension point/extension
  - Discovering and ordering
  - Chain of handling
