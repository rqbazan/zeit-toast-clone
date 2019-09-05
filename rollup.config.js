import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  plugins: [typescript()],
  external: Object.keys(pkg.peerDependencies),
  output: [
    {
      format: 'cjs',
      name: pkg.name,
      file: pkg.main,
      exports: 'named'
    },
    {
      format: 'esm',
      name: pkg.name,
      file: pkg.module,
      exports: 'named'
    }
  ]
}
