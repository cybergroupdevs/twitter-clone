import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('Authorization');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  public decodeToken(){
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

}
