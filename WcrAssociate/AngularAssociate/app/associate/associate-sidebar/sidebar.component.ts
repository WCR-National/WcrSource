import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';

import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
import * as $ from 'jquery';


@Component({
    selector: 'associate-layout-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    isProfile: boolean = false;
    isDashboard: boolean = false;

    constructor(private route: ActivatedRoute, private _messageService: MessageService, private router: Router, private userService: UserService, private profileService: ProfileService, private ngZone: NgZone) { }

    ngOnInit() {
        if (location.origin.includes("profile")) {
            this.isProfile = true;
            this.isDashboard = false;
        }
        else {
            this.isProfile = false;
            this.isDashboard = true;
        }
        this.validateMenuitems();

        this._messageService.listen().subscribe((m: any) => {
            if (m == 'disable') {
                for (var j = 2; j < 7; j++) {
                    $(".nav-sidebar li").eq(j).addClass("diable-sidelink");
                    $(".nav-sidebar li a").eq(j).addClass("diable-sidelink");
                }
            }
            else if (m == 'enable')
            {
                for (var j = 2; j < 7; j++) {
                    $(".nav-sidebar li").eq(j).removeClass("diable-sidelink");
                    $(".nav-sidebar li a").eq(j).removeClass("diable-sidelink");
                }
            }
        })
    }

    validateMenuitems() {
        let thisStatus: any = this;
        this.profileService
            .getUserDetails()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {

                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {

                                for (var j = 2; j < 7; j++) {
                                    $(".nav-sidebar li").eq(j).addClass("diable-sidelink");
                                    $(".nav-sidebar li a").eq(j).addClass("diable-sidelink");
                                }

                                thisStatus._messageService.filter('show-info-dashboard');

                                return;
                            }
                            else {
                                thisStatus._messageService.filter('hide-info-dashboard');
                                return;

                            }
                            
                        });
                    }
                });
    }

    logout() {
        this.userService
            .associateLogout()
            .subscribe(
                data => {
                    if (data == "0") {
                        this.userService.purgeAuth();
                        this.ngZone.run(() => this.router.navigate(['/']));
                        //this.router.navigateByUrl('/associates' , );       

                    }
                },
                err => {
                    alert('Something wrong');
                }
        );
    }
}    