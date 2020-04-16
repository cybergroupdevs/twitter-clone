import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ITweet} from '../models/tweet.interface'
const EXPLORE_API = 'http://localhost:3000/explore';
@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Authorization')
});
httpOptions = {
    headers: this.headers
};
  constructor(private http: HttpClient) { }
  showExploreTweets(): Observable<HttpResponse<any>>{
    return this.http.get<any>(EXPLORE_API , this.httpOptions);
  }
}
