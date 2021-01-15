import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
import * as $ from 'jquery';


@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    isNavbarCollapsed = true;

    constructor(private route: ActivatedRoute, private router: Router, private _messageService: MessageService, private dashboardService: DashboardService,
        private userService: UserService
    ) { }
    public userName: string;
    currentUser: User;
    public isLoggedIn = false;
    public isMobileScreen = false;

    ngOnInit() {
        //this._messageService.listen().subscribe((data: any) => {
        //    debugger;
        //    if (data != 'updateUserName') {
        //        this.initializeHeader();
        //    }
        //    //if (data == "updateHeader")
        //    //{
        //    //    if (this.isLoggedIn) {
        //    //        this.isLoggedIn = false;
        //    //    }
        //    //    else {
        //    //        this.isLoggedIn = true;
        //    //    }
        //    //}
        //});


        this.checkWidthOrHeightForMobile();
        this.userService.currentUser.subscribe(
            (userData) => {
                debugger;
                this.currentUser = userData;
                if (this.currentUser !== undefined && this.currentUser != null && Object.keys(this.currentUser).length !== 0 && this.currentUser.constructor !== Object) {
                    this.isLoggedIn = true;
                    this.initializeHeader();
                }
            });


    }

    onClickGetAds() {
        this._messageService.filter('showAds');
    }

    initializeHeader() {
        let thisStatus: any = this;
        this.dashboardService
            .initializeConsumerHeader()
            .subscribe(
                data => {
                    debugger;
                    if (data.d.length > 0) {
                        if (data.d.Name !== undefined && data.d.Name != null && data.d.Name != "")
                        {
                            this.userName = data.d.Name;
                        }
                        //this.userName = data.d.split('@')[0];

                        //var xmlDoc = $.parseXML(data.d);
                        //var xml = $(xmlDoc);
                        //var docs = xml.find("ViewAssociateBasicDetail");
                        //var cartd = [];
                        //var sd = [];
                        //$.each(docs, function (i, docs) {

                        //    thisStatus.wcrID = $(docs).find("AssociateId").text();
                        //    thisStatus.LicenseID = $(docs).find("LicenseId").text();
                        //    thisStatus.Contact = $(docs).find("MobileNo").text();
                        //    thisStatus.Email = $(docs).find("Email").text();
                        //    thisStatus.userName = $(docs).find("FullName").text() + ' ' + $(docs).find("LastName").text();


                        //    if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                        //        //cartd.push("<img class='img-circle user-img' alt='User Image' src='../AssociatePhoto/" + $(docs).find("Photo").text() + "'/>");
                        //        thisStatus.profileImage = '../AssociatePhoto/' + $(docs).find("Photo").text();
                        //    }
                        //    else {
                        //        thisStatus.profileImage = '../AssociatePhoto/0.png';
                        //    }
                        //});

                        //$("#profilePicHeader").attr('src', thisStatus.profileImage);
                        //$("#profilePic").attr('src', thisStatus.profileImage);
                    }
                });
        //../../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails
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
    
    onClickLogout() {
        this.userService
            .attemptLogout()
            .subscribe(
                data => {
                    if (data == "0") {
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

    onClickNavbar() {
        this._messageService.messageHidden.value = "";
    }
}
