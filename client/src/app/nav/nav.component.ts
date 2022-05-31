import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';

@Component({
  //Use selector to add components to other components
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (res) => {
        console.log(res);
        this.loggedIn = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.loggedIn = false;
  }
}
