/* eslint-disable unicorn/no-null */
import {
    CustomPatternMatcherFunc,
    CustomPatternMatcherReturn,
    EOF,
    TokenType,
} from 'chevrotain';
import { DefaultTokenBuilder } from 'langium';
import { TerminalRule } from 'langium/lib/grammar/generated/ast';

/**
 * Matches a single title
 */
const titleRegex = /(?:^|[\t ]+)title(?:[\t ]+([^\n]*)|$)/;
const matchTitle: CustomPatternMatcherFunc = (string_: string) => {
    const match = titleRegex.exec(string_);
    if (match && match[1] !== undefined) {
        return [match[1].trim()];
    }
    return null;
};

/**
 * Matches a single accessible title
 */
const accumulatorTitleRegex = /(?:^|[\t ]+)accTitle[\t ]*:[\t ]*([^\n]+)?/;
const matchAccumulatorTitle: CustomPatternMatcherFunc = (string_: string) => {
    let result = null;
    let match = accumulatorTitleRegex.exec(string_);
    while (match !== null) {
        result = match[1] === undefined ? null : [match[1].trim()];
        string_ = string_.replace(match[0], '');
        match = accumulatorTitleRegex.exec(string_);
    }
    return result as CustomPatternMatcherReturn;
};

/**
 * Matches single and multiline accessible description
 */
const accumulatorDescrRegex =
    // eslint-disable-next-line regexp/strict
    /(?:^|[\t ]+)accDescr(?:[\t ]*:[\t ]*([^\n]+)?|\s*{([^}]+)?})/;
const matchAccumulatorDescr: CustomPatternMatcherFunc = (string_: string) => {
    const match = accumulatorDescrRegex.exec(string_);
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

export class MermiadTokenBuilder extends DefaultTokenBuilder {
    override buildTerminalToken(terminal: TerminalRule): TokenType {
        let tokenType = super.buildTerminalToken(terminal);
        switch (tokenType.name) {
            case 'EOF': {
                tokenType = EOF;
                break;
            }
            case 'ACC_DESCR': {
                tokenType.LINE_BREAKS = true;
                tokenType.PATTERN = matchAccumulatorDescr;
                tokenType.START_CHARS_HINT = ['accDescr'];
                break;
            }
            case 'ACC_TITLE': {
                tokenType.LINE_BREAKS = false;
                tokenType.PATTERN = matchAccumulatorTitle;
                tokenType.START_CHARS_HINT = ['accTitle'];
                break;
            }
            case 'TITLE': {
                tokenType.LINE_BREAKS = false;
                tokenType.PATTERN = matchTitle;
                tokenType.START_CHARS_HINT = ['title'];
                break;
            }
        }
        return tokenType;
    }
}
/* eslint-enable unicorn/no-null */
