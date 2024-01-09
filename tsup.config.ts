import { defineConfig, type Options } from 'tsup';

const mainConfig = defineConfig({
  splitting: true,
  clean: true,
  name: 'cfdi-expresiones',
  globalName: 'cfdiExpresiones',
  treeshake: true,
  format: ['esm', 'cjs', 'iife'],
  shims: true,
  entry: {
    'cfdi-expresiones': 'src/index.ts',
  },
}) as Options;

export default mainConfig;
