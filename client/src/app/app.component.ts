import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // filmIcon = faFilm;
  title = 'The Dating App';
  users: any;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.log(err),
    });
  }
}
