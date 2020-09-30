import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'AngularAssociate/app/services/search';
var SharedLayoutComponent = /** @class */ (function () {
    function SharedLayoutComponent(route, router, _messageService, userService) {
        this.route = route;
        this.router = router;
        this._messageService = _messageService;
        this.userService = userService;
    }
    SharedLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currentUser.subscribe(function (userData) {
            _this.currentUser = userData;
        });
    };
    SharedLayoutComponent.prototype.onClickGetAds = function () {
        this._messageService.filter('Register click');
    };
    SharedLayoutComponent.prototype.onClickLogout = function () {
        var _this = this;
        this.userService
            .attemptLogout()
            .subscribe(function (data) {
            if (data == "0") {
                _this.router.navigateByUrl('/home');
            }
            else {
                alert("OOPS Something goes wrong !");
            }
        }, function (err) {
            alert("OOPS Something goes wrong !");
        });
    };
    SharedLayoutComponent = tslib_1.__decorate([
        Component({
            selector: 'app-shared-layout',
            templateUrl: './shared-layout.component.html',
            styleUrls: ['./shared-layout.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, MessageService,
            UserService])
    ], SharedLayoutComponent);
    return SharedLayoutComponent;
}());
export { SharedLayoutComponent };
//# sourceMappingURL=shared-layout.component.js.map