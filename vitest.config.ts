import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            exclude: [...defaultExclude, '**/generated/', '**/tests/'],
            provider: 'istanbul',
        },
        includeSource: ['packages/**/src/'],
    },
});
