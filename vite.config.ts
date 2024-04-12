import pages from '@hono/vite-cloudflare-pages'
import honox from 'honox/vite'
import adapter from '@hono/vite-dev-server/cloudflare'
import client from 'honox/vite/client'
import { defineConfig } from 'vite'

const baseConfig = {
  resolve: {
    alias: {
      '@': '/app',
    }
  },
  ssr: {
    external: [
      '@prisma/client',
      '@prisma/adapter-d1',
    ]
  },
}

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      ...baseConfig,
      plugins: [client()]
    }
  } else {
    return {
      ...baseConfig,
      plugins: [
        honox({
          devServer: { adapter }
        }),
        pages()
      ],
    }
  }
})
