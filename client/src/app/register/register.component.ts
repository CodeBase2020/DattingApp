import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
 import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent implements OnInit {

  @Output() CancelfromRegistration  = new EventEmitter<boolean>();

  model:any = {};
  constructor(private _accountService : AccountService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registrationUser()
  {
      this._accountService.registerUser(this.model).subscribe(user => {
        this.model = {};
        this.cancel();
      },error => {
        this.toastr.error(error.error);
        
      });
  }

  cancel()
  {
    this.CancelfromRegistration.emit(false);
  }
 
}
