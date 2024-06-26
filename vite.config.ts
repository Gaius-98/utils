import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueSetupExtend(), dts({
    insertTypesEntry: true,
    copyDtsFiles: false,
  })],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: 'utils',
      fileName: 'utils',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router', 'echarts'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          echarts: 'echarts',
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './packages'),
      '@t': resolve(__dirname, './types'),
    },
  },
})
