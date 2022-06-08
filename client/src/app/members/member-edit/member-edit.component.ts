import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_modules/member';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from './../../_services/account.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {
    //take the user out of the currentUser$ (an observable) using the pipe
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
    });
  }
}
