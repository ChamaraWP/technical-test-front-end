import { createAction, props } from '@ngrx/store';
import { CreditCardPayment } from '../data-models/credit-card.model';


export const postCreditCardData = createAction(
  '[Credit Card] Post Credit Card Details',
  props<{cardData:CreditCardPayment}>()
);

export const postCreditCardDataSuccess = createAction(
  '[Credit Card] Post Credit Card Details Success',
  props<{ response:any ,cardData:CreditCardPayment }>()
);

export const postCreditCardDataFailure = createAction(
  '[Credit Card] Post Credit Card Details Failure',
  props<{ error: any }>()
);

export const clearState = createAction(
  '[Credit Card] Clear State',
 );
