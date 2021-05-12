import {Component, OnDestroy, OnInit} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {ToastrService} from 'ngx-toastr';
import {ResponseModel} from '../../model/response-model';
import {EachFoodDetail} from '../../model/eachFoodDetail';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit, OnDestroy {
  foodList?: Array<EachFoodDetail>;
  private unSubscribe$ = new Subject<void>();

  constructor(
    private foodService: FoodService,
    private toasterService: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.foodService.get$().pipe(takeUntil(this.unSubscribe$), filter(data => data != null))
      .subscribe((data: ResponseModel<Array<EachFoodDetail>>) => {
          this.toasterService.success('Data fetched.', 'SUCCESS');
          this.foodList = data.data;
        },
        (error) => {
          this.toasterService.error('Data fetch failed.', 'ERROR');
        });
  }

  seeFoodDetails$ = (eachFood: EachFoodDetail) => {
    this.router.navigate(['/', 'foodDetail'], {queryParams: eachFood}).then();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
