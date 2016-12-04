import { Injectable, Injector } from '@angular/core';
import { JwtHttp } from 'ng2-ui-auth';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class MenuService {

  private appConfig: any;

  constructor(
    private jwtHttp: JwtHttp,
    private injector: Injector) {
    this.appConfig = injector.get(AppConfigService);
  }

  addMenu(location_id:number,menu: any) {
    console.log("MenuService : addMenu()",menu);

    var data = {
      menu : {
        name : "foo",
        concept_location_id : location_id,
        menu_categories_attributes: []
    }};

    //menu.categories['category_path'] = menu.menu_categories_attributes.name;

    for(var i=0;i<menu.menu_items.length;i++) {
      var item = menu.menu_items[i];
      //menu.categories[i]['category_path'] = menu.categories[i].name;
      //var cat = menu.categories[i];
      //console.log("cat",cat);
      console.log("item",item);
      console.log("there are " + menu.categories.length + " cats");
      for(var j=0;j<menu.categories.length;j++) {
        var cat = menu.categories[j];
        console.log("cat id : " + menu.categories[j].id + " - item parent id : " + menu.menu_items[i].id);
        menu.categories[j]['category_path'] = menu.categories[j].category_path;
        if(menu.categories[j].id == menu.menu_items[i].parent_id) {
          console.log("parent cat",cat);
          if(menu.categories[j]['menu_items_attributes'] == undefined) {
            menu.categories[j]['menu_items_attributes'] = [];
          }
          menu.categories[j]['menu_items_attributes'].push(
            {
              //category_path : menu.categories[j].name,
              category_path : menu.categories[j].category_path,
              name : menu.menu_items[i].name,
              price : menu.menu_items[i].price,
              plu : menu.menu_items[i].name,
              size : menu.menu_items[i].name,
              barcode : menu.menu_items[i].name,
              hidden : false
            }
          );
          console.log("parent cat after push",menu.categories[j]);
        }
        //menu.categories[i].menu_items[j]['category_path'] = menu.categories[i]['category_path'];
      }
    }


    //for(var i=0;i<menu.categories.length;i++) {
    //  menu.categories[i]['category_path'] = menu.categories[i].name;
    //  //var cat = menu.categories[i];
    //  //console.log("cat",cat);
    //  //for(var j=0;j<menu.categories[i].menu_items.length;j++) {
    //  //  menu.categories[i].menu_items[j]['category_path'] = menu.categories[i]['category_path'];
    //  //}
    //}

    data.menu.menu_categories_attributes = menu.categories;

    //menu.menu_categories_attributes['category_path'] = menu.menu_categories_attributes.name;
    //for(var i=0;i<menu.menu_categories_attributes.length;i++) {
    //  menu.menu_categories_attributes[i]['category_path'] = menu.menu_categories_attributes[i].name;
    //  for(var j=0;j<menu.menu_categories_attributes[i].menu_items_attributes.length;j++) {
    //    menu.menu_categories_attributes[i].menu_items_attributes[j]['category_path'] = menu.menu_categories_attributes[i]['category_path'];
    //  }
    //}

    console.log("MenuService : addMenu() after cat path",data);

    //var data = {
    //  "menu" : menu
    //};

    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/menus', JSON.stringify(data));
  }

  getAll() {
    console.log("MenuService : getAll()");
    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/menus');
  }

  get(id: string) {
    console.log("MenuService : get()",id);

    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/menus/'+id);
  }

  deleteMenu(id: string) {
    console.log("MenuService : deleteMenu()",id);

    return this.jwtHttp.delete(this.appConfig.api_base_url + '/v1/menus/'+id);
  }


}
