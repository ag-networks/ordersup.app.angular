import { CanDeactivate } from '@angular/router';
import { OrganizationFormComponent } from '../../account/admin/organization-form.component';

export class ConfirmLeaveOrgFormGuard implements CanDeactivate<OrganizationFormComponent> {

  canDeactivate(target: OrganizationFormComponent) {
    //if(target.hasChanges()){
    //  return window.confirm('Do you really want to cancel?');
    //}
    //return true;

    return window.confirm('Do you really want to cancel?');


  }
}
