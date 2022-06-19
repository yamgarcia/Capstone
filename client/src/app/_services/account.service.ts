import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Services are injectable and singleton (the data isn't disposed
 *  until the application is closed).
 * Components data is destroied as soon as they are not in use.
 * Services are usually user for http requests but also have other uses.
 *
 * As Services operates as Singletons it stays up until the application is closed
 * making it a good place to store state. It makes Redux unnecessary.
 */

@Injectable({
  providedIn: 'root',
})

/**
 * AccountService provides the Observable currentUser$ and
 * methods to interact with the database:
 *
 * @class AccountService
 */
export class AccountService {
  baseUrl = environment.apiUrl;
  loginRoute = 'account/login';
  registerRoute = 'account/register';
  // ReplaySubject derives from Subjects which are both observables and observers
  private currentUserSource = new ReplaySubject<User>(1);
  // asObservable creates a new observable with the subject
  // "$" is used when the variable is going to be an observable
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  //anything inside the pipe is an RXJS operator (like the map)
  login(model: any) {
    return this.http.post(this.baseUrl + this.loginRoute, model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  /**
   *
   * @param model the formControl current values
   * @returns
   */
  register(model: any) {
    return this.http.post(this.baseUrl + this.registerRoute, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  /**
   * update currentUserSource
   * @param user to set as current user
   */
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    // Multiple roles come as arrays from the token while single value does not
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  /**
   * update currentUserSource with null
   */
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  /**
   * atob method takes a string, in this case the token that must be split in three parts.
   * Token composition is: header, payload, and signature.
   * [1] should return the second token segment.
   * @param token
   * @returns parsed token payload
   */
  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
