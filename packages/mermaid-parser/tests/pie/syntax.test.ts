import { describe, expect, it } from 'vitest';

import { PieChart } from '../../src/language';
import { createTestServices } from '../test-utils';

describe('pie chart', () => {
    const { parse } = createTestServices<PieChart>();

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
    ])('should handle regular pie', async (string_: string) => {
        const { parseResult: result } = await parse(string_);
        expect(result.parserErrors).toHaveLength(0);
        expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.$type).toBe(PieChart);
        expect(value.showData).toBeFalsy();
        expect(value.title).toBeUndefined();
        expect(value.sections).toHaveLength(0);
    });

    // showData
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
    ])('should handle regular showData', async (string_: string) => {
        const { parseResult: result } = await parse(string_);
        expect(result.parserErrors).toHaveLength(0);
        expect(result.lexerErrors).toHaveLength(0);

        const value = result.value;
        expect(value.$type).toBe(PieChart);
        expect(value.showData).toBeTruthy();
        expect(value.title).toBeUndefined();
        expect(value.sections).toHaveLength(0);
    });

    // title
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
    ])(
        'should handle regular pie + title in same line',
        async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeFalsy();
            expect(value.title).toBe('sample title');
            expect(value.sections).toHaveLength(0);
        },
    );

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
        'should handle regular pie + title in different line',
        async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeFalsy();
            expect(value.title).toBe('sample title');
            expect(value.sections).toHaveLength(0);
        },
    );

    // showData + title
    it.each([
        // without newlines
        `pie showData title sample title`,

        // extra newline after
        `pie showData title sample title
        `,
    ])(
        'should handle regular pie + showData + title',
        async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeTruthy();
            expect(value.title).toBe('sample title');
            expect(value.sections).toHaveLength(0);
        },
    );

    // showData + \n + title
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
        'should handle regular showData + title in different line',
        async (string_: string) => {
            const { parseResult: result } = await parse(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.$type).toBe(PieChart);
            expect(value.showData).toBeTruthy();
            expect(value.title).toBe('sample title');
            expect(value.sections).toHaveLength(0);
        },
    );
});
