import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostBinding } from '@angular/core';

import { Subscription, Observable, from, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserService } from './services/auth';
import * as $ from 'jquery';
declare const myTest: any;
declare const mmenuInit: any;


@Component({
    selector: 'wcr-Associate-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    //@HostBinding('className') componentClass: string;
    constructor(
        private userService: UserService
    ) {
        //this.componentClass = 'mm-page mm-slideout';
    }

    ngOnInit() {

        this.userService.populate();

        /*--------------------------------------------------*/
        /*  Mobile Menu - mmenu.js
        /*--------------------------------------------------*/
        var thisStatus = this;
        setTimeout(function () {
            mmenuInit();
            $(window).resize(function () { mmenuInit(); });
        }, 3000);


        /*  User Menu */
        //$('.user-menu').on('click', function () {
        //    $(this).toggleClass('active');
        //});
        //$(window).resize(function () { mmenuInit(); });
    }
    onClick() {
        //myTest();
    }
}
