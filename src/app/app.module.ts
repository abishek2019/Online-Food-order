import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './app-directive/components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FoodModule} from './app-directive/modules/food.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './app-directive/containers/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartInfoComponent } from './app-directive/components/cartInfo/cart-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FoodModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
