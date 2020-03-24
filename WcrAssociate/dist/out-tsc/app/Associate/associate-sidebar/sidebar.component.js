import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(route, router, userService, profileService, ngZone) {
        this.route = route;
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
                        }
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
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, UserService, ProfileService, NgZone])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map