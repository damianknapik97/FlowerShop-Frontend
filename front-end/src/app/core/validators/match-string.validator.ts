import { ValidatorFn, AbstractControl, Validator } from '@angular/forms';

export function matchStringValidator(strToMatch: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
         const isStrMatching = strToMatch === control.value;
         console.log(isStrMatching);
         return isStrMatching ?  null : {isStrMatching: false};
    };
}
