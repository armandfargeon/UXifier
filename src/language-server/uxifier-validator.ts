import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { UxifierAstType, Person } from './generated/ast';
import { UxifierServices } from './uxifier-module';

/**
 * Map AST node types to validation checks.
 */
type UxifierChecks = { [type in UxifierAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class UxifierValidationRegistry extends ValidationRegistry {
    constructor(services: UxifierServices) {
        super(services);
        const validator = services.validation.UxifierValidator;
        const checks: UxifierChecks = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class UxifierValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
