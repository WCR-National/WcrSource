import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription, Observable, from, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserService } from './services/auth';


@Component({
  selector: 'wcr-Associate-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.populate();
    }


}
