/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

/**
 * Matches single and multiline accessible description
 */
const accessibilityDescrRegex =
    // eslint-disable-next-line regexp/strict, regexp/no-super-linear-backtracking
    /accDescr(?:[\t ]*:[\t ]*([^\n\r]*)|\s*{([^}]*)})/y;
export const matchAccessibilityDescr: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    accessibilityDescrRegex.lastIndex = startOffset;
    return accessibilityDescrRegex.exec(text);
};
/* eslint-enable unicorn/no-null */
