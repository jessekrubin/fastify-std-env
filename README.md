# `@jsse/fastify-std-env`

<!-- https://shields.io/badges/npm-version -->

![NPM Version](https://img.shields.io/npm/v/%40jsse%2Ffastify-std-env?style=flat-square&logo=npm&color=blue&cacheSeconds=60)

Decorates fastify instance with [std-env](https://github.com/unjs/std-env)

`fastify` + `std-env` = `@jsse/fastify-std-env`

## Install

```bash
# pnpm
pnpm add @jsse/fastify-std-env
# npm if you live in the middle-ages
npm install @jsse/fastify-std-env
# yarn which is no longer very hip
yarn add @jsse/fastify-std-env
# bun if youre part of gen-z
bun add @jsse/fastify-std-env
```

## USAGE

**API**

```typescript
import Fastify from "fastify";
import { FastifyStdEnv } from "@jsse/fastify-std-env";

const server = Fastify({
  logger: {
    level: "debug",
  },
});
server.register(FastifyStdEnv);
server.get("/", async (request, reply) => {
  const { env, process, ...rest } = server.stdenv;
  return { ...rest };
});

server.get("/process", async (request, reply) => {
  return server.process;
});

server.get("/env", async (request, reply) => {
  const envObject = server.env;
  const envRec = Object.fromEntries(
    Object.getOwnPropertyNames(envObject).map((key) => [key, envObject[key]]),
  );
  return envRec;
});
server.ready().then(() => {
  server.listen(
    {
      port: 3000,
    },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    },
  );
});
```

---

# DEV

- pnpm is the package manager
- repo uses `just` (ref) as well as (p)npm scripts
  - just-repo: https://github.com/casey/just
  - just-docs: https://just.systems/man/en/
- prettier formatting uses the default config b/c configuring formaters is dumb
- tooling:
  - tsup: bundle/build/type-check src
  - vitest: test + coverage
  - prettier: formatting - uses default config
  - eslint: linter
  - justfile: task-runner
  - cicd / gh-actions / dependabot
