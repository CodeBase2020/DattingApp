import { Component, Input, OnInit } from '@angular/core';
import { Members } from 'src/app/models/Members';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @Input() memberDetail : Members

  constructor() { }

  ngOnInit(): void {
    
  }

}
