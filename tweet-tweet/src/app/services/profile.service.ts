import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
 
  private log(message: string) {
    console.log(message);
  }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem("Authorization")
});
headerOptions = {
    header: this.headers
}
  header_token: HttpHeaders = new HttpHeaders().set("token", localStorage.getItem("Authorization"));

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error.status); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(error as T);
      };
    }
 
  profileData(id): Observable<any>{
    return this.http.get("http://localhost:3000/profile/"+id, {...this.headerOptions, observe: 'response'}).pipe(
      tap(_ => this.log("profile details")),  
    catchError(this.handleError<any>('error in details')
    ));
  }
}
