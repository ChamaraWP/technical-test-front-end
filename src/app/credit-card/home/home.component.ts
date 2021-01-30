import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CreditCardPayment } from 'src/app/data-models/credit-card.model';
import { State } from 'src/app/root-store';
import { clearState } from 'src/app/root-store/credit-card.actions';
import { selectCreditCardInfo } from 'src/app/root-store/credit-card.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription = new Subscription();
  userCreditCardInfo:CreditCardPayment = null;


  constructor(private router:Router,private store: Store<State>,) { }

  ngOnInit(): void {
    this.getUserSubmittedDate();
  }

  onStartButtonClick(){
    this.router.navigate(['/checkout'])
  }

  getUserSubmittedDate() {
    this.subscription.add(
      this.store.pipe(select(selectCreditCardInfo)).subscribe((response) => {
        this.userCreditCardInfo = response;
      })
    );
  }

  setStateEmpty(){
    this.store.dispatch(clearState());
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
