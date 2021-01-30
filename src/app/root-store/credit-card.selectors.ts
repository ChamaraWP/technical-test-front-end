import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../root-store/index';
import { CreditCardInfoState } from './credit-card.reducer';

export const selectedCreditCardState = createFeatureSelector<State,CreditCardInfoState>(
  'creditCardState'
);
export const selectCreditCardInfo = createSelector(
  selectedCreditCardState,
  ({ customerData }) => {
   return customerData;
  }
);
export const isCreditCardInfoLoading = createSelector(
  selectedCreditCardState,
  ({ isLoading }) => {
    return isLoading
  }
);
export const isCreditCardInfoSuccess = createSelector(
  selectedCreditCardState,
  ({ isSuccess }) => {
    return isSuccess
  }
);
export const creditCardInfoHasError = createSelector(
  selectedCreditCardState,
  ({ error }) => {
    return error
  }
);
