import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCreditCardReducer from './credit-card.reducer'

export interface State {
    creditCardState:fromCreditCardReducer.CreditCardInfoState;
}

export const reducers: ActionReducerMap<State> = {
    creditCardState:fromCreditCardReducer.creditCardInfoReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
