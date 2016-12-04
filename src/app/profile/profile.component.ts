import { Component,Injector } from '@angular/core';
import { AppConfigService } from '../common/services/app-config.service';

//import { AppState } from '../app.service';
//import { Title } from '../title';
//import { XLarge } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'profile',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    //Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  //styleUrls: [ './home.style.css' ],
  styleUrls: [ './profile.scss' ],
  //styles: [ require('./home.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './profile.html'
})
export class Profile {

  private appConfig: any;

  private aboutVisible = false;
  private protsVisible = true;
  private updatesVisible = false;

  private localState = { value: '' };
  private protitions = [
    {
      name : "CA Incline Project",
      duration : "14 Days Remaining",
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      name : "CA Incline Project",
      duration : "14 Days Remaining",
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      name : "CA Incline Project",
      duration : "14 Days Remaining",
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  ]

  constructor(
    private injector: Injector
  ) {
    this.appConfig = injector.get(AppConfigService);
  }

  showTab(tab:string) {
    if(tab == "prots") {
      this.protsVisible = true;
      this.updatesVisible = false;
    } else {
      this.protsVisible = false;
      this.updatesVisible = true;
    }
  }

  ngOnInit() {
    // this.title.getData().subscribe(data => this.data = data);
  }

  //submitState(value: string) {
  //  console.log('submitState', value);
  //  this.appState.set('value', value);
  //  this.localState.value = '';
  //}
}
