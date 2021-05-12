import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from '../model/response-model';
import {EachFoodDetail} from '../model/eachFoodDetail';
import {CartContent} from '../model/cartContent';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // I have used dummy-api food data which is in 'foodlist.json' file in 'assests' folder.

  Cart = new BehaviorSubject<Array<CartContent>>([]);
  cartContent = this.Cart.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  get$ = (): Observable<ResponseModel<Array<EachFoodDetail>>> =>
    this.http.get<ResponseModel<Array<EachFoodDetail>>>('./assets/foodlist.json')

  cartAdd$ = (content: Array<CartContent>) => this.Cart.next(content);

}
