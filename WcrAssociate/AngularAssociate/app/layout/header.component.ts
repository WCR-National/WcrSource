import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from '../services/auth';
import { User } from '../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';
import { DashboardService } from '../associate/associate-service/dashboard.service';
import * as $ from 'jquery';
import { SalesAdvertisementsService } from 'AngularAssociate/app/services/sales-advertisements/sales-advertisements.service';


@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    isNavbarCollapsed = true;
    public userName: string;
    public isLoggedIn = false;
    currentUser: User;
    public isMobileScreen = false;

    constructor(private route: ActivatedRoute, private router: Router, private _messageService: MessageService,
        private userService: UserService, private dashboardService: DashboardService
    ) { }


    ngOnInit() {
        this.isLoggedIn = false;
        //this.checkUserAuthenticated();

        this._messageService.listen().subscribe((data: any) => {
            debugger;
            if (data == 'updateUserName') {
                this.initializeHeader();
            }
            if (data == "updateHeader") {
                this.isLoggedIn = true;
                this.initializeHeader();
            }
        });

        this.userService.currentUser.subscribe(
            (userData) => {
                if (userData !== undefined && userData != null && Object.keys(userData).length !== 0 && userData.constructor !== Object) {
                    this.isLoggedIn = true;
                    this.initializeHeader();
                }
            }
        );

        this.checkWidthOrHeightForMobile();


    }

    checkUserAuthenticated() {




        //this.salesAdvertisements
        //    .ConsumerIsLogin()
        //    .subscribe(
        //        (data) => {
        //            debugger;
        //            if (data.d == 0)
        //            {
        //                this.userService.purgeAuth();
        //                this.isLoggedIn = false;
        //                debugger;
        //                //this.router.navigateByUrl('/');
        //            }
        //            else {
        //                this.userService.currentUser.subscribe(
        //                    (userData) => {
        //                        debugger;
        //                        this.currentUser = userData;
        //                        if (this.currentUser !== undefined && this.currentUser != null && Object.keys(this.currentUser).length !== 0 && this.currentUser.constructor !== Object) {
        //                            this.isLoggedIn = true;
        //                            this.initializeHeader();
        //                        }
        //                    });
        //            }
        //        }

        //    );
    }

    initializeHeader() {
        let thisStatus: any = this;
        this.dashboardService
            .initializeConsumerHeader()
            .subscribe(
                data => {
                    debugger;
                    if (data.d.Name !== undefined && data.d != "") {
                        if (data.d.Name !== undefined && data.d.Name != null && data.d.Name != "") {
                            this.userName = data.d.Name;
                        }
                    }
                    else if (data.d != "") {
                        this.userName = data.d;
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                });
    }

    onClickLogout() {
        this.userService
            .attemptLogout()
            .subscribe(
                data => {
                    if (data == "0") {
                        debugger;
                        this.userService.purgeAuth();
                        this.isLoggedIn = false;
                        this.router.navigateByUrl('/');
                    }
                    else {
                        alert("OOPS Something goes wrong !");
                    }
                },
                err => {
                    alert("OOPS Something goes wrong !");
                }
            );
    }

    onClickGetAds() {
        this._messageService.filter('showAds');
    }

   

    checkWidthOrHeightForMobile() {

        var ratio = window.devicePixelRatio || 1;
        var w = window.innerWidth;
        var h = window.innerHeight;

        if (w <= 768) {
            this.isMobileScreen = true;
        }
        else {
            this.isMobileScreen = false;
        }


    }

    

    onClickNavbar() {
        this._messageService.messageHidden.value = "";
    }
}
