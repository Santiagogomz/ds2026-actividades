import { defineConfig } from 'vitest/config';
import base from './vitest.config.mts';
export default defineConfig({ test: {
  env: base.test?.env,
  include: ['src/**/*.db.test.ts'],
  exclude: ['**/node_modules/**'],
} });
