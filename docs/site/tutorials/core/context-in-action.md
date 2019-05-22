# Context in action (#2)

In the traditional wisdom, we can declare various artifacts as
classes/interfaces in separate files and export/import them across modules.

## Registering artifacts

```ts
import {Context} from '@loopback/context';
import {GreetingController} from './controllers';
import {CACHING_SERVICE, GREETING_SERVICE} from './keys';
import {CachingService} from './caching-service';
import {GreetingService} from './greeting-service';

const ctx = new Context();
ctx.bind('controllers.GreetingController').toClass(GreetingController);
ctx.bind(CACHING_SERVICE).toClass(CachingService);
ctx.bind(GREETING_SERVICE).toClass(GreetingService);
```

## Providing values for artifacts

## Resolving artifacts by key

## Discovering artifacts by filter

## Watching artifacts
