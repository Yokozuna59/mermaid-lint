/* eslint-disable unicorn/no-null */
import { CustomPatternMatcherFunc } from 'chevrotain';

/**
 * Matches single and multiline accessible description
 */
const accessibilityDescrRegex =
    // eslint-disable-next-line regexp/strict
    /(?:^|[\t ]+)accDescr(?:[\t ]*:[\t ]*([^\n]+)?|\s*{([^}]+)?})/;
export const matchAccessibilityDescr: CustomPatternMatcherFunc = (
    string_: string,
) => {
    const match = accessibilityDescrRegex.exec(string_);
    if (match) {
        // single line description
        if (match[1] !== undefined) {
            return [match[1].trim()];
        }

        // multi line description
        if (match[2] !== undefined) {
            const result = match[2].replaceAll(/^\s*|\s+$/gm, '');
            return result ? [result] : null;
        }
    }
    return null;
};
/* eslint-enable unicorn/no-null */
