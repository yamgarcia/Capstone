import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  // outputPath is where the build folder is created on ng build
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get400ValidationsError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.validationErrors = err;
      }
    );
  }
}
