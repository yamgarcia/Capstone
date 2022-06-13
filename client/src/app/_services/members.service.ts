import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from './../_modules/member';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { Pagination } from './../_models/pagination';
import { UserParams } from './../_modules/UserParams';

//? services in Angular let you define code or functionalities that are then accessible and reusable in many other components in your Angular project.
@Injectable({
  providedIn: 'root',
})

/**
 * @class MembersService
 */
export class MembersService {
  baseUrl = environment.apiUrl;
  usersRoute = 'users';

  members: Member[] = [];

  constructor(private http: HttpClient) {}

  //* "of" operator is used to return something "of" an Observable. It turns the value into an Observable. (Used in mock HTTP Responses)
  /**
   *
   * @returns an Observable of the already stored members or the Observable that results from the 'get'
   */
  getMembers(userParams: UserParams) {
    let params = this.getPagiginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);

    return this.getPaginatedResult<Member[]>(this.baseUrl + this.usersRoute, params);
    /**
       * 
       if (this.members.length > 0) {
         return of(this.members);
       }
       return this.http.get<Member[]>(this.baseUrl + this.usersRoute).pipe(
         // map always returns the values as observables
         map((members) => {
           this.members = members;
           return members;
         })
       );
       */
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http
      .get<T>(url, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;

          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  private getPagiginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  /**
   *
   * @param username
   * @returns an Observable from the method http.get()
   */
  getMember(username: string) {
    const member = this.members.find((x) => x.userName === username);
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  /**
   *
   * @param member
   * @returns {Observable} an Observable from the method http.put()
   */
  updateMember(member: Member): Observable<any> {
    return this.http.put(this.baseUrl + this.usersRoute, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
