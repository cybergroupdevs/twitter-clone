import { tap, catchError, map } from 'rxjs/operators';
import { AuthServiceService } from './services/auth-service.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(request.urlWithParams != "http://localhost:3000/login" && request.urlWithParams != "http://localhost:3000/signup"){
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          console.log("Unauthorized");
        }
        else if(error.status == 404){
          console.log("Not Found");
        }
        return throwError(error);
      })
    );
  }
}
