import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = loadEnv(mode, process.cwd())
  return{
    plugins: [
      vue(),
      vueDevTools(),
      // AutoImport sólo para APIs de Vue/Router/Pinia. Se quita PrimeVueResolver aquí para evitar imports erróneos de componentes como named exports.
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts'
      }),
      // Components resolver con estilo de importación por default (import Button from 'primevue/button') para asegurar exports correctos.
      Components({
        resolvers: [PrimeVueResolver({ importStyle: 'default' })],
        dts: 'src/components.d.ts'
      })
    ],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.vue', '.json']
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  }
})
