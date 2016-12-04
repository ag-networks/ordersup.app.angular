//sandbox/sandbox.module.ts
import { NgModule }       from '@angular/core';
//import { sandboxRouting } from './sandbox.routing'
//import { GuildListComponent } from "./guild-list/guild-list.component";
//import { SandboxService } from './sandbox.service';

import { Component, ViewChild, Injector } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { AnalyticsService } from '../common/services/analytics-service';
import { Signin } from './signin.component';
//import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
//import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalModule, Modal } from 'ng2-modal';
//import { POPOVER_DIRECTIVES, Popover } from "ng2-popover";
import { Popover } from "ng2-popover";


@NgModule({
  imports: [
    //sandboxRouting
  ],

  declarations: [
    //GuildListComponent
  ],

  providers: [
    //SandboxService
  ]
})

export class SandboxModule {}
