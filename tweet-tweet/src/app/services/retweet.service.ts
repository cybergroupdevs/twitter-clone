import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRetweet } from '../models/retweet.interface';

const RETWEET_API = 'http://localhost:3000/api/';

@Injectable({
    providedIn: 'root'
})
export class likeService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("Authorization")
    });
    headerOptions = {
        header: this.headers
    }

    constructor(private http: HttpClient){}

    retweet(retweetObj: IRetweet): Observable<HttpResponse<IRetweet>>{
        return this.http.post<IRetweet>(`${RETWEET_API}like`, retweetObj, {...this.headerOptions, observe: 'response'});
    }


    getRelation(retweetObj: IRetweet): Observable<HttpResponse<IRetweet>>{
        const params = new HttpParams()
            .set('tweetId', retweetObj.tweetId)
            .set('likedBy', retweetObj.userId);

        return this.http.get<IRetweet>(`${RETWEET_API}retweet`, { ...this.headerOptions, observe: 'response', params });
    }
}