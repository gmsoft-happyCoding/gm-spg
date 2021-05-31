/* eslint-disable */
import typescript from "rollup-plugin-typescript2";
import progress from "rollup-plugin-progress";
import external from "rollup-plugin-peer-deps-external";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import eslint from "@rollup/plugin-eslint";

const isDev = process.env.NODE_ENV !== "production";

export default {
  input: [
    "./src/spg.ts",
    "./src/commands/spg-def.ts",
    "./src/commands/spg-gen.ts",
    "./src/commands/spg-init.ts",
  ],
  output: {
    dir: "dist",
    format: "cjs",
    banner: "#!/usr/bin/env node",
    sourcemap: isDev,

  },
  watch: "src/**",
  plugins: [
    eslint({
      fix: true,
      throwOnError: true,
    }),
    external(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    ,
    resolve(),
    commonjs(),
    clear({
      targets: ["dist"],
    }),
    copy({
      targets: [
        { src: "src/utils/tplUtils/tpl", dest: "dist" },
        { src: "src/components", dest: "dist" },
      ],
    }),
    json(),
    terser(),
    progress({
      // clearLine: false, // default: true
    }),
  ],
};
