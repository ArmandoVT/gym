import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyB0g1AWiIXqXUUArjqSdurc9H3uQje1UaY';

  tokenUser: string;

  constructor( private http: HttpClient ) { }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn( user: UserModel) {
    const authDate = {
      ...user, returnSecureToken: true };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authDate
    ).pipe(
      map( resp => {
        this.saveToken( resp[ 'idToken' ] );
        return resp;
      })
    );
  }

  registerUser( user: UserModel ) {
    const authDate = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authDate
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private saveToken( tokenId: string ) {
    this.tokenUser = tokenId;
    localStorage.setItem('token', tokenId);
  }

  readToken() {
    if ( localStorage.getItem('token') ) {
      this.tokenUser = localStorage.getItem('token');
    } else {
      this.tokenUser = '';
    }
    return this.tokenUser;
  }

  verify(): boolean {
    if ( localStorage.getItem('token') ) {
      return true;
    } else {
      return false;
    }
  }
}
