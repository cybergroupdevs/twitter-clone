import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { Observable } from 'rxjs';

const SEARCH_API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class SearchService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("Authorization")
    });
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    
    searchUser(user: string): Observable<HttpResponse<any>>{
        const params = new HttpParams().set('userhandle', user);
        return this.http.get<any>(SEARCH_API, {...this.httpOptions, observe: 'response', params});
    }
}
