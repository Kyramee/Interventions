import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {

    static courrielDifferents(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (!c['controls'].courriel.value || !c['controls'].confirmationCourriel.value) {
                return { 'erreurDifferent': true };
            }
            
            return c['controls'].courriel.value === c['controls'].confirmationCourriel.value ? { 'erreurDifferent': false } : { 'erreurDifferent': true };
        };
    }
} 