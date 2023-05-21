import { createServicesForGrammar, LangiumDocument } from 'langium';
import { parseHelper } from 'langium/lib/test';
import { beforeAll, describe, expect, it } from 'vitest';

import {
    Mermaid,
    MermaidGrammar,
    MermiadTokenBuilder,
} from '../../src/language';

describe('when parsing accDescr', () => {
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

    // single line
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
    ])('should handle empty single line accDescr', async (str: string) => {
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
        `pie accDescr:sample single line description`,

        // with spaces
        `pie   accDescr  :  sample single line description  `,

        // with tabs
        `pie\taccDescr\t:\tsample single line description\t`,

        // with extra whitespaces
        `pie

        accDescr\t: sample single line description

        `,
    ])('should handle valid single line accDescr', async (str: string) => {
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('sample single line description');
        expect(value.accTitle).toBeUndefined();
    });

    it.todo('should handle duplicate single line accDescr', async () => {
        const str = `pie accDescr: sample accessibility
        accDescr:`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBeUndefined();
        expect(value.accTitle).toBeUndefined();
    });

    it('should handle single line accDescr inside single line accDescr', async () => {
        const str = `pie accDescr: accDescr: test`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('accDescr: test');
        expect(value.accTitle).toBeUndefined();
    });

    it.todo('should handle valid single line accDescr with title', async () => {
        const str = `pie accDescr: sample description + title test`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('sample description + title test');
        expect(value.accTitle).toBeUndefined();
    });

    it('should handle valid single line accDescr with accTitle', async () => {
        const str = `pie accDescr: sample description + accTitle: test`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('sample description + accTitle: test');
        expect(value.accTitle).toBeUndefined();
    });

    // multi line
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
    ])('should handle empty multi line accDescr', async (str: string) => {
        const result = (await parser(str)).parseResult;
        expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

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
    ])('should handle valid multi line accDescr', async (str: string) => {
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('sample multi line description\nnewline');
        expect(value.accTitle).toBeUndefined();
    });

    it.todo('should handle duplicate multi line accDescr', async () => {
        const str = `pie accDescr {
            sample accessibility
        }
        accDescr {

        }`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBeUndefined();
        expect(value.accTitle).toBeUndefined();
    });

    it.todo(
        'should handle multi line accDescr inside multi line accDescr',
        async () => {
            const str = `pie accDescr {
            accDescr {
                test
            }
        }
        `;
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBe('accDescr {\ntest\n}');
            expect(value.accTitle).toBeUndefined();
        },
    );

    it.todo('should handle valid multi line accDescr with title', async () => {
        const str = `pie accDescr {
            sample description +
            title test
        }`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('sample description +\ntitle test');
        expect(value.accTitle).toBeUndefined();
    });

    it('should handle valid multi line accDescr with accTitle', async () => {
        const str = `pie accDescr {
            sample description +
            accTitle: test
        }`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('sample description +\naccTitle: test');
        expect(value.accTitle).toBeUndefined();
    });

    // both
    it.todo.each([
        `pie accDescr {
            sample accessibility
        }
        accDescr:`,

        `pie accDescr: sample accessibility
        accDescr {}`,
    ])(
        'should handle duplicate single and multi line accDescr',
        async (str: string) => {
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBeUndefined();
            expect(value.accDescr).toBeUndefined();
            expect(value.accTitle).toBeUndefined();
        },
    );

    it('should handle multi line accDescr inside single line accDescr', async () => {
        const str = `pie accDescr: accDescr {test}`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('accDescr {test}');
        expect(value.accTitle).toBeUndefined();
    });

    it('should handle single line accDescr inside multi line accDescr', async () => {
        const str = `pie accDescr {
                accDescr: test
            }`;
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.title).toBeUndefined();
        expect(value.accDescr).toBe('accDescr: test');
        expect(value.accTitle).toBeUndefined();
    });
});