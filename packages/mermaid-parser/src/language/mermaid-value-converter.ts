/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CstNode, DefaultValueConverter, ValueType } from 'langium';
import { AbstractRule } from 'langium/lib/grammar/generated/ast';

const accessibilityDescrRegex =
    // eslint-disable-next-line regexp/strict, regexp/no-super-linear-backtracking
    /accDescr(?:[\t ]*:[\t ]*([^\n\r]*)|\s*{([^}]*)})/;
const accessibilityTitleRegex = /accTitle[\t ]*:[\t ]*([^\n\r]*)/;
const titleRegex = /title(?:[\t ]+([^\n\r]*)|$)/;

export class MermaidValueConverter extends DefaultValueConverter {
    override runConverter(
        rule: AbstractRule,
        input: string,
        cstNode: CstNode,
    ): ValueType {
        let regex: RegExp | undefined;
        switch (rule.name) {
            case 'ACC_DESCR': {
                regex = accessibilityDescrRegex;
                break;
            }
            case 'ACC_TITLE': {
                regex = accessibilityTitleRegex;
                break;
            }
            case 'TITLE': {
                regex = titleRegex;
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
