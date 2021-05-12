import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FoodDetailComponent} from '../components/food-detail/food-detail.component';
import {FoodMenuComponent} from '../components/food-menu/food-menu.component';
import {FoodService} from '../services/food.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {CartCheckoutComponent} from '../components/cart-checkout/cart-checkout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CartInfoComponent} from '../components/cartInfo/cart-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [FoodMenuComponent, FoodDetailComponent, CartCheckoutComponent, CartInfoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [FoodService]
})
export class FoodModule {
}
