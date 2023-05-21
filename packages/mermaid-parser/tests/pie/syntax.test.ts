import { createServicesForGrammar, LangiumDocument } from 'langium';
import { parseHelper } from 'langium/lib/test';
import { beforeAll, describe, expect, it } from 'vitest';

import {
    Mermaid,
    MermaidGrammar,
    MermiadTokenBuilder,
    PieChart,
} from '../../src/language';

describe('when parsing pie chart', () => {
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

    // pie
    it.each([
        // without whitespaces
        `pie`,

        // with spaces
        `  pie  `,

        // with tabs
        `\tpie\t`,

        // with extra whitespaces
        `

        \tpie

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
        // without whitespaces
        `pie showData`,

        // with spaces
        `  pie  showData  `,

        // with tabs
        `\tpie\tshowData\t`,

        // with extra whitespaces
        `

        pie\tshowData

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
