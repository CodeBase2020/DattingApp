import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _service : AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token : string;
    
    this._service.currentUser$.pipe(take(1)).subscribe(
      res => {
        token = res.token;
      }
    );

    request = request.clone({ 
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
