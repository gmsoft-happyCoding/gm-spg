import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";

export default {
  input: "./src/gm-spg.ts",
  output: {
    dir: "dist",
    format: "cjs",
    banner: "#!/usr/bin/env node"
  },
  plugins: [
    external(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    ,
    resolve(),
    commonjs(),
    clear({
      targets: ["dist"]
    }),
    copy({
      targets: [
        { src: "src/tpl", dest: "dist" },
        { src: "src/components", dest: "dist" }
      ]
    })
  ]
};
