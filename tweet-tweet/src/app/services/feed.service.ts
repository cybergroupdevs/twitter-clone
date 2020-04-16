import { ITweet } from 'src/app/models/tweet.interface';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

const FEED_API = 'http://localhost:3000/api/tweet';

@Injectable({
    providedIn: 'root'
})
export class FeedService{

    // header_token: HttpHeaders = new HttpHeaders().set("Authentication", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThiNDhmNjYyYTMzNTY4NDhiNTU5NDciLCJ1c2VyaGFuZGxlIjoic2h1YmhhbV9zaGFybWEiLCJuYW1lIjoiU2h1YmhhbSBTaGFybWEiLCJpYXQiOjE1ODYxODY0ODd9.zu9C-uOolxvCg6nvcaF1Z8g-KqQ16VF3gmC5f8Nrgg0");

    private log(message: string) {
        console.log(message);
    }

    constructor(private http: HttpClient){}

    showTweets(): Observable<any> {
        return this.http.get("http://localhost:3000/tweet");
    }

    private handleError<T> (result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
      
            // Let the app keep running by returning an empty result.
            return of(error as T);
          };
    }
}