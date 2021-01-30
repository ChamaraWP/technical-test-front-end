import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreditCardFormComponent } from './credit-card/credit-card-form/credit-card-form.component';
import { HomeComponent } from './credit-card/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './root-store'
import { EffectsModule } from '@ngrx/effects';
import { CreditCardEffects } from './root-store/creadit-card.effects';
import { fakeBackendProvider } from './core-services/fake-backend/fake-backend-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ToastComponent } from './shared/toast/toast.component';
import { CardFormatPipe } from './utils/card-format.pipe';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    CreditCardFormComponent,
    HomeComponent,
    ToastComponent,
    CardFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([CreditCardEffects])
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent,ToastComponent]
})
export class AppModule { }
