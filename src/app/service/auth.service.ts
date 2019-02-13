import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, User, Auth } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private token = '';
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  // POST
  register(user: User): Observable<Auth> {
    user.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'email': user.email } }).pipe(switchMap(val => {
      if (JSON.stringify(val).length > 0) {
        throw Error('user existed');
      }
      return this.http.post(uri, user).pipe(map(res => ({ token: this.token, user: user as User })));
    }
    ));
  }

  // PUT
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'email': username, 'password': password } }).pipe(map(res => {
      if (JSON.stringify(res).length === 0) {
        throw Error('username or password not match');
      }
      return {
        token: this.token,
        user: res[0]
      };
    }));
  }
}
