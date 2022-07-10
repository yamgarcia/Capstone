import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmService } from '../_services/confirm.service';
import { MemberEditComponent } from './../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsaveChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService) {}

  //* Gives access to the component
  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }
}
