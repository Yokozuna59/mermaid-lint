import { MultiMap, ValidationAcceptor } from 'langium';

import { PieChart, Section } from '../generated/ast';

/**
 * Implementation of `Pie Chart` validations.
 */
export class PieChartValidator {
    checkUniqueSecionLabels(model: PieChart, accept: ValidationAcceptor) {
        const labels = new MultiMap<string, Section>();
        for (const secion of model.sections) {
            if (secion.label) labels.add(secion.label, secion);
        }
        for (const [label, sections] of labels.entriesGroupedByKey()) {
            if (sections.length > 1) {
                for (const section of sections) {
                    accept('warning', `duplicate section label: ${label}`, {
                        node: section,
                        property: 'label',
                    });
                }
            }
        }
    }
}
