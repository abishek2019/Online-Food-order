import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Subject} from 'rxjs';
import {CartContent} from '../../model/cartContent';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CartInfoComponent} from '../cartInfo/cart-info.component';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  checkoutContent?: Array<CartContent>;
  paymentForm?: FormGroup;
  @ViewChild(CartInfoComponent, {static: false}) child;
  private unSubscribe$ = new Subject<void>();

  constructor(
    private foodService: FoodService,
    private router: Router,
    private fb: FormBuilder,
    private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.checkoutContent = this.child.checkoutContent;
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
    console.log('Payment info is:');
    console.log(this.paymentForm.value);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
