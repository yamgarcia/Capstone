import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from './../_modules/member';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from './../_modules/UserParams';
import { AccountService } from './account.service';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';

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
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  //* "of" operator is used to return something "of" an Observable. It turns the value into an Observable. (Used in mock HTTP Responses)

  /**
   *
   * @param userParams
   * @returns an Observable of the already stored members or the Observable that results from the 'get'
   */
  getMembers(userParams: UserParams) {
    // console.log(Object.values(userParams).join('-'));

    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) return of(response);

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    //set method needs a key and value
    return this.getPaginatedResult<Member[]>(
      this.baseUrl + this.usersRoute,
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );

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

  /**
   *
   * @param url
   * @param params
   * @returns PaginatedResult<T>
   */
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

  /**
   *
   * @param pageNumber
   * @param pageSize
   * @returns HttpParams
   */
  private getPaginationHeaders(pageNumber: number, pageSize: number) {
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
    // console.log(this.memberCache);
    // const member = [...this.memberCache.values()];
    // console.log(member);
    const member = [...this.memberCache.values()]
      .reduce((arr, e) => arr.concat(e.result), [])
      .find((member: Member) => member.userName === username);
    // console.log(member);

    if (member) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  /**
   *
   * @param member
   * @returns {Observable} an Observable from the method http.put()
   */
  updateMember(member: Member) {
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

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = this.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return this.getPaginatedResult<Partial<Member[]>>(
      this.baseUrl + 'likes',
      params
    );
  }
}
