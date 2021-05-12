import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';
import {FoodService} from '../../services/food.service';
import {Subject} from 'rxjs';
import {CartContent} from '../../model/cartContent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  checkoutContent?: Array<CartContent>;
  paymentForm?: FormGroup;
  totalPrice?: number;
  private unSubscribe$ = new Subject<void>();

  constructor(
    private foodService: FoodService,
    private fb: FormBuilder,
    private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.foodService.cartContent.pipe(takeUntil(this.unSubscribe$), filter(data => data != null))
      .subscribe((cartContent: Array<CartContent>) => {
        this.checkoutContent = cartContent;
        let sum: number;
        sum = 0;
        this.checkoutContent.forEach(element => {
          sum += Number(element.price);
        });
        this.totalPrice = Number(sum);
      });
    this.initPaymentForm();
  }

  initPaymentForm = () => {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      creditCard: ['', Validators.required],
      cardType: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }


  submitPayment$ = () => {
    this.toasterService.success('Payment Done.', 'SUCCESS');
    console.log(`Payment info is:`);
    console.log(`Username: ${this.paymentForm.value.name}`);
    console.log(`Contact: ${this.paymentForm.value.contact}`);
    console.log(`Credit Card Num: ${this.paymentForm.value.creditCard}`);
    console.log(`Card type: ${this.paymentForm.value.cardType}`);
    console.log(`Pin: ${this.paymentForm.value.pin}`);
    console.log(`Amount: $${this.totalPrice}`);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
