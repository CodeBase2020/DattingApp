import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';


@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private _toster: ToastrService,private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {

        switch (error.status) {
          case 400:
               const validationErrors = [];
               for(const key in error.error.errors)
               {
                 if(error.error.errors[key])
                 {
                      validationErrors.push(error.error.errors[key]);                      
                 }
               }    
               return validationErrors;    

            break;
            case 500:
                const navigationstate : NavigationExtras = { state: { error: error.error }};
                 this.route.navigate(['/internel-server'],navigationstate);
                 break;
            case 401:
              this._toster.error(error.error.title,error.status);
             case 404:
              
                  this.route.navigateByUrl('/not-found');
                  break;
          default:
            this._toster.error(error.error.title,error.status);
            break;
        }
         return throwError(error);
      }  
      )
    );
  }
}
