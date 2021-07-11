import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm'
    },
    plugins: [typescript({ include: ['./src/**/*.ts'] })],
    external: ['ethers', '@ethereumjs/tx']
  }
]
