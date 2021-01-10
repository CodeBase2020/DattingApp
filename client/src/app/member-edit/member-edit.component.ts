import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Members } from '../models/Members';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  memberDetails : Members;
  userDetail : User;
  
  constructor(private _accountservice : AccountService,private _memberService: MemberService) { }

  

  ngOnInit(): void {
    this._accountservice.currentUser$.pipe(take(1)).subscribe(
      res => { this.userDetail = res; }
    );
    this.getMember();
  }

  getMember()
  {
      this._memberService.getMember(this.userDetail.userName).subscribe(
        resp => { this.memberDetails = resp; }
      )
  }

}
