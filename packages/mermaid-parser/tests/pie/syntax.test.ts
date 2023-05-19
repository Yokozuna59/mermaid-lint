import { createServicesForGrammar } from 'langium';
import { parseHelper } from 'langium/lib/test';
import { describe, expect, it } from 'vitest';

import {
    Mermaid,
    MermaidGrammar,
    MermiadTokenBuilder,
    PieChart,
} from '../../src/language';

describe('valid pie chart codes', async () => {
    const services = await createServicesForGrammar({
        grammar: MermaidGrammar(),
        module: {
            parser: {
                TokenBuilder: () => new MermiadTokenBuilder(),
            },
        },
    });
    const parser = parseHelper<Mermaid>(services);

    // pie
    it.each([
        // without newlines
        `pie`,

        // extra newline after
        `pie
        `,

        // extra newline before
        `
        pie`,

        // extra newlines
        `

        pie

        `,
    ])('should handle valid pie definitions', async (str: string) => {
        const result = (await parser(str)).parseResult;
        expect(result.parserErrors).toHaveLength(0);
        expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.$type).toBe(PieChart);
        expect(value.showData).toBeFalsy();
        expect(value.title).toBeUndefined();
        expect(value.sections).toHaveLength(0);
    });

    // pie + showData
    it.each([
        // without newlines
        `pie showData`,

        // extra newline after
        `pie showData
        `,

        // extra newline before
        `
        pie showData`,

        // extra newlines
        `

        pie showData

        `,
    ])(
        'should handle valid pie + showData definitions',
        async (str: string) => {
            const result = (await parser(str)).parseResult;
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeTruthy();
            expect(value.title).toBeUndefined();
            expect(value.sections).toHaveLength(0);
        },
    );
});
