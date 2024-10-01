import rehypePrism from '@mapbox/rehype-prism'
import mdx from '@mdx-js/rollup'
import { vitePlugin as remix } from '@remix-run/dev'
import { vercelPreset } from '@vercel/remix/vite'
import rehypeImgSize from 'rehype-img-size'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'

// Pindahkan konfigurasi MDX ke file terpisah (opsional)
const configureMDX = () => {
  return mdx({
    rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeSlug, rehypePrism],
    remarkPlugins: [remarkFrontmatter],
    providerImportSource: '@mdx-js/react',
  })
}

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
  build: {
    assetsInlineLimit: 1024,
  },
  server: {
    port: 7777,
  },
  plugins: [
    // Gunakan konfigurasi MDX dari file terpisah (opsional)
    configureMDX(), 
    vercelPreset({
      routes(defineRoutes) {
        return defineRoutes(route => {
          route('/', 'routes/home/route.js', { index: true });
          // Tambahkan route lain di sini jika ada
        });
      },
    }),
    remix(), // Pastikan plugin remix ada di sini
    jsconfigPaths(),
  ],
});