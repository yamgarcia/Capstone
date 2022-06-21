import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from './../_modules/member';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserParams } from './../_modules/UserParams';
import { AccountService } from './account.service';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

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
    this.fetchAndSetNewUserParam();
  }

  /**
   * Can introduce bugs returning previous user's userParam
   * @returns userParams
   */
  getUserParams() {
    this.fetchAndSetNewUserParam();
    return this.userParams;
  }

  /**
   * Get current/new user, create a new userParams, and set variables accordingly
   */
  fetchAndSetNewUserParam(){
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  /**
   *
   * @param userParams
   * @returns an Observable of the already stored members or the Observable that results from the 'get'
   */
  getMembers(userParams: UserParams) {
    // console.log(Object.values(userParams).join('-'));

    var response = this.memberCache.get(Object.values(userParams).join('-'));
    // "of" operator is used to return something "of" an Observable. It turns the value into an Observable. (Used in mock HTTP Responses)
    if (response) return of(response);

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    //set method needs a key and value
    return getPaginatedResult<Member[]>(
      this.baseUrl + this.usersRoute,
      params, this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
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

  /**
   *
   * @param predicate taken from page headers should be either "liked" or "likedBy"
   * @param pageNumber default 1
   * @param pageSize default 4
   * @returns
   */
  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(
      this.baseUrl + 'likes',
      params,
      this.http
    );
  }
}
