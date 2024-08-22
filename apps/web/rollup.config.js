import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/main.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    external(),
    resolve({ extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts'] }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-react', { "runtime": "automatic" }]],
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts']
    }),
    terser()
  ]
};