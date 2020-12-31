import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isRegistration = false;

  constructor(private _client: HttpClient) { }

  ngOnInit(): void {
  }

  Registration()
  {
       this.isRegistration = !this.isRegistration;
  }
  CancelonDemand(event: boolean)
  {
    this.isRegistration = event;
  }
  serverErrro()
  {
     this._client.get("https://localhost:5001/api/buggy/server-error").subscribe(
       error => {
        // console.log(error);
       }
     );
  }
  

}
