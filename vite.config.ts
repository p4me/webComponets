import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SmartSearch',
      formats: ['es', 'umd'],
      fileName: (format) => `smart-search.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
  },
});
