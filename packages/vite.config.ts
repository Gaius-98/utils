import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),  dts({ 
     tsconfigPath: './tsconfig.json',      // 显式指定子项目配置
      rollupTypes: true,                    // 合并声明文件
      insertTypesEntry: true,               // 注入类型入口
      copyDtsFiles: true,                   // 复制声明文件到输出目录
   })],
  esbuild:{
    pure:['console.log']
  },
  build: {
    minify:'esbuild',
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'utils',
      fileName: 'utils',
      formats:['es','umd'],
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
