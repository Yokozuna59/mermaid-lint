import { CustomPatternMatcherFunc, EOF, TokenType } from 'chevrotain';
import { DefaultTokenBuilder } from 'langium';
import { TerminalRule } from 'langium/lib/grammar/generated/ast';

const titleRegex = /(?:^|[ \t]+)title(?:[ \t]+([^\n]*)|$)/;
const matchTitle: CustomPatternMatcherFunc = (str: string) => {
    const match = titleRegex.exec(str);
    if (match) {
        // single line title
        if (match[1] !== undefined) {
            return [match[1].trim()];
        }
    }
    return null;
};

/**
 * Matches a single accessible title
 */
const accTitleRegex = /(?:^|[ \t]+)accTitle[ \t]*:[ \t]*([^\n]*)?/;
const matchAccTitle: CustomPatternMatcherFunc = (str: string) => {
    const match = accTitleRegex.exec(str);
    if (match) {
        // single line title
        if (match[1] !== undefined) {
            return [match[1].trim()];
        }
    }
    return null;
};

/**
 * Matches single and multiline accessible description
 */
const accDescrRegex =
    /(?:^|[ \t]+)accDescr(?:[ \t]*:[ \t]*([^\n]*)?|\s*{([^}]*)?})/;
const matchAccDescr: CustomPatternMatcherFunc = (str: string) => {
    const match = accDescrRegex.exec(str);
    if (match) {
        // single line description
        if (match[1] !== undefined) {
            return [match[1].trim()];
        }

        // multi line description
        if (match[2] !== undefined) {
            return [match[2].replace(/^(\n+|[ \t]+)|\s+$/gm, '')];
        }
    }
    return null;
};

export class MermiadTokenBuilder extends DefaultTokenBuilder {
    override buildTerminalToken(terminal: TerminalRule): TokenType {
        let tokenType = super.buildTerminalToken(terminal);
        if (tokenType.name === 'EOF') {
            tokenType = EOF;
        } else if (tokenType.name === 'TITLE') {
            tokenType.LINE_BREAKS = false;
            tokenType.PATTERN = matchTitle;
            tokenType.START_CHARS_HINT = ['title'];
        } else if (tokenType.name === 'ACC_TITLE') {
            tokenType.LINE_BREAKS = false;
            tokenType.PATTERN = matchAccTitle;
            tokenType.START_CHARS_HINT = ['accTitle'];
        } else if (tokenType.name === 'ACC_DESCR') {
            tokenType.LINE_BREAKS = true;
            tokenType.PATTERN = matchAccDescr;
            tokenType.START_CHARS_HINT = ['accDescr'];
        }
        return tokenType;
    }
}