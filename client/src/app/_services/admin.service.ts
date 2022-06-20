import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Allows admins to get users with roles
   * @returns get request
   */
  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(
      this.baseUrl + 'admin/users-with-roles'
    );
  }

  /**
   * Allows admins to update roles
   *
   * @param username the username to be updated
   * @param roles the query string containing the updated roles
   * @returns post request
   */
  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(
      this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles,
      {}
    );
  }
}
