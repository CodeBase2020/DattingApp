import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Members } from '../models/Members';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

members : Members[] = [];

  constructor(private _http: HttpClient) { }


  apiUrl = environment.apiUrl



  getMembers()
  {
    if(this.members.length > 0) return of(this.members);

     return this._http.get<Members[]>(this.apiUrl + 'Users').
     pipe(map(
       (members) => {
          this.members = members; 
          return members;
       }
     ))
  }

  getMember(userName : string)
  {
    
    const  member = this.members.find(x => x.username === userName);

    if(member !== undefined) return of(member);
    
    return this._http.get<Members>(this.apiUrl + 'Users/' + userName)
  }

  UpdateMember(userDetails : Members)
  {
    

    return this._http.put(this.apiUrl + 'Users/Update', userDetails)
    .pipe(
      map(() => {   
        const index = this.members.indexOf(userDetails);   
        this.members[index]= userDetails;
      })
    )      
  }
}
