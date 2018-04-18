import { ValidatorFn } from "@angular/forms";

export class VerifPrenomValidator {
    static plage(): ValidatorFn {
        return(): { [key: string]: boolean } | null => {
            return { 'plage':true};
        };
    }
}