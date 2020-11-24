import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'AngularAssociate/app/services/search';
import { DashboardService } from 'AngularAssociate/app/services/associate/dashboard.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(route, router, _messageService, dashboardService, userService) {
        this.route = route;
        this.router = router;
        this._messageService = _messageService;
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.isNavbarCollapsed = true;
        this.isLoggedIn = false;
        this.isMobileScreen = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkWidthOrHeightForMobile();
        this.initializeHeader();
        this.userService.currentUser.subscribe(function (userData) {
            debugger;
            _this.currentUser = userData;
            if (_this.currentUser !== undefined && _this.currentUser != null && Object.keys(_this.currentUser).length !== 0 && _this.currentUser.constructor !== Object) {
                _this.isLoggedIn = true;
            }
        });
        this._messageService.listen().subscribe(function (data) {
            if (data != 'updateUserName') {
                _this.initializeHeader();
            }
        });
    };
    HeaderComponent.prototype.onClickGetAds = function () {
        this._messageService.filter('showAds');
    };
    HeaderComponent.prototype.initializeHeader = function () {
        var _this = this;
        var thisStatus = this;
        this.dashboardService
            .initializeConsumerHeader()
            .subscribe(function (data) {
            debugger;
            if (data.d.length > 0) {
                _this.userName = data.d.split('@')[0];
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
    };
    HeaderComponent.prototype.checkWidthOrHeightForMobile = function () {
        debugger;
        var ratio = window.devicePixelRatio || 1;
        var w = window.innerWidth;
        var h = window.innerHeight;
        if (w <= 768) {
            this.isMobileScreen = true;
        }
        else {
            this.isMobileScreen = false;
        }
    };
    //mmenuInit() {
    //}
    HeaderComponent.prototype.onClickLogout = function () {
        var _this = this;
        this.userService
            .attemptLogout()
            .subscribe(function (data) {
            if (data == "0") {
                _this.userService.purgeAuth();
                _this.router.navigateByUrl('/');
            }
            else {
                alert("OOPS Something goes wrong !");
            }
        }, function (err) {
            alert("OOPS Something goes wrong !");
        });
    };
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-layout-header',
            templateUrl: './header.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, MessageService, DashboardService,
            UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map