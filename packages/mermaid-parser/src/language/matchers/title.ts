/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

/**
 * Matches a single title
 */
const titleRegex = /title(?:[\t ]+([^\n\r]*)|$)/;
export const matchTitle: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    titleRegex.lastIndex = startOffset;
    return titleRegex.exec(text);
};
/* eslint-enable unicorn/no-null */
