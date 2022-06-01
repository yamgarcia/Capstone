import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // filmIcon = faFilm;
  title = 'The Dating App';
  users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.log(err),
    });
  }
}
