import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import AtImport from 'postcss-import';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const commonPlugins = [
  resolve({browser: true, preferBuiltins: false}), // tells Rollup how to find node_modules packages
  commonjs(), // converts date-fns to ES modules
  babel({babelHelpers: 'bundled'}),
  production && terser() // minify, but only in production
];

const shell = {
  input:   'src/console.ts',
  output:  {
    dir:            'static',
    format:         'iife', // immediately-invoked function expression — suitable for <script> tags
    entryFileNames: 'js/console.js',
    sourcemap:      !production
  },
  plugins: [
    postcss({
              extract:   'css/console.css',
              minimize:  production,
              sourceMap: !production
            }),
    ...commonPlugins
  ]
};

const components = {
  input:   'src/components.ts',
  output:  {
    dir:            'static',
    format:         'iife', // immediately-invoked function expression — suitable for <script> tags
    entryFileNames: 'js/components.js',
    sourcemap:      !production
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    typescript(),
    commonjs(),
    postcss(
      {
        plugins:   [AtImport()],
        inject:    false,
        extract:   false,
        minimize:  true,
        sourceMap: false,
      }),
    terser(),
  ]
};

export default [shell, components];
