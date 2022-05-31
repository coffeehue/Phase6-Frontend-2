import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getUrl: string = "http://localhost:8081/api/v1/user";

  constructor(private _httpClient: HttpClient) { }

  
  getUsers(): Observable<Users[]> {
    return this._httpClient.get<Users[]>(this.getUrl + "s").pipe(
      map(response => response)
    )
  }


  saveUser(user: Users) :Observable<Users>{
    return this._httpClient.post<Users>(this.getUrl,user);
  }

  
  getUserByName(name: string): Observable<Users> {
    return this._httpClient.get<Users>(this.getUrl +"byname/" + name).pipe(
      map(response => response)
    )
  }


}
