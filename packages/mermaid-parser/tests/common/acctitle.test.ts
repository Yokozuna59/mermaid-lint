import { describe, expect, it } from 'vitest';

import { Mermaid } from '../../src/language';
import { createTestServices } from '../test-utils';

describe('accTitle', () => {
    const { parse } = createTestServices<Mermaid>();

    describe('normal', () => {
        it.each([
            // without whitespaces
            `pie accTitle:`,

            // with spaces
            `pie   accTitle  :   `,

            // with tabs
            `pie\taccTitle\t:\t`,

            // with extra whitespaces
            `pie

            accTitle\t:

            `,
        ])('should handle empty accTitle', async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.accTitle).toBeUndefined();
        });

        it.each([
            // without whitespaces
            `pie accTitle: sample accessibility`,

            // with spaces
            `pie   accTitle  : sample accessibility  `,

            // with tabs
            `pie\taccTitle\t:\tsample accessibility\t`,

            // with extra whitespaces
            `pie

            accTitle\t: sample accessibility

            `,
        ])('should handle regular accTitle', async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.accTitle).toBe('sample accessibility');
        });

        it('should handle accTitle with title', async () => {
            const string_ = `pie accTitle: sample accessibility + title test`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accTitle).toBe('sample accessibility + title test');
        });

        it('should handle accTitle with single line accDescr', async () => {
            const string_ = `pie accTitle: sample description + accDescr: test`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBe('sample description + accDescr: test');
        });

        it('should handle accTitle with multi line accDescr', async () => {
            const string_ = `pie accTitle: sample description + accDescr {test}`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBe('sample description + accDescr {test}');
        });
    });

    describe('duplicate', () => {
        describe('inside', () => {
            it('should handle accTitle inside accTitle', async () => {
                const string_ = `pie accTitle: accTitle: test`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.accTitle).toBe('accTitle: test');
            });
        });

        describe('after', () => {
            it.todo(
                'should handle regular accTitle after empty accTitle',
                async () => {
                    const string_ = `pie accTitle:
                    accTitle: sample accessibility`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.accTitle).toBe('sample accessibility');
                },
            );

            it.todo(
                'should handle empty accTitle after regular accTitle',
                async () => {
                    const string_ = `pie accTitle: sample accessibility
                    accTitle:`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.accTitle).toBeUndefined();
                },
            );

            it.todo(
                'should handle regular accTitle after regular accTitle',
                async () => {
                    const string_ = `pie accTitle: test accessibility
                    accTitle: sample accessibility`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.accTitle).toBe('sample accessibility');
                },
            );
        });
    });
});
