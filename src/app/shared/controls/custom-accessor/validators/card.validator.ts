import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';

export function validateCard(): ValidatorFn {
    return ((control: AbstractControl): { [key: string]: boolean } | null => {
        const length: number = control.value?.cardNumber?.length

        return (length === 16 || length === 0) ? null : {cardLength: true};
    })
}

export function validateCardDelegate(control: AbstractControl): ValidationErrors | null {
    const length: number = control.value?.cardNumber?.length

    return (length === 16 || length === 0) ? null : {cardLength: true};
}

@Directive({
    selector: '[validateCard]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CardValidator),
            multi: true
        }
    ]
})
export class CardValidator implements Validator {
    public validate(control: AbstractControl): ValidationErrors | null {
        const length: number = control.value?.cardNumber?.length

        return (length === 16 || length === 0) ? null : {cardLength: true};
    }
}