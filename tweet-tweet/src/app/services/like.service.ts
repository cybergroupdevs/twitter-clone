import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILike,IUnlike } from '../models/like.interface';

const LIKE_API = 'http://localhost:3000/';

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

    like(likeObj: ILike): Observable<HttpResponse<ILike>>{
        return this.http.post<ILike>(`${LIKE_API}like`, likeObj, {...this.headerOptions, observe: 'response'});
    }

    unlike(unlikeObj: IUnlike): Observable<HttpResponse<IUnlike>>{
        return this.http.post<IUnlike>(`${LIKE_API}unlike`, unlikeObj, {...this.headerOptions, observe: 'response'});
    }

    getRelation(likeObj: ILike): Observable<HttpResponse<ILike>>{
        const params = new HttpParams()
            .set('tweetId', likeObj.tweetId)
            .set('userId', likeObj.userId);

        return this.http.get<ILike>(`${LIKE_API}like`, { ...this.headerOptions, observe: 'response', params });
    }
}