import Fastify from "fastify";
import { expect, test } from "vitest";
import { FastifyStdEnv } from "../index.js";

test("should register the correct decorator", async () => {
  const app = Fastify();
  await app.register(FastifyStdEnv);

  await app.ready();

  expect(app.env).toBeDefined();
  expect(app.process).toBeDefined();
  expect(app.stdenv).toBeDefined();
});

test("should have stdenv.isTest as true", async () => {
  const app = Fastify();
  await app.register(FastifyStdEnv);

  await app.ready();

  expect(app.stdenv.isTest).toBe(true);
});
