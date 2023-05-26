import { describe, expect, it } from 'vitest';

import { Mermaid } from '../../src/language';
import { createTestServices } from '../test-utils';

describe('title', () => {
    const { parse } = createTestServices<Mermaid>();

    describe('normal', () => {
        it.each([
            // without whitespaces
            `pie title`,

            // with spaces
            `pie   title   `,

            // with tabs
            `pie\title\t`,

            // with extra whitespaces
            `pie

            title\t

            `,
        ])('should handle empty title', async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBeUndefined();
        });

        it.each([
            // without whitespaces
            `pie title sample`,

            // with spaces
            `pie   title   sample  `,

            // with tabs
            `pie\ttitle\tsample\t`,

            // with extra whitespaces
            `pie

            title\t sample

            `,
        ])('should handle regular title', async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBeUndefined();
        });

        it.todo('should handle title with accTitle', async () => {
            const string_ = `pie title sample + accTitle: test`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample + accTitle: test');
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBeUndefined();
        });

        it.todo('should handle title with single line accDescr', async () => {
            const string_ = `pie title sample + accDescr: test`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample + accDescr: test');
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBeUndefined();
        });

        it.todo('should handle title with multi line accDescr', async () => {
            const string_ = `pie title sample + accDescr {test}`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample + accDescr {test}');
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBeUndefined();
        });
    });

    describe('duplicate', () => {
        describe('inside', () => {
            it('should handle title inside title', async () => {
                const string_ = `pie title title test`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('title test');
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBeUndefined();
            });
        });

        describe('after', () => {
            it('should handle regular title after empty title', async () => {
                const string_ = `pie title:
                title sample`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('sample');
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBeUndefined();
            });

            it('should handle empty title after regular title', async () => {
                const string_ = `pie title sample
                title`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBeUndefined();
            });

            it('should handle regular title after regular title', async () => {
                const string_ = `pie title test
                title sample`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('sample');
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBeUndefined();
            });
        });
    });
});
