import { Injectable } from '@angular/core';
import { SUGAR_RUSH_API } from '../shared/globals/api';
import { User } from '../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private HttpClient: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.HttpClient.post<any>(`${SUGAR_RUSH_API.baseApi}/login?email=${email}&password=${password}`, null);
  }

  public register(user: User): Observable<any> {
    return this.HttpClient.post<any>(`${SUGAR_RUSH_API.baseApi}/register?id=${user.id}&firstName=Alex&lastName=Bo&username=${user.username}&email=${user.email}&password=${user.password}`, null);
  }

  public getUser(id: number) {
    return this.HttpClient.get<User>(SUGAR_RUSH_API.baseUsers + id);
  }
}
