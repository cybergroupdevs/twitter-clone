import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IUser } from '../models/user.interface';
import { Login } from '../models/login.interface';
import { tap, catchError } from 'rxjs/operators';

const USER_DOMAIN: string = 'http://localhost:3000';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("Authorization")
    });
    signupHeader: HttpHeaders= new HttpHeaders({
        'Content-Type': 'application/json'
    });
    header_token: HttpHeaders = new HttpHeaders().set("Authentication", localStorage.getItem("Authentication"));
    
    httpOptions = {
        headers: this.headers
    };
    options = {
    headers: this.signupHeader
    }
    
    constructor(private http: HttpClient){}

    private log(message: string) {
        console.log(message);
    }

    createUser(user: IUser): Observable<HttpResponse<any>>{
        return this.http.post<any>(`${USER_DOMAIN}/signup`, user, { ...this.options, observe: 'response' });
    }   

    loginUser(user: Login): Observable<HttpResponse<any>>{
        return this.http.post<any>(`${USER_DOMAIN}/login`, user, { ...this.options, observe: 'response' });
    }

    updateUser(user: any, _id:string): Observable<HttpResponse<any>>{
        return this.http.patch<any>(`${USER_DOMAIN}/profile/${_id}`, user, { ...this.httpOptions, observe: 'response' });
    }   

    searchUser(name:string): Observable<any>{
        return this.http.get("http://localhost:3000/user/"+name);
    }
    
    userDetails(_id:string): Observable<HttpResponse<any>>{
        return this.http.get<any>(`${USER_DOMAIN}/profile/${_id}`, {...this.httpOptions, observe:'response'});
    }
    
    searchedUserDetails(userhandle: string): Observable<HttpResponse<any>>{
        return this.http.get<any>(`${USER_DOMAIN}/redirectedProfile/${userhandle}`, {...this.httpOptions, observe:'response'});
    }
    

}