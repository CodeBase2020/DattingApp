import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';
import { environment } from 'src/environments/environment';
import { Members } from '../models/Members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {



  constructor(private _http: HttpClient) { }


  apiUrl = environment.apiUrl



  getMembers()
  {
     return this._http.get<Members[]>(this.apiUrl + 'Users');
  }

  getMember(userName)
  {
    return this._http.get<Members>(this.apiUrl + 'Users/' + userName)
  }
}
