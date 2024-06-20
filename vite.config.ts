import { fileURLToPath, URL } from 'node:url'

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { buildSync } from 'esbuild'
import { join } from 'path'

function postBuildWorker(): Plugin {
  return {
    name: 'post-build-worker',
    apply: 'build',
    enforce: 'post',
    writeBundle() {
      buildSync({
        minify: true,
        bundle: true,
        entryPoints: [join(process.cwd(), 'src', 'firebase-messaging-sw.ts')],
        outfile: join(process.cwd(), 'dist', 'firebase-messaging-sw.js')
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), postBuildWorker()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  }
})
