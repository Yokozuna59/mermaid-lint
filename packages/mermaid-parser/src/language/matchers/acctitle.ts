/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

/**
 * Matches a single accessible title
 */
const accessibilityTitleRegex = /accTitle[\t ]*:[\t ]*([^\n\r]*)/;
export const matchAccessibilityTitle: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    accessibilityTitleRegex.lastIndex = startOffset;
    return accessibilityTitleRegex.exec(text);
};
/* eslint-enable unicorn/no-null */
