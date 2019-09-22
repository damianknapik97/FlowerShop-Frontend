import { matchStringValidator } from '../validators/match-string.validator';
import { AbstractControl, Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Input, Directive } from '@angular/core';

@Directive({
    selector: '[appMatchString]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MatchStringValidatorDirective, multi: true }]
})
export class MatchStringValidatorDirective implements Validator {
    @Input('appMatchString') strToMatch: string;
    validate(control: AbstractControl): {[key: string]: any} | null {
        return this.strToMatch ? matchStringValidator(this.strToMatch)(control) : null;
    }
}
