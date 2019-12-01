import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user';
import { Router } from '@angular/router';

@Component({
  selector: 'mma-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  message: string;
  hidePassword = true;
  newUser: User = new User();
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSubmit() {

    const users: User[] = await this.userService.getUsers();
    let validUser: boolean = true;


    for (let i = 0; i < users.length; i++) {
      if (users[i].email === this.email.value) {
        this.message = 'A megadott email címmel már regisztráltak!';
        validUser = false;
        break;
      }
    }

    if (!validUser) {
      return;
    }

    this.newUser.id = users[users.length - 1].id + 1;
    this.newUser.name = this.name.value;
    this.newUser.email = this.email.value;
    this.newUser.password = this.password.value;
    this.newUser.enabled = true;

    await this.userService.createUser(this.newUser)
      .then(() => this.router.navigate(['/login']));

  }
}
