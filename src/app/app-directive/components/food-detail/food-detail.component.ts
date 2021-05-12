import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EachFoodDetail} from '../../model/eachFoodDetail';
import {FoodService} from '../../services/food.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CartContent} from '../../model/cartContent';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, OnDestroy {
  id?: string;
  foodDetail?: EachFoodDetail;
  cartContent?: Array<CartContent>;
  private unSubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: EachFoodDetail) => {
      this.foodDetail = params;
    });
    this.foodService.cartContent.pipe(takeUntil(this.unSubscribe$), filter(data => data != null))
      .subscribe((cartContent: Array<CartContent>) => {
        this.cartContent = cartContent;
      });
  }

  cartAdd = (foodDetail: EachFoodDetail) => {
    let bool;
    bool = false;
    this.cartContent.forEach(element => {
      if (element.food === foodDetail.foodName) {
        bool = true;
        element.quantity = element.quantity + 1;
        element.price = element.quantity * foodDetail.price;
      }
      return;
    });
    if (!bool) {
      this.cartContent.push({
        food: foodDetail.foodName,
        quantity: 1,
        price: foodDetail.price
      });
    }
    this.toasterService.success('Added to cart.', 'SUCCESS');
    this.foodService.cartAdd$(this.cartContent);
  };


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
