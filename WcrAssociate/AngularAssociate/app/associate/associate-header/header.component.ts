import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import * as $ from 'jquery';

@Component({
    selector: 'associate-layout-header',
    templateUrl: './header.component.html'
})   
export class AssociateHeaderComponent implements OnInit {

    wcrID: string;
    LicenseID: string;
    Contact: string;
    Email: string;
    userName: string;

    constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService, private xmlToJson: XMLToJSON) {

    }
    ngOnInit() {
        this.initializeHeader();
    }

    initializeHeader() {
        let thisStatus: any = this;
        this.dashboardService
            .initializeHeader()
            .subscribe(
                data => {
                    let countInterestedCutomers: string = '0';
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        var cartd = [];
                        var sd = [];
                        $.each(docs, function (i, docs) {

                            thisStatus.wcrID = $(docs).find("AssociateId").text();
                            thisStatus.LicenseID = $(docs).find("LicenseId").text();
                            thisStatus.Contact = $(docs).find("MobileNo").text();
                            thisStatus.Email = $(docs).find("Email").text();
                            thisStatus.userName = $(docs).find("FullName").text() + ' ' + $(docs).find("LastName").text();
                            

                            if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                                //cartd.push("<img class='img-circle user-img' alt='User Image' src='../AssociatePhoto/" + $(docs).find("Photo").text() + "'/>");
                                thisStatus.profileImage = '../AssociatePhoto/' + $(docs).find("Photo").text();
                            }
                            else {
                                thisStatus.profileImage = '../AssociatePhoto/0.png';
                            }
                        });
                        debugger;
                        $("#profilePic").attr('src', thisStatus.profileImage );


                    }
                });
        //../../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails
    }
}