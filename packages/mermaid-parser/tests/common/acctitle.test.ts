import { LangiumDocument, createServicesForGrammar } from 'langium';
import { parseHelper } from 'langium/lib/test';
import { beforeAll, describe, expect, it } from 'vitest';

import {
    Mermaid,
    MermaidGrammar,
    MermiadTokenBuilder,
} from '../../src/language';

describe('accTitle', () => {
    let parser: (input: string) => Promise<LangiumDocument<Mermaid>>;

    beforeAll(async () => {
        const services = await createServicesForGrammar({
            grammar: MermaidGrammar(),
            module: {
                parser: {
                    TokenBuilder: () => new MermiadTokenBuilder(),
                },
            },
        });
        parser = parseHelper<Mermaid>(services);
    });

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
        ])('should handle empty accTitle', async (str: string) => {
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBeUndefined();
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

        accTitle\t:   sample accessibility

        `,
        ])('should handle regular accTitle', async (str: string) => {
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBe('sample accessibility');
        });

        it.todo('should handle accTitle with title', async () => {
            const str = `pie accTitle: sample accessibility + title test`;
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBe('sample accessibility + title test');
        });

        it.todo('should handle accTitle with accDescr', async () => {
            const str = `pie accTitle: sample description + accDescr: test`;
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBe('sample description + accDescr: test');
        });
    });

    describe('duplicate', () => {
        describe('inside', () => {
            it('should handle accTitle inside accTitle', async () => {
                const str = `pie accTitle: accTitle: test`;
                const result = (await parser(str)).parseResult;
                // expect(result.parserErrors).toHaveLength(0);
                // expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBe('accTitle: test');
            });
        });

        describe('after', () => {
            it('should handle regular accTitle after empty accTitle', async () => {
                const str = `pie accTitle:
                accTitle: sample accessibility`;
                const result = (await parser(str)).parseResult;
                // expect(result.parserErrors).toHaveLength(0);
                // expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBe('sample accessibility');
            });

            it('should handle empty accTitle after regular accTitle', async () => {
                const str = `pie accTitle: sample accessibility
                accTitle:`;
                const result = (await parser(str)).parseResult;
                // expect(result.parserErrors).toHaveLength(0);
                // expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBeUndefined();
            });

            it('should handle regular accTitle after regular accTitle', async () => {
                const str = `pie accTitle: test accessibility
                accTitle: sample accessibility`;
                const result = (await parser(str)).parseResult;
                // expect(result.parserErrors).toHaveLength(0);
                // expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBeUndefined();
                expect(value.accDescr).toBeUndefined();
                expect(value.accTitle).toBe('sample accessibility');
            });
        });
    });
});
