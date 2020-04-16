import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { ITweet } from '../models/tweet.interface';

const TWEET_API: string = 'http://localhost:3000/api/tweet';

@Injectable({
    providedIn: 'root'
})
export class TweetService{
    // headers: HttpHeaders = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem('Authorization')
    // });
    // httpOptions = {
    //     headers: this.headers
    // };

    constructor(private http: HttpClient){};

    createTweet(tweetObj: any): Observable<any>{    
        return this.http.post("http://localhost:3000/tweet", tweetObj);
    }

    // tweetOperations(type: string, operation: string, tweetId: string): Observable<HttpResponse<any>>{
    //     return this.http.patch<any>(TWEET_API, { type, operation, tweetId }, { ...this.httpOptions})
    // }
}