/* eslint-disable security/detect-non-literal-regexp */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CstNode, DefaultValueConverter, ValueType } from 'langium';
import { AbstractRule } from 'langium/lib/grammar/generated/ast';

import {
    accessibilityDescrRegex,
    accessibilityTitleRegex,
    titleRegex,
} from './matchers';

export class MermaidValueConverter extends DefaultValueConverter {
    override runConverter(
        rule: AbstractRule,
        input: string,
        cstNode: CstNode,
    ): ValueType {
        let regex: RegExp | undefined;
        switch (rule.name) {
            // common
            case 'ACC_DESCR': {
                regex = new RegExp(accessibilityDescrRegex.source);
                break;
            }
            case 'ACC_TITLE': {
                regex = new RegExp(accessibilityTitleRegex.source);
                break;
            }
            case 'TITLE': {
                regex = new RegExp(titleRegex.source);
                break;
            }
        }
        if (regex !== undefined) {
            const match = regex.exec(input);
            if (match !== null) {
                if (match[1] !== undefined) {
                    return match[1].trim() || undefined!;
                } else if (match[2] !== undefined) {
                    const result = match[2]
                        .replaceAll(/^\s*/gm, '')
                        .replaceAll(/\s+$/gm, '');
                    return result || undefined!;
                }
                return undefined!;
            }
        }
        return super.runConverter(rule, input, cstNode);
    }
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */
/* eslint-enable security/detect-non-literal-regexp */
