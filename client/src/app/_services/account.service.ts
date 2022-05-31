import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Services are injectable and singleton (the data isn't disposed until the application is closed)
  Components data is destroied as soon as they are not in use.
  Services are usually user for http requests but also have other uses.
*/

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
