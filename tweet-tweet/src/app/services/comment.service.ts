import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComment } from './../models/comment.interface';

const COMMENT_API: string = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem("Authorization")
  });
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  createComment(comment: IComment): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${COMMENT_API}/comment`, comment, { ...this.httpOptions, observe: 'response' });
}  
}
