import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostBinding, ViewEncapsulation } from '@angular/core';

import { Subscription, Observable, from, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserService } from './services/auth';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from './services/search';
import { User } from './entities/user';
import { DashboardService } from './associate/associate-service/dashboard.service';
declare const myTest: any;
declare const mmenuInit: any;


@Component({
    selector: 'wcr-Associate-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

    //@HostBinding('className') componentClass: string;

    constructor(private route: ActivatedRoute, private router: Router, private _messageService: MessageService,
        private userService: UserService
    ) { }
   
    currentUser: User;
    routerSubscription: any;
    location: any;
    isOn: any = true;

    ngOnInit() {

        debugger;
        this.userService.populate();

        this.userService.currentUser.subscribe(
            (userData) => {
                if (userData.type == "1") {
                    this.isOn = false;
                }
                else
                {
                    this.isOn = true;
                }
            }
        );

        /*--------------------------------------------------*/
        /*  Mobile Menu - mmenu.js
        /*--------------------------------------------------*/
        var thisStatus = this;
        setTimeout(function () {
            mmenuInit();
            $(window).resize(function () { mmenuInit(); });
        }, 3000);
    }



    onClickGetAds() {
        this._messageService.filter('Register click');
    }


    onClick() {
        //myTest();
    }
}
