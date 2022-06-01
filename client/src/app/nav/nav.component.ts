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

  ngOnInit(): void {
    this.getCurrentUser();
  }

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
    this.accountService.logout();
    this.loggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {
        // Double exclamation (!!) turns objs in booleans,
        // if null then false, if something then true
        this.loggedIn = !!user;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
