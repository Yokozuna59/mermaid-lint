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
    ])('should handle valid pie', async (str: string) => {
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
    ])('should handle valid pie + showData', async (str: string) => {
        const result = (await parser(str)).parseResult;
        expect(result.parserErrors).toHaveLength(0);
        expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.$type).toBe(PieChart);
        expect(value.showData).toBeTruthy();
        expect(value.title).toBeUndefined();
        expect(value.sections).toHaveLength(0);
    });

    // pie + title
    it.each([
        // without whitespaces
        `pie title sample title`,

        // with spaces
        `  pie  title sample title  `,

        // with tabs
        `\tpie\ttitle sample title\t`,

        // with extra whitespaces
        `pie

        \ttitle sample title

        `,
    ])('should handle valid pie + title in same line', async (str: string) => {
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.$type).toBe(PieChart);
        expect(value.showData).toBeFalsy();
        expect(value.title).toBe('sample title');
        expect(value.sections).toHaveLength(0);
    });

    // pie + \n + title
    it.each([
        // without newlines
        `pie
        title sample title`,

        // extra newline after
        `pie
        title sample title
        `,

        // extra newline before
        `pie

        title sample title`,

        // extra newlines
        `pie

        title sample title

        `,
    ])(
        'should handle valid pie + title in different line',
        async (str: string) => {
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeFalsy();
            expect(value.title).toBe('sample title');
            expect(value.sections).toHaveLength(0);
        },
    );

    // pie + showData + title
    it.each([
        // without newlines
        `pie showData title sample title`,

        // extra newline after
        `pie showData title sample title
        `,
    ])('should handle valid pie + showData + title', async (str: string) => {
        const result = (await parser(str)).parseResult;
        // expect(result.parserErrors).toHaveLength(0);
        // expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.$type).toBe(PieChart);
        expect(value.showData).toBeTruthy();
        expect(value.title).toBe('sample title');
        expect(value.sections).toHaveLength(0);
    });

    // pie + showData + \n + title
    it.each([
        // without newlines
        `pie showData
        title sample title`,

        // extra newline after
        `pie showData
        title sample title
        `,

        // extra newline before
        `pie showData

        title sample title`,

        // extra newlines
        `pie showData

        title sample title

        `,
    ])(
        'should handle valid pie + showData + title in different line',
        async (str: string) => {
            const result = (await parser(str)).parseResult;
            // expect(result.parserErrors).toHaveLength(0);
            // expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeTruthy();
            expect(value.title).toBe('sample title');
            expect(value.sections).toHaveLength(0);
        },
    );
});
