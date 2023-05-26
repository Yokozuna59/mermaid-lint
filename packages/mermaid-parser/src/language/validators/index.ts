import { ValidationChecks } from 'langium';

import type { MermaidAstType, MermaidServices } from '../';

/**
 * Register custom validation checks.
 * @param services - services
 */
export function registerValidationChecks(services: MermaidServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation;
    const checks: ValidationChecks<MermaidAstType> = {
        PieChart: void validator.PieChartValidator.checkUniqueSecionLabels,
    };
    registry.register(checks, validator);
}

export * from './pie-validator';
