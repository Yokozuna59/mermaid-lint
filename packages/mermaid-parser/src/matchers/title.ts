/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

/**
 * Matches a single title
 */
const titleRegex = /(?:^|[\t ]+)title(?:[\t ]+([^\n]*)|$)/;
export const matchTitle: CustomPatternMatcherFunc = (string_: string) => {
    const match = titleRegex.exec(string_);
    if (match && match[1] !== undefined) {
        return [match[1].trim()];
    }
    return null;
};
/* eslint-enable unicorn/no-null */
