import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl = 'https://localhost:5001/api/'
  constructor(private _http: HttpClient) { }

  login(modal: any)
  {
     return this._http.post(this.baseUrl + 'Account/login',modal).pipe(
       map((user : User) => { 
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
          return user;
       }
     ));
  }

  registerUser(modal: any)
  {
    return this._http.post(this.baseUrl +'Account/register',modal).pipe(
      map((user: User) => {
          localStorage.setItem('uesr',JSON.stringify(user));
          this.currentUserSource.next(user);
      }
    ));
  }

  setCurrentUser(user:User)
  {
     this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
