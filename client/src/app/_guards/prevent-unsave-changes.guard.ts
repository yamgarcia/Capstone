import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from './../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsaveChangesGuard implements CanDeactivate<unknown> {
  //* Gives access to the component
  canDeactivate(component: MemberEditComponent): boolean {
    if (component.editForm.dirty) {
      return confirm('Unsaved changes will be lost. Continue?');
    }
    return true;
  }
}
