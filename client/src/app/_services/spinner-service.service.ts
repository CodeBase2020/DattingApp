import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerCount = 0;
  constructor(private _spinnerService : NgxSpinnerService) { }

  busy()
  {
     this.spinnerCount++;
     this._spinnerService.show(undefined,{
      type: "timer",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
     });
  }

  idle()
  {
    this.spinnerCount--;

    if(this.spinnerCount<=0)
    {
      this.spinnerCount = 0;
      this._spinnerService.hide();
    }

  }
}
