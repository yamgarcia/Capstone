import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../_models/user';
import { ReplaySubject } from 'rxjs';

/*
  Services are injectable and singleton (the data isn't disposed
   until the application is closed).
  Components data is destroied as soon as they are not in use.
  Services are usually user for http requests but also have other uses.
*/

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  loginRoute = 'account/login';
  private currentUserSource = new ReplaySubject<User>(1);
  // "$" is used when the variable is going to be an observable
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  //anything inside the pipe is an RXJS operator
  login(model: any) {
    return this.http.post(this.baseUrl + this.loginRoute, model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
