/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

import { CustomMatcherReturn } from '.';

/**
 * Matches single and multiline accessible description
 */
const accessibilityDescrRegex =
    // eslint-disable-next-line regexp/strict, regexp/no-super-linear-backtracking
    /accDescr(?:[\t ]*:[\t ]*([^\n]*)|\s*{([^}]*)})/;
export const matchAccessibilityDescr: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    accessibilityDescrRegex.lastIndex = startOffset;
    let match: CustomMatcherReturn = accessibilityDescrRegex.exec(text);
    if (match !== null) {
        // single line description
        if (match[1] !== undefined && match[2] === undefined) {
            match.payload = match[1].trim() || undefined;
        }
        // multi line description
        else if (match[2] !== undefined && match[1] === undefined) {
            const result = match[2]
                .replaceAll(/^\s*/gm, '')
                .replaceAll(/\s+$/gm, '');
            match.payload = result || undefined;
        } else {
            match = null;
        }
    }
    return match;
};
/* eslint-enable unicorn/no-null */
