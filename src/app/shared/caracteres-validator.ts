import { ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";

export class verifCaracteres {
    static plage(): ValidatorFn {
        return(c: AbstractControl): { [key: string]: boolean } | null => {
            if(c.value >= 1 && c.value <= 5) {
                return { 'plage' : true };
            } else {
                return { 'plage' : false };
            }
        };
    }

    static sansEspace(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            for(var i = 0; i < c.value.length; i++){
                if(c.value[i] != ' '){
                    return {'sansEspace' : true};
                }
            }
            return {'sansEspace' : false};
        };
    }

    static longueurMinimum(): ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            return {'longueurMinimum' : (c.value.trim().length > 2) ? false : true };
        }
    }
}