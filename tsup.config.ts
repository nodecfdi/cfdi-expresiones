import isCI from 'is-ci';
import { defineConfig, type Options } from 'tsup';

const entry = 'src/index.ts';

const sharedConfig = defineConfig({
    globalName: 'cfdiExpresiones',
    splitting: false,
    sourcemap: true,
    format: ['esm', 'cjs', 'iife'],
    treeshake: true,
    minify: isCI,
    bundle: true,
    shims: true
});

const mainConfig = defineConfig({
    ...sharedConfig,
    entry: {
        'cfdi-expresiones': entry
    },
    dts: false
}) as Options;

const dtsConfig = defineConfig({
    ...sharedConfig,
    entry: {
        'cfdi-expresiones': entry
    },
    dts: {
        entry,
        only: true
    }
}) as Options;

export default defineConfig([mainConfig, dtsConfig]);
