import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import * as $ from 'jquery';
var AssociateHeaderComponent = /** @class */ (function () {
    function AssociateHeaderComponent(route, router, dashboardService, xmlToJson) {
        this.route = route;
        this.router = router;
        this.dashboardService = dashboardService;
        this.xmlToJson = xmlToJson;
    }
    AssociateHeaderComponent.prototype.ngOnInit = function () {
        this.initializeHeader();
    };
    AssociateHeaderComponent.prototype.initializeHeader = function () {
        var thisStatus = this;
        this.dashboardService
            .initializeHeader()
            .subscribe(function (data) {
            var countInterestedCutomers = '0';
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
                $("#profilePic").attr('src', thisStatus.profileImage);
            }
        });
        //../../ws/AssociateRegistration.asmx/ViewAssociateBasicDetails
    };
    AssociateHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-layout-header',
            templateUrl: './header.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, DashboardService, XMLToJSON])
    ], AssociateHeaderComponent);
    return AssociateHeaderComponent;
}());
export { AssociateHeaderComponent };
//# sourceMappingURL=header.component.js.map