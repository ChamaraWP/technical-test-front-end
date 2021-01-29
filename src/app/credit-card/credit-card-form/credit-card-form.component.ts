import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utils/expire-date-validator';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {

  creditCardForm:FormGroup;


  constructor(private formBuilder:FormBuilder) { 
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  private initializeForm(){
    this.creditCardForm = this.formBuilder.group({
      cardNumber:['',Validators.required],
      cardHolder:['',Validators.required],
      expirationDate:['',[Validators.required,CustomValidators.cardExpirationDateValidator()]],
      vcc:['',],
      amount:['',Validators.required]
    })
  }

  onFormSubmit(formValue){
    console.log(formValue);
  }

  get cardNumber(){
    return this.creditCardForm.get('cardNumber')
  }

  get cardHolder(){
    return this.creditCardForm.get('cardHolder')
  }

  get expirationDate(){
    return this.creditCardForm.get('expirationDate')
  }

  get vcc(){
    return this.creditCardForm.get('vcc')
  }

  get priceAmount(){
    return this.creditCardForm.get('amount')
  }


}
