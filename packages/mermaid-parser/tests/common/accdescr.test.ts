import { describe, expect, it } from 'vitest';

import { Mermaid } from '../../src/language';
import { createTestServices } from '../test-utils';

describe('accDescr', () => {
    const { parse } = createTestServices<Mermaid>();

    describe('single line', () => {
        it.each([
            // without whitespaces
            `pie accDescr:`,

            // with spaces
            `pie   accDescr  :   `,

            // with tabs
            `pie\taccDescr\t:\t`,

            // with extra whitespaces
            `pie

            accDescr\t:

            `,
        ])('should handle empty accDescr', async (string_: string) => {
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
            `pie accDescr:sample single line description`,

            // with spaces
            `pie   accDescr  :  sample single line description  `,

            // with tabs
            `pie\taccDescr\t:\tsample single line description\t`,

            // with extra whitespaces
            `pie

            accDescr\t: sample single line description

            `,
        ])('should handle regular accDescr', async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe('sample single line description');
            expect(value.accTitle).toBeUndefined();
        });

        it('should handle accDescr with title', async () => {
            const string_ = `pie accDescr: sample description + title test`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe('sample description + title test');
            expect(value.accTitle).toBeUndefined();
        });

        it('should handle accDescr with accTitle', async () => {
            const string_ = `pie accDescr: sample description + accTitle: test`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe('sample description + accTitle: test');
            expect(value.accTitle).toBeUndefined();
        });
    });

    describe('multi line', () => {
        it.each([
            // without whitespaces
            `pie accDescr{}`,

            // with spaces
            `pie   accDescr  {    }   `,

            // with tabs
            `pie\taccDescr\t{\t}\t`,

            // with extra whitespaces
            `pie

            accDescr

            {

            }

            `,
        ])('should handle empty accDescr', async (string_: string) => {
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
            `pie accDescr{sample multi line description
            newline}`,

            // with newlines
            `pie accDescr {
                sample multi line description
                newline
            }`,

            // with tabs
            `pie\taccDescr\t{\tsample multi line description
            newline\t}\t`,

            // with extra whitespaces
            `pie

            accDescr

            {

                \tsample multi line description
                newline

            }

            `,
        ])('should handle regular accDescr', async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe(
                'sample multi line description\nnewline',
            );
            expect(value.accTitle).toBeUndefined();
        });

        it('should handle regular accDescr with title', async () => {
            const string_ = `pie accDescr {
                sample description +
                title test
            }`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe('sample description +\ntitle test');
            expect(value.accTitle).toBeUndefined();
        });

        it('should handle regular accDescr with accTitle', async () => {
            const string_ = `pie accDescr {
                sample description +
                accTitle: test
            }`;
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe('sample description +\naccTitle: test');
            expect(value.accTitle).toBeUndefined();
        });
    });

    describe('duplicate', () => {
        describe('inside', () => {
            it('should handle single line inside single line accDescr', async () => {
                const string_ = `pie accDescr: accDescr: test`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBe('accDescr: test');
                expect(value.accTitle).toBeUndefined();
            });

            it('should handle multi line inside single line accDescr', async () => {
                const string_ = `pie accDescr: accDescr {test}`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBe('accDescr {test}');
                expect(value.accTitle).toBeUndefined();
            });

            it('should handle single line inside multi line accDescr', async () => {
                const string_ = `pie accDescr {
                    accDescr: test
                }`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBe('accDescr: test');
                expect(value.accTitle).toBeUndefined();
            });
        });

        describe('after', () => {
            it.todo(
                'should handle single line after single line accDescr',
                async () => {
                    const string_ = `pie accDescr: sample accessibility
                    accDescr: test accessibility`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.title).toBeUndefined();
                    expect(value.accDescr).toBeUndefined();
                    expect(value.accTitle).toBe('test accessibility');
                },
            );

            it.todo(
                'should handle single line after multi line accDescr',
                async () => {
                    const string_ = `pie accDescr {
                        sample accessibility
                    }
                    accDescr:`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.title).toBeUndefined();
                    expect(value.accDescr).toBeUndefined();
                    expect(value.accTitle).toBeUndefined();
                },
            );

            it.todo(
                'should handle multi line after single line accDescr',
                async () => {
                    const string_ = `pie accDescr: sample accessibility
                    accDescr {}`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.title).toBeUndefined();
                    expect(value.accDescr).toBeUndefined();
                    expect(value.accTitle).toBeUndefined();
                },
            );

            it.todo(
                'should handle multi line after multi line accDescr',
                async () => {
                    const string_ = `pie accDescr {
                        sample accessibility
                    }
                    accDescr {

                    }`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.title).toBeUndefined();
                    expect(value.accDescr).toBeUndefined();
                    expect(value.accTitle).toBeUndefined();
                },
            );
        });
    });
});
