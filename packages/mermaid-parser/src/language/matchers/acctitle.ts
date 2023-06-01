/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

import { CustomMatcherReturn } from '.';

/**
 * Matches a single accessible title
 */
const accessibilityTitleRegex = /accTitle[\t ]*:[\t ]*([^\n\r]*)/;
export const matchAccessibilityTitle: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    accessibilityTitleRegex.lastIndex = startOffset;
    let match: CustomMatcherReturn = accessibilityTitleRegex.exec(text);
    if (match !== null && match[1] !== undefined) {
        match.payload = match[1].trim() || undefined;
    } else {
        match = null;
    }
    return match;
};
/* eslint-enable unicorn/no-null */
