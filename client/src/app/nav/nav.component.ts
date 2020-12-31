import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  
})
export class NavComponent implements OnInit {

  modal : any = {};
  
  constructor(public _accountService: AccountService,private _route: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    
  }


  login()
  {
    this._accountService.login(this.modal).subscribe( (response: User) => {
    
      this.modal = {};
            
      //  this._route.navigateByUrl('/members');
    },error => {
     this.toastr.error(error.error);
    });
    
  }

  logout()
  {
    this._accountService.logout();
    this._route.navigateByUrl('/');
  }

}
