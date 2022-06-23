import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string;
  //must match the input's "name" attribute in the form
  //must have a ngModel (two way binding)
  messageContent: string;
  //`public injections can be accessed by the component template (html file)
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}

  /**
   * Changing to a promise returned by the message service
   * Switch to the user of .then
   */
  sendMessage() {
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }
}
