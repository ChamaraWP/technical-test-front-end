import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as creditCardActions from '../root-store/credit-card.actions';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
import { PaymentService } from "../core-services/payment-service/payment.service";
import { environment } from "src/environments/environment";

@Injectable()

export class CreditCardEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient, private paymentService: PaymentService) { }

  postCreditCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(creditCardActions.postCreditCardData),
      switchMap((action) => {
        const endpoint = environment.urls.payment;
        return this.paymentService.postPaymentData(endpoint, action.cardData).pipe(
          map((response) => {
            return creditCardActions.postCreditCardDataSuccess({
              response: response,
              cardData: action.cardData
            });
          }),
          catchError((error) => {
            return of(
              creditCardActions.postCreditCardDataFailure({ error: error })
            );
          })
        );
      })
    );
  });
}