import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry point: src/index.ts
  format: ['cjs', 'esm'], // Output formats: CommonJS and ESModule
  dts: true, // Generate declaration files (.d.ts)
  splitting: false, // Don't split output into multiple chunks (usually better for libraries)
  sourcemap: true, // Generate source maps
  clean: true, // Clean the output directory (dist) before building
  // Consider adding 'external' for peer dependencies if needed, but tsup often handles it well.
  // external: ['react', '@tanstack/react-query'],
});
