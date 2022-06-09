import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from './../_modules/member';
import { Observable } from 'rxjs';
//? services in Angular let you define code or functionalities that are then
//? accessible and reusable in many other components in your Angular project.

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }
  
  /**
   * 
   * @param username 
   * @returns an Observable from the method http.get()
   */
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  /**
   * 
   * @param member 
   * @returns {Observable} an Observable from the method http.put()
   */
  updateMember(member: Member): Observable<any>{
    return this.http.put(this.baseUrl + 'users', member)
  }
}
