import { Component, OnInit } from '@angular/core';

@Component({
  //Use selector to add components to other components
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor() {}

  ngOnInit(): void {}

  login() {
    console.log(this.model);
  }
}
 