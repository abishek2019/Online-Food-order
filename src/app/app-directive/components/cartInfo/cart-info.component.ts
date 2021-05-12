import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';
import {CartContent} from '../../model/cartContent';
import {FoodService} from '../../services/food.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit, OnDestroy {
  cartContent?: Array<CartContent>;
  totalPrice?: number;
  private unSubscribe$ = new Subject<void>();

  constructor(
    private foodService: FoodService,
    private router: Router,
    private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.foodService.cartContent.pipe(takeUntil(this.unSubscribe$), filter(data => data != null))
      .subscribe((cartContent: Array<CartContent>) => {
        this.cartContent = cartContent;
        let sum: number;
        sum = 0;
        this.cartContent.forEach(element => {
          sum += Number(element.price);
        });
        this.totalPrice = Number(sum);
      });
  }

  checkout = () => {
    this.router.navigate(['/', 'cart']).then();
  }

  empty = () => {
    this.cartContent = [];
    this.foodService.Cart.next(this.cartContent);
    this.toasterService.success('Cart Emptied', 'SUCCESS');
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
