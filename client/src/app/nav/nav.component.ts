import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/internal/operators/take';
import { UserParams } from '../_modules/UserParams';

@Component({
  //Use selector to add components to other components
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  // user: User;
  // userParams: UserParams;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (res) => {
        console.log(res);
        this.router.navigateByUrl('/members');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }

  // Double exclamation (!!) turns objs in booleans,
  // if null then false, if something then true
  // this.loggedIn = !!user;
}
