import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Members } from 'src/app/models/Members';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {

  constructor(private _memberService: MemberService) { }

  members$ : Observable<Members[]>;

  ngOnInit(): void {
    this.members$ = this._memberService.getMembers();
  }




}
