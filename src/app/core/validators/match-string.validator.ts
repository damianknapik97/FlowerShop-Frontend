import { ValidatorFn, AbstractControl } from '@angular/forms';

export function matchStringValidator(strToMatch: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
         const isStrMatching = strToMatch === control.value;
         return isStrMatching ?  null : {isStrMatching: false};
    };
}
