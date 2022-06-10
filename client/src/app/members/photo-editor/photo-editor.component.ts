import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_modules/member';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  // Receive member from parent component
  @Input() member: Member

  constructor() { }

  ngOnInit(): void {
  }

}
