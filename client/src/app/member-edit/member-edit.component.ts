import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  @ViewChild('editForm') editForm : NgForm;
  @HostListener('window:beforeunload',['$event']) beforeUnloadHandler(event) {
       return false;
  };
  memberDetails : Members;
  userDetail : User;
  
  constructor(private _accountservice : AccountService,private _memberService: MemberService
    ,private _toaster: ToastrService) { }

  

  ngOnInit(): void {
    this._accountservice.currentUser$.pipe(take(1)).subscribe(
      res => { this.userDetail = res; }
    );
    this.getMember();
  }

  getMember()
  {
      this._memberService.getMember(this.userDetail.userName).subscribe(
        resp => { this.memberDetails = resp;
         
        }
      )
  }

  UpdateProfileDetails()
  {
     this._memberService.UpdateMember(this.memberDetails).subscribe(resp => {
         this._toaster.success("Profile updated successfully");
      this.editForm.reset(this.memberDetails);
     });
    
  
  }

}
