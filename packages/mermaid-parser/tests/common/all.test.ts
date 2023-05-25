import { LangiumDocument, createServicesForGrammar } from 'langium';
import { parseHelper } from 'langium/lib/test';
import { beforeAll, describe, expect, it } from 'vitest';

import {
    Mermaid,
    MermaidGrammar,
    MermiadTokenBuilder,
} from '../../src/language';

describe('all', () => {
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

    describe('title', () => {
        it.todo('title then accTitle then single line accDescr', async () => {
            const string_ = `pie
            title sample
            accTitle: test
            accDescr: wow`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });

        it.todo('title then accTitle then multi line accDescr', async () => {
            const string_ = `pie
            title sample
            accTitle: test
            accDescr {
                wow
            }`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });

        it.todo('title then single line accDescr then accTitle', async () => {
            const string_ = `pie
            title sample
            accDescr: wow
            accTitle: test`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });

        it.todo('title then multi line accDescr then accTitle', async () => {
            const string_ = `pie
            title sample
            accDescr {
                wow
            }
            accTitle: test`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });
    });

    describe('accTitle', () => {
        it.todo('accTitle then title then single line accDescr', async () => {
            const string_ = `pie
            accTitle: test
            title sample
            accDescr: wow`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });

        it.todo('accTitle then title then multi line accDescr', async () => {
            const string_ = `pie
            accTitle: test
            title sample
            accDescr {
                wow
            }`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });

        it.todo('accTitle then single line accDescr then title', async () => {
            const string_ = `pie
            accTitle: test
            accDescr: wow
            title sample`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });

        it.todo('accTitle then multi line accDescr then title', async () => {
            const string_ = `pie
            accTitle: test
            accDescr {
                wow
            }
            title sample`;
            const { parseResult: result } = await parser(string_);
            expect(result.parserErrors).toHaveLength(0);
            expect(result.lexerErrors).toHaveLength(0);

            const value = result.value;
            expect(value.title).toBe('sample');
            expect(value.accDescr).toBe('wow');
            expect(value.accTitle).toBe('test');
        });
    });

    describe('accDescr', () => {
        describe('single line', () => {
            it.todo('accDescr then accTitle then title', async () => {
                const string_ = `pie
                accDescr: wow
                accTitle: test
                title sample`;
                const { parseResult: result } = await parser(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('sample');
                expect(value.accDescr).toBe('wow');
                expect(value.accTitle).toBe('test');
            });

            it.todo('accDescr then title then accTitle', async () => {
                const string_ = `pie
                accTitle: test
                accDescr: wow
                title sample`;
                const { parseResult: result } = await parser(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('sample');
                expect(value.accDescr).toBe('wow');
                expect(value.accTitle).toBe('test');
            });
        });

        describe('multi line', () => {
            it.todo('accDescr then accTitle then title', async () => {
                const string_ = `pie
                accDescr {
                    wow
                }
                accTitle: test
                title sample`;
                const { parseResult: result } = await parser(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('sample');
                expect(value.accDescr).toBe('wow');
                expect(value.accTitle).toBe('test');
            });

            it.todo('accDescr then title then accTitle', async () => {
                const string_ = `pie
                accDescr {
                    wow
                }
                title sample
                accTitle: test`;
                const { parseResult: result } = await parser(string_);
                expect(result.parserErrors).toHaveLength(0);
                expect(result.lexerErrors).toHaveLength(0);

                const value = result.value;
                expect(value.title).toBe('sample');
                expect(value.accDescr).toBe('wow');
                expect(value.accTitle).toBe('test');
            });
        });
    });
});
