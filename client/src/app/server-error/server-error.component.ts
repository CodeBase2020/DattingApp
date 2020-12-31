import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  errorDetails : any;
  constructor(private _router : Router) { 

     this.errorDetails = _router.getCurrentNavigation().extras.state?.error;
     console.log(this.errorDetails['message']);
  }

  ngOnInit(): void {
  }

}
