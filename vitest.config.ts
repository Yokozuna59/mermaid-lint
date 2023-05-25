import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            exclude: [...defaultExclude, '**/generated/'],
            provider: 'istanbul',
        },
        includeSource: ['packages/**/src/'],
    },
});
