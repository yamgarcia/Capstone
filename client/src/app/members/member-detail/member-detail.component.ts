import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  //memberTabs is the tabset in the html
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  //* provides information inside the tab
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMember();

    // select tabs baser on the query
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

  //* getMember param is to get username as per written in the app-routing
  loadMember() {
    this.membersService
      .getMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      });
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.userName)
      .subscribe((message) => {
        this.messages = message;
      });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  /**
   * tabs go from one to zero (top to bottom) like arrays
   * @param tabId
   */
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
