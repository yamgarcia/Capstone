import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { Member } from 'src/app/_modules/member';
import { MembersService } from './../../_services/members.service';
import { MessageService } from './../../_services/message.service';
import { PresenceService } from './../../_services/presence.service';
import { AccountService } from './../../_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  //memberTabs is the tabset in the html
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  //* provides information inside the tab
  activeTab: TabDirective;
  messages: Message[] = [];
  user: User;

  constructor(
    public presence: PresenceService,
    private membersService: MembersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
    //deactivates the routeReuseStrategy the the component reloads and new messages are shown
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    //` this uses the member-detailed.resolver to garantee the member is fetched
    this.route.data.subscribe((data) => {
      this.member = data.member;
    });

    // select tabs based on the query
    this.route.queryParams.subscribe((param) => {
      param.tab ? this.selectTab(param.tab) : this.selectTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  /* //getMember param is to get username as per written in the app-routing
  loadMember() {
    this.membersService
    .getMember(this.route.snapshot.paramMap.get('username'))
    .subscribe((member) => {
      this.member = member;
    });
  }
  */

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.userName)
      .subscribe((message) => {
        this.messages = message;
      });
  }

  /**
   * Create hub connection when user enters messages tab
   * Stops the hub connection when the user changes tabs
   * @param data
   */
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  /**
   * Life cicle method that takes care of when this component isn't active any more
   * Stops the hub connection in case the user does something else than activating another tab
   */
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  /**
   * tabs go from one to zero (top to bottom) like arrays
   * @param tabId
   */
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
