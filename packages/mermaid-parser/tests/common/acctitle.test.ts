import { createServicesForGrammar, LangiumDocument } from 'langium';
import { parseHelper } from 'langium/lib/test';
import { beforeAll, describe, expect, it } from 'vitest';

import {
    Mermaid,
    MermaidGrammar,
    MermiadTokenBuilder,
} from '../../src/language';

describe('when parsing accTitle', () => {
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
    ])('should handle valid accTitle', async (str: string) => {
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBeUndefined();
        expect(value.accTitle).toBe('sample accessibility');
    });

    it.todo('should handle duplicate accTitle', async () => {
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

    it.todo('should handle accTitle inside accTitle', async () => {
        const str = `pie accTitle: accTitle: test`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('accTitle: test');
        expect(value.accTitle).toBeUndefined();
    });

    it.todo('should handle valid accTitle with title', async () => {
        const str = `pie accTitle: sample accessibility + title test`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBeUndefined();
        expect(value.accTitle).toBe('sample accessibility + title test');
    });

    it.todo('should handle valid accTitle with accDescr', async () => {
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
