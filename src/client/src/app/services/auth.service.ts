import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '',
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User = null;
  redirectUrl: string;
  private usersUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async login(email: string, password: string): Promise<boolean> {
    const token = btoa(`${email}:${password}`);
    window.localStorage.setItem('token', token);
    httpOptions.headers =
      httpOptions.headers.set(
        'Authorization',
        `Basic ${token}`
      );
    try {

      const user = await this.http.post<User>(
        `${this.usersUrl}/login`,
        {

        },
        httpOptions
      ).toPromise();
      this.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));

      return Promise.resolve(true);
    } catch (e) {
      window.localStorage.removeItem('token');

      return Promise.resolve(false);
    }
  }

  logout() {
    httpOptions.headers = httpOptions.headers.set('Authorization', ``);
    this.user = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    this.router.navigate(['/logout']);
  }

  public async loginWithToken() {

    const token = window.localStorage.getItem('token');
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.user = user;
    httpOptions.headers =
      httpOptions.headers.set(
        'Authorization',
        `Basic ${token}`
      );
    const [email, password] = atob(token).split(':');
    //await this.login(email, password);
  }

  isLoggedIn() {
    return this.user != null;
  }
}

