import rehypePrism from '@mapbox/rehype-prism'
import mdx from '@mdx-js/rollup'
import { netlify } from '@netlify/remix-adapter'; // Import adapter Netlify
import {
  vitePlugin as remix,
} from '@remix-run/dev'
import rehypeImgSize from 'rehype-img-size'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
  build: {
    assetsInlineLimit: 1024,
    outDir: 'dist', 
  },
  server: {
    port: 7777,
  },
  plugins: [
    mdx({
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeSlug, rehypePrism],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    // Hapus plugin Cloudflare
    // remixCloudflareDevProxy(),
    remix({
      routes(defineRoutes) {
        return defineRoutes(route => {
          route('/', 'routes/home/route.js', { index: true });
        });
      },
      // Gunakan adapter Netlify
      adapter: netlify(), 
    }),
    jsconfigPaths(),
  ],
});