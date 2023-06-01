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
    });

    // title
    it.todo.each([
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
            expect(value.title).toBe('sample title');
        },
    );

    // pie + \n + title
    it.todo.each([
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
            expect(value.title).toBe('sample title');
        },
    );

    // showData + title
    it.todo.each([
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
        },
    );

    // showData + \n + title
    it.todo.each([
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
        },
    );

    describe('sections', () => {
        describe('normal', () => {
            it.each([
                // without whitespaces
                `pie
                "GitHub":100
                "GitLab":50`,

                // with spaces
                `pie
                "GitHub"   :   100
                "GitLab"   :   50`,

                // with tabs
                `pie
                "GitHub"\t:\t100
                "GitLab"\t:\t50`,

                // extra whitespaces
                `pie

                \t"GitHub" \t : \t 100

                \t"GitLab" \t : \t  50

                `,
            ])('should handle regular secions', async (string_: string) => {
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.$type).toBe(PieChart);

                const section0 = value.sections[0];
                expect(section0?.label).toBe('GitHub');
                expect(section0?.value).toBe(100);

                const section1 = value.sections[1];
                expect(section1?.label).toBe('GitLab');
                expect(section1?.value).toBe(50);
            });

            it('should handle sections with showData', async () => {
                const string_ = `pie showData
                "GitHub": 100
                "GitLab": 50`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.$type).toBe(PieChart);
                expect(value.showData).toBeTruthy();

                const section0 = value.sections[0];
                expect(section0?.label).toBe('GitHub');
                expect(section0?.value).toBe(100);

                const section1 = value.sections[1];
                expect(section1?.label).toBe('GitLab');
                expect(section1?.value).toBe(50);
            });

            it.todo('should handle sections with title', async () => {
                const string_ = `pie title sample wow
                "GitHub": 100
                "GitLab": 50`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.$type).toBe(PieChart);
                expect(value.title).toBe('sample wow');

                const section0 = value.sections[0];
                expect(section0?.label).toBe('GitHub');
                expect(section0?.value).toBe(100);

                const section1 = value.sections[1];
                expect(section1?.label).toBe('GitLab');
                expect(section1?.value).toBe(50);
            });

            it.todo('should handle sections with accTitle', async () => {
                const string_ = `pie accTitle: sample wow
                "GitHub": 100
                "GitLab": 50`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.$type).toBe(PieChart);
                expect(value.accTitle).toBe('sample wow');

                const section0 = value.sections[0];
                expect(section0?.label).toBe('GitHub');
                expect(section0?.value).toBe(100);

                const section1 = value.sections[1];
                expect(section1?.label).toBe('GitLab');
                expect(section1?.value).toBe(50);
            });

            it.todo(
                'should handle sections with single line accDescr',
                async () => {
                    const string_ = `pie accDescr: sample wow
                    "GitHub": 100
                    "GitLab": 50`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.$type).toBe(PieChart);
                    expect(value.accDescr).toBe('sample wow');

                    const section0 = value.sections[0];
                    expect(section0?.label).toBe('GitHub');
                    expect(section0?.value).toBe(100);

                    const section1 = value.sections[1];
                    expect(section1?.label).toBe('GitLab');
                    expect(section1?.value).toBe(50);
                },
            );

            it.todo(
                'should handle sections with multi line accDescr',
                async () => {
                    const string_ = `pie accDescr {
                        sample wow
                    }
                    "GitHub": 100
                    "GitLab": 50`;
                    const { parseResult: result } = await parse(string_);
                    expect(result.parserErrors).toHaveLength(0);
                    expect(result.lexerErrors).toHaveLength(0);

                    const value = result.value;
                    expect(value.$type).toBe(PieChart);
                    expect(value.accDescr).toBe('sample wow');

                    const section0 = value.sections[0];
                    expect(section0?.label).toBe('GitHub');
                    expect(section0?.value).toBe(100);

                    const section1 = value.sections[1];
                    expect(section1?.label).toBe('GitLab');
                    expect(section1?.value).toBe(50);
                },
            );
        });

        describe('duplicate', () => {
            it('should handle duplicate sections', async () => {
                const string_ = `pie
                "GitHub": 100
                "GitHub": 50`;
                const { parseResult: result } = await parse(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.$type).toBe(PieChart);

                const section0 = value.sections[0];
                expect(section0?.label).toBe('GitHub');
                expect(section0?.value).toBe(100);

                const section1 = value.sections[1];
                expect(section1?.label).toBe('GitHub');
                expect(section1?.value).toBe(50);
            });
        });
    });
});
