import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';

@Component({
  //Use selector to add components to other components
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.accountService.logout();
  }

  // Double exclamation (!!) turns objs in booleans,
  // if null then false, if something then true
  // this.loggedIn = !!user;
}
