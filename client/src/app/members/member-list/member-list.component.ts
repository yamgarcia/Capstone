import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_modules/member';
import { MembersService } from './../../_services/members.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService
      .getMembers(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.members = res.result;
        this.pagination = res.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }
}
