/* eslint-disable unicorn/no-null */
import {
    CustomPatternMatcherFunc,
    CustomPatternMatcherReturn,
} from 'chevrotain';

/**
 * Matches a single title
 */
const titleRegex = /(?:^|[\t ]+)title(?:[\t ]+([^\n]+)?|$)/;
export const matchTitle: CustomPatternMatcherFunc = (string_: string) => {
    let result: CustomPatternMatcherReturn | null = null;
    let match = titleRegex.exec(string_);
    while (match !== null) {
        result = match[1] === undefined ? null : [match[1].trim()];
        string_ = string_.replace(match[0], '');
        match = titleRegex.exec(string_);
    }
    return result;
};
/* eslint-enable unicorn/no-null */
