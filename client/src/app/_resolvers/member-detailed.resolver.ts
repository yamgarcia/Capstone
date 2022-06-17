import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MembersService } from '../_services/members.service';
import { Member } from './../_modules/member';

@Injectable({
  providedIn: 'root',
})
/**
 * @usageNotes change the Resolve type, delete the resolve method and import again
 *  Resolvers are instantiated the same way services areimport { MembersService } from './../_services/members.service';
 *
 */
export class MemberDetailedResolver implements Resolve<Member> {
  constructor(private membersService: MembersService) {}

  /**
   * takes the username using route.paramMap.get to return an observable
   *
   * @param route
   * @returns An Observable of type Member
   */
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.membersService.getMember(route.paramMap.get('username'));
  }
}
// resolve(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<boolean> {
//   return of(true);
// }
