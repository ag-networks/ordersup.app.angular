import { Injectable,Injector } from '@angular/core';
import { JwtHttp } from 'ng2-ui-auth';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ConceptService {

  private appConfig: any;

  constructor(
    private jwtHttp: JwtHttp,
    private injector: Injector) {
    this.appConfig = injector.get(AppConfigService);
  }

  addConcept(concept: any) {
    console.log("ConceptService : addConcept()",concept);

    var data = {
      "concept" : concept
    };

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/concepts', JSON.stringify(data));
  }

  addLocation(data: any) {
    console.log("ConceptService : addLocation()",data);

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/concept_locations', JSON.stringify(data));
  }


  addLocationUser(data: any) {
    console.log("ConceptService : addLocationUser()",data);

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/concept_location_users', JSON.stringify(data));
  }

  activateOwnerLocationMenu(owner_id:number,location_id:number,menu_id:number) {
    var data = {
      "concept_owner" : {
        "location_id" : location_id,
        "menu_id"     : menu_id
      }
    };
    console.log("ConceptService : activateOwnerLocationMenu() : owner["+owner_id+"] location["+location_id+"]");

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/concept_owners/'+owner_id+'/locations/'+location_id+"/menu/activate", JSON.stringify(data));
  }

  addOwner(data: any) {
    console.log("ConceptService : addOwner()",data);

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/concept_owners', JSON.stringify(data));
  }

  getAll() {
    console.log("ConceptService : getAll()");
    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/concepts');
  }

  get(id: string) {
    console.log("ConceptService : get()",id);

    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/concepts/'+id);
  }

  getOwner(id: string) {
    console.log("ConceptService : getOwner()",id);

    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/concept_owners/'+id);
  }

  getOwnerMenus(id: string) {
    console.log("ConceptService : getOwnerMenus()",id);

    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/concept_owners/'+id+'/menus');
  }

  getLocation(id: string) {
    console.log("ConceptService : getLocation()",id);

    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/concept_locations/'+id);
  }

  validateStoreCode(store_code: string) {

    var data = {
      "concept_location" : {
        "store_code" : store_code
      }
    };

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/concept_locations/validate/storecode', JSON.stringify(data));

  }

  deleteConcept(id: string) {
    console.log("ConceptService : deleteConcept()",id);

    return this.jwtHttp.delete(this.appConfig.api_base_url + '/v1/concepts/'+id);
  }

  deleteOwner(id: string) {
    console.log("ConceptService : deleteOwner()",id);

    return this.jwtHttp.delete(this.appConfig.api_base_url + '/v1/concept_owners/'+id);
  }


}
