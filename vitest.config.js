import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./vitest.setup.ts'],
		exclude: [
			...configDefaults.exclude,
			// Require `dist/`, which doesn't exist until `pnpm build` runs. Run
			// separately via `pnpm test:dist`, after the build step.
			'test/dist-entrypoints.test.ts',
			'test/no-unexpected-bundling.test.ts',
			'test/dist-size.test.ts',
			// Isolated fixtures with their own node_modules, installed later by
			// `pnpm test:consumer-smoke`; not present when this default run starts.
			'e2e/**',
		],
	},
});