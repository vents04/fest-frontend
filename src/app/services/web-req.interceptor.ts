import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor  implements HttpInterceptor { 

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any> {
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("here");
        if(error.statusText === 'Unknown Error' || error.status === 500 || error.status === 0){
          //this.router.navigate(['/unknown-error']); 
        }
        return throwError(error);
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>){
    const token = this.authService.getAuthToken();
    if(token){
      if(request.url != '' && !request.url.includes('')){
        return request.clone({
          setHeaders: {
            'x-auth-token': token
          }
        })
      }
    }
    return request;
  }
}
