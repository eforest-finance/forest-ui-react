import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import postcssUrl from 'postcss-url';
import copy from 'rollup-plugin-copy';
import minifyHtml from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';

import typescript from '@rollup/plugin-typescript';

import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import { fileURLToPath } from 'url';
import babel from '@rollup/plugin-babel';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRootDir = path.resolve(__dirname);

export default function createConfig(packageName) {
  const output = {
    exports: 'named',
    name: packageName,
    sourcemap: true,
  };

  const production = !process.env.ROLLUP_WATCH;

  const esbuildPlugin = esbuild({
    minify: true,
    tsconfig: './tsconfig.json',
    platform: 'browser',
    treeShaking: true,
    loaders: {
      '.json': 'json',
    },
  });

  const copyPlugin = copy({
    targets: [
      // Need to copy the files over for usage
      { src: 'src/assets/fonts', dest: 'dist/assets' },
      // { src: 'src/sandbox', dest: 'dist' },
    ],
  });

  const postcssPlugin = postcss({
    minimize: true,
    modules: true,
    autoModules: true,
    extensions: ['.css', '.less'],
    use: {
      sass: null,
      stylus: null,
      less: { javascriptEnabled: true },
    },
    extract: path.resolve('dist/assets/index.css'),
    plugins: [
      postcssImport,
      tailwindcss,
      autoprefixer,
      postcssUrl({
        url: 'inline', // enable inline assets using base64 encoding
        maxSize: 10, // maximum file size to inline (in kilobytes)
        fallback: 'copy', // fallback method to use if max size is exceeded
      }),
    ],
  });

  const urlPlugin = url();

  const terserPlugin =
    production &&
    terser({
      compress: {
        drop_console: production,
        drop_debugger: production,
      },
      output: { comments: false },
    });

  return [
    {
      input: './index.ts',
      plugins: [
        alias({
          entries: [
            {
              find: '@',
              replacement: new URL('./src', import.meta.url).pathname,
            },
            { find: 'components', replacement: path.resolve(projectRootDir, 'src/components') },
            // { find: 'styles', replacement: path.resolve(projectRootDir, 'src/styles') },
            { find: 'utils', replacement: path.resolve(projectRootDir, 'src/utils') },
            { find: 'assets', replacement: path.resolve(projectRootDir, 'src/assets') },
            { find: 'constants', replacement: path.resolve(projectRootDir, 'src/constants') },
            { find: 'provider', replacement: path.resolve(projectRootDir, 'src/provider') },
            { find: 'pages', replacement: path.resolve(projectRootDir, 'src/pages') },
            { find: 'api', replacement: path.resolve(projectRootDir, 'src/api') },
            { find: 'contract', replacement: path.resolve(projectRootDir, 'src/contract') },
          ],
        }),
        svgr({
          icon: true,
        }),
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
          presets: [
            ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
        }),
        minifyHtml,
        esbuildPlugin,
        postcssPlugin,
        urlPlugin,
        copyPlugin,
        terserPlugin,
        typescript({
          noEmitOnError: false,
          tsconfig: 'tsconfig.json',
        }),
      ],
      output: [{ file: './dist/index.js', format: 'es', ...output }],
    },
  ];
}
