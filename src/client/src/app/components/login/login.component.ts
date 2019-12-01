import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'mma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  message: string;
  hidePassword = true;
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    const success = await this.authService.login(
      this.email.value,
      this.password.value
    )
    if (success) {
      const url = this.authService.redirectUrl
        ? this.authService.redirectUrl
        : '/';
      this.router.navigate([url])
    } else {
      this.message = 'Sikertelen belépés!'
    }
  }
}
