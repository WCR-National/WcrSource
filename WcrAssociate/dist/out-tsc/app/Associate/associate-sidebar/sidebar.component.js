import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'AngularAssociate/app/services/search';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
import * as $ from 'jquery';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(route, _messageService, router, userService, profileService, ngZone) {
        this.route = route;
        this._messageService = _messageService;
        this.router = router;
        this.userService = userService;
        this.profileService = profileService;
        this.ngZone = ngZone;
        this.isProfile = false;
        this.isDashboard = false;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        if (location.origin.includes("profile")) {
            this.isProfile = true;
            this.isDashboard = false;
        }
        else {
            this.isProfile = false;
            this.isDashboard = true;
        }
        this.validateMenuitems();
        this._messageService.listen().subscribe(function (m) {
            if (m == 'disable') {
                for (var j = 2; j < 7; j++) {
                    $(".nav-sidebar li").eq(j).addClass("diable-sidelink");
                    $(".nav-sidebar li a").eq(j).addClass("diable-sidelink");
                }
            }
            else if (m == 'enable') {
                for (var j = 2; j < 7; j++) {
                    $(".nav-sidebar li").eq(j).removeClass("diable-sidelink");
                    $(".nav-sidebar li a").eq(j).removeClass("diable-sidelink");
                }
            }
        });
    };
    SidebarComponent.prototype.validateMenuitems = function () {
        var thisStatus = this;
        this.profileService
            .getUserDetails()
            .subscribe(function (data) {
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
                        //thisStatus._messageService.filter('show-info-dashboard');
                        return;
                    }
                    else {
                        //thisStatus._messageService.filter('hide-info-dashboard');
                        return;
                    }
                });
            }
        });
    };
    SidebarComponent.prototype.logout = function () {
        var _this = this;
        this.userService
            .associateLogout()
            .subscribe(function (data) {
            if (data == "0") {
                _this.userService.purgeAuth();
                _this.ngZone.run(function () { return _this.router.navigate(['/']); });
                //this.router.navigateByUrl('/associates' , );       
            }
        }, function (err) {
            alert('Something wrong');
        });
    };
    SidebarComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-layout-sidebar',
            templateUrl: './sidebar.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MessageService, Router, UserService, ProfileService, NgZone])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map