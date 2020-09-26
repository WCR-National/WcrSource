import { __decorate, __metadata } from "tslib";
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
    var _a, _b;
    HeaderComponent = __decorate([
        Component({
            selector: 'app-layout-header',
            templateUrl: './header.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _a : Object, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object, MessageService,
            UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map