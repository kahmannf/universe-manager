import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from '../_model/user';
import { ServerResultMessage } from '../_model/server-result-message';

import { environment as env } from "../../environments/environment";
import { HttpBackend } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient) { }

  logInUser(user:User): Observable<ServerResultMessage> {
    return this.http.get<ServerResultMessage>(env.apiUrl + 'auth/login');
  }

}
