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
