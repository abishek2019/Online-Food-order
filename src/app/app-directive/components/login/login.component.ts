import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  credentials = {
    username: 'admin',
    password: 'admin',
  };
  quote = 'Please login to continue.';
  matchNull = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm$();
  }

  initLoginForm$ = () => {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin$ = () => {
    if (JSON.stringify(this.loginForm.value) === JSON.stringify(this.credentials)) {
      this.router.navigate(['/', 'menu']).then();
    } else {
      this.quote = 'Wrong credentials. Please login to continue.';
      this.matchNull = true;
    }
  }

}
