import fp from "fastify-plugin";
import {
  env,
  hasTTY,
  hasWindow,
  isBun,
  isCI,
  isColorSupported,
  isDebug,
  isDeno,
  isDevelopment,
  isEdgeLight,
  isFastly,
  isLinux,
  isMacOS,
  isMinimal,
  isNetlify,
  isNode,
  isProduction,
  isTest,
  isWindows,
  isWorkerd,
  nodeENV,
  nodeMajorVersion,
  nodeVersion,
  platform,
  process,
  provider,
  providerInfo,
  runtime,
  runtimeInfo,
} from "std-env";
import { type FastifyPluginCallback } from "fastify";

const PLUGIN_NAME = "@jsse/fastify-std-env";

type StdEnv = ReturnType<typeof _stdenv>;

declare module "fastify" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface FastifyInstance {
    stdenv: StdEnv;
    env: typeof env;
    process: typeof process;
  }
}

export type FastifyStdEnvOptions = {
  /**
   * Debug plugin!
   */
  debug?: boolean;
};

function _stdenv() {
  return {
    env,
    nodeENV,
    platform,
    isCI,
    hasTTY,
    hasWindow,
    isDebug,
    isTest,
    isProduction,
    isDevelopment,
    isMinimal,
    isWindows,
    isLinux,
    isMacOS,
    isColorSupported,
    nodeVersion,
    nodeMajorVersion,
    process,
    providerInfo,
    provider,
    isNode,
    isBun,
    isDeno,
    isFastly,
    isNetlify,
    isEdgeLight,
    isWorkerd,
    runtimeInfo,
    runtime,
  };
}

const fastifyStdEnv: FastifyPluginCallback<FastifyStdEnvOptions> = (
  fastify,
  opts,
  done,
) => {
  const { debug = false } = opts;
  if (debug) {
    fastify.log.info(`registering plugin: ${PLUGIN_NAME}`);
  }
  fastify.decorate("env", env);
  fastify.decorate("process", process);
  fastify.decorate("stdenv", _stdenv());
  done();
};

export const FastifyStdEnv = fp(fastifyStdEnv, {
  fastify: "^4.x",
  name: "@jsse/fastify-std-env",
});
