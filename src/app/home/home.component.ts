import { Component, Injector } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

import { AppConfigService } from '../common/services/app-config.service';
import { AuthenticationService } from '../common/services/authentication.service';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  //styleUrls: [ './home.style.css' ],
  styleUrls: [ './home.scss' ],
  //styles: [ require('./home.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class Home {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers

  private appConfigSvc: any;
  private authSvc: any;
  private isLoggedIn: boolean = false;
  private user:any;
  private sub1:any;


  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels:Array<any> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColours:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';


  constructor(
    public appState: AppState,
    public title: Title,
    private injector: Injector) {
    this.appConfigSvc = injector.get(AppConfigService);
    this.authSvc = injector.get(AuthenticationService);

    this.isLoggedIn = this.authSvc.isAuthenticated();
    this.user = this.appConfigSvc.getUser();

    this.sub1 = this.appConfigSvc.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err      => { console.error("authStateChange",err)});

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  ngOnDestory() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Home : onAuthStateChange() : loggedIn",loggedIn);
    this.isLoggedIn = loggedIn;
    if(!loggedIn) {
    }
  }
}
