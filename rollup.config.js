import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import babelClassProperties from '@babel/plugin-proposal-class-properties';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const commonPlugins = [
  resolve({browser: true, preferBuiltins: false}), // tells Rollup how to find node_modules packages
  typescript(), // run typescript compiler
  commonjs(), // converts date-fns to ES modules
  babel(
    {
      babelHelpers: 'bundled',
      babelrc:      false,
      exclude:      [/\/core-js\//],
      presets:      [
        [
          '@babel/preset-env',
          {
            corejs:      3,
            modules:     false,
            useBuiltIns: 'usage'
          }
        ]
      ],
      plugins:      [babelClassProperties]
    }),
  production && terser() // minify, but only in production
];

const console = {
  input:   'src/console.ts',
  output:  {
    dir:            'static',
    format:         'iife', // immediately-invoked function expression — suitable for <script> tags
    entryFileNames: 'js/console.js',
    sourcemap:      !production
  },
  plugins: [...commonPlugins]
};
export default [console];
