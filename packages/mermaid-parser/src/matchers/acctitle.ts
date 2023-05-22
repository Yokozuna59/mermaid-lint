/* eslint-disable unicorn/no-null */
import {
    CustomPatternMatcherFunc,
    CustomPatternMatcherReturn,
} from 'chevrotain';

/**
 * Matches a single accessible title
 */
const accessibilityTitleRegex = /(?:^|[\t ]+)accTitle[\t ]*:[\t ]*([^\n]+)?/;
export const matchAccessibilityTitle: CustomPatternMatcherFunc = (
    string_: string,
) => {
    let result: CustomPatternMatcherReturn | null = null;
    let match = accessibilityTitleRegex.exec(string_);
    while (match !== null) {
        result = match[1] === undefined ? null : [match[1].trim()];
        string_ = string_.replace(match[0], '');
        match = accessibilityTitleRegex.exec(string_);
    }
    return result;
};
/* eslint-enable unicorn/no-null */
