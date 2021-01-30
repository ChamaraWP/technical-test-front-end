import { AbstractControl,ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static cardExpirationDateValidator(): ValidatorFn{
        return (control:AbstractControl):{ [key : string] :any} | null => {
            if(control.value !== null && String(control.value).length >= 9){
               let inputDate = new Date(control.value);
               let currentDate = new Date();
               return (inputDate >= currentDate) ? null : {expirationLimit: true };
            }
            return null;
        }
    }

    static minimumAmount(): ValidatorFn{
        return (control:AbstractControl):{ [key : string] :any} | null => {
            if(control.value !== null){
               let convertedValue = Number.parseInt(control.value.replace(/,/g, ""));
               return convertedValue === 0 ? {minAmount: true } : null ;
            }
            return null;
        }
    }

}
