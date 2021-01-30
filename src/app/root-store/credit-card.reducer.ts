import { createReducer, on } from "@ngrx/store";
import { CreditCardPayment } from "../data-models/credit-card.model";
import * as creditCardActions from '../root-store/credit-card.actions'

export interface CreditCardInfoState {
    customerData:CreditCardPayment;
    isLoading:boolean,
    isSuccess:any,
    error:any;
}

const initialState: CreditCardInfoState = {
    customerData:null,
    isLoading:true,
    isSuccess:null,
    error:null
}

export const creditCardInfoReducer = createReducer(
    initialState,
    on(creditCardActions.postCreditCardData, (state,) => {
      return { ...state,isLoading: true,isSuccess:null };
    }),
    on(creditCardActions.postCreditCardDataSuccess, (state,{ response,cardData }) => {
      return { ...state,customerData:cardData,isLoading: true, isSuccess:response };
    }),
    on(creditCardActions.postCreditCardDataFailure, (state,{ error }) => {
      return { ...state, error:error , isLoading: true,isSuccess:null };
    }),
    on(creditCardActions.clearState, (state) => {
      return { ...state, customerData:null,isLoading: true,isSuccess:null,error:null , };
    }),
   
);