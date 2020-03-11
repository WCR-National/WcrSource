import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
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
    SidebarComponent.prototype.logout = function () {
        var _this = this;
        this.userService
            .associateLogout()
            .subscribe(function (data) {
            if (data == "0") {
                _this.userService.purgeAuth();
                _this.router.navigateByUrl('/associates');
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
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, UserService])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map