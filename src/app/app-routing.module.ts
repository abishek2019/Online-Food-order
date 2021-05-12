import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoodMenuComponent} from './app-directive/components/food-menu/food-menu.component';
import {FoodDetailComponent} from './app-directive/components/food-detail/food-detail.component';
import {CartCheckoutComponent} from './app-directive/components/cart-checkout/cart-checkout.component';
import {LoginComponent} from './app-directive/components/login/login.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: FoodMenuComponent},
  {path: 'foodDetail', component: FoodDetailComponent},
  {path: 'cart', component: CartCheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
