/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

import { CustomMatcherReturn } from '.';

/**
 * Matches a single title
 */
const titleRegex = /title(?:[\t ]+([^\n]*)|$)/;
export const matchTitle: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    titleRegex.lastIndex = startOffset;
    let match: CustomMatcherReturn = titleRegex.exec(text);
    if (match !== null && match[1] !== undefined) {
        match.payload = match[1].trim() || undefined;
    } else {
        match = null;
    }
    return match;
};
/* eslint-enable unicorn/no-null */
