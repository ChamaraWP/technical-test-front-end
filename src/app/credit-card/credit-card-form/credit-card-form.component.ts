import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { rejects } from 'assert';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/core-services/toast-service/toast.service';
import { CreditCardPayment } from 'src/app/data-models/credit-card.model';
import { State } from 'src/app/root-store';
import { postCreditCardData } from 'src/app/root-store/credit-card.actions';
import { isCreditCardInfoSuccess } from 'src/app/root-store/credit-card.selectors';
import { CustomValidators } from '../../utils/custom-validator';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss'],
})
export class CreditCardFormComponent implements OnInit {
  creditCardForm: FormGroup;
  subscription = new Subscription();
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private toastService: ToastService,
    private router:Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getSuccessResponse();
  }

  getSuccessResponse() {
    this.subscription.add(
      this.store.pipe(select(isCreditCardInfoSuccess)).subscribe((response) => {
        if (response) {
          this.showNotificationOnSuccess(response)
          .then(value => {
            if(value)
            this.router.navigate(['/'])
          }).catch(err => {
            this.showFail();
          })
        }
      })
    );
  }

  private initializeForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required,Validators.minLength(15)]],
      cardHolder: ['', Validators.required],
      expirationDate: [
        '',
        [Validators.required, CustomValidators.cardExpirationDateValidator()],
      ],
      vcc: [''],
      amount: ['', [Validators.required,CustomValidators.minimumAmount()]],
    });
  }

  onFormSubmit(formValues) {
    if (this.creditCardForm.invalid) {
      this.checkErrorsOnSubmit(this.creditCardForm);
    } else {
      this.isSubmitting = true;
      let payload = this.createPayload(formValues);
      this.store.dispatch(postCreditCardData({ cardData: payload }));
    }
  }

  showNotificationOnSuccess(response):Promise<boolean>{
    return new Promise((resolve,rejects) => {
      if(response && response?.statusCode === 201){
        this.showSuccess();
        this.isSubmitting = false;
        // set some delay display the toast properly
        setTimeout(function() {
          resolve(true);
        }, 2000);
        
      }else{
        rejects(false);
      }
    })
  }

  createPayload(formValues) {
    let dataSet = {} as CreditCardPayment;
    dataSet.creditCardNumber = formValues.cardNumber;
    dataSet.cardHolder = formValues.cardHolder;
    dataSet.expirationDate = formValues.expirationDate;
    dataSet.securityCode = formValues.vcc;
    dataSet.amount = formValues.amount;

    return dataSet;
  }

  checkErrorsOnSubmit(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      if (form.controls[key].invalid) {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
      }
    });
  }

  showSuccess() {
    this.toastService.show('Payment data has been saved successfully', {
      classname: 'bg-success-toast text-light',
      delay: 4000,
      autohide: true,
    });
  }

  showFail() {
    this.toastService.show('Something went wong', { classname: 'bg-danger text-light', delay: 5000 });
  }

  get cardNumber() {
    return this.creditCardForm.get('cardNumber');
  }

  get cardHolder() {
    return this.creditCardForm.get('cardHolder');
  }

  get expirationDate() {
    return this.creditCardForm.get('expirationDate');
  }

  get vcc() {
    return this.creditCardForm.get('vcc');
  }

  get priceAmount() {
    return this.creditCardForm.get('amount');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
