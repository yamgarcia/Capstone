import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_modules/member';
import { MembersService } from './../../_services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;

  constructor(private MembersService: MembersService) {}

  ngOnInit(): void {
    this.members$ = this.MembersService.getMembers();
  }
}
