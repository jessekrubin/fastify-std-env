import Fastify from "fastify";
import { expect, test } from "vitest";
import { FastifyStdEnv } from "../index.js";

// const { test } = require('node:test')
// const assert = require('node:assert')

test("should register the correct decorator", async (t) => {
  const app = Fastify();
  await app.register(FastifyStdEnv);

  await app.ready();

  expect(app.env).toBeDefined();
  expect(app.process).toBeDefined();
  expect(app.stdenv).toBeDefined();
});

test("should have stdenv.isTest as true", async (t) => {
  const app = Fastify();
  await app.register(FastifyStdEnv);

  await app.ready();

  expect(app.stdenv.isTest).toBe(true);
});
