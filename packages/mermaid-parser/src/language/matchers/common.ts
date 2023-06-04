import { CustomPatternMatcherFunc } from 'chevrotain';

/**
 * Matches single and multiline accessible description
 */
export const accessibilityDescrRegex =
    // eslint-disable-next-line regexp/strict, regexp/no-super-linear-backtracking
    /accDescr(?:[\t ]*:[\t ]*([^\n\r]*)|\s*{([^}]*)})/y;
export const matchAccessibilityDescr: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    accessibilityDescrRegex.lastIndex = startOffset;
    return accessibilityDescrRegex.exec(text);
};

export const accessibilityTitleRegex = /accTitle[\t ]*:[\t ]*([^\n\r]*)/y;
export const matchAccessibilityTitle: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    accessibilityTitleRegex.lastIndex = startOffset;
    return accessibilityTitleRegex.exec(text);
};

/**
 * Matches a single title
 */
export const titleRegex = /title(?:[\t ]+([^\n\r]*)|$)/my;
export const matchTitle: CustomPatternMatcherFunc = (
    text: string,
    startOffset: number,
) => {
    titleRegex.lastIndex = startOffset;
    return titleRegex.exec(text);
};
