import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'AngularAssociate/app/services/search';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(route, router, _messageService, userService) {
        this.route = route;
        this.router = router;
        this._messageService = _messageService;
        this.userService = userService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currentUser.subscribe(function (userData) {
            _this.currentUser = userData;
        });
    };
    HeaderComponent.prototype.onClickGetAds = function () {
        this._messageService.filter('showAds');
    };
    HeaderComponent.prototype.onClickLogout = function () {
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
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-layout-header',
            templateUrl: './header.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, MessageService,
            UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map