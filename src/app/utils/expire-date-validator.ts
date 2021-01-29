import { AbstractControl,ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static cardExpirationDateValidator(): ValidatorFn{
        return (control:AbstractControl):{ [key : string] :any} | null => {
            console.log(control.value);
            if(control.value !== null && String(control.value).length >= 9){
               let inputDate = new Date(control.value);
               let currentDate = new Date();
               return (inputDate >= currentDate) ? null : {expirationLimit: true };
            }
            return null;
        }
    }

}
