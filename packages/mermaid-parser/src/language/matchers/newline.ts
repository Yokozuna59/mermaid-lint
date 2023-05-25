import { CustomPatternMatcherFunc } from 'chevrotain';

export const removeWhitespaces: CustomPatternMatcherFunc = (
    string_: string,
) => {
    return [
        string_.replaceAll(/^\s*|\s+$/gm, '').replaceAll(/[\n\r]{2,}/g, '\n'),
    ];
};
