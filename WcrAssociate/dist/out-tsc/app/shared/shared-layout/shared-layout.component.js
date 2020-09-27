import { __decorate, __metadata } from "tslib";
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
    var _a, _b;
    SharedLayoutComponent = __decorate([
        Component({
            selector: 'app-shared-layout',
            templateUrl: './shared-layout.component.html',
            styleUrls: ['./shared-layout.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _a : Object, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object, MessageService,
            UserService])
    ], SharedLayoutComponent);
    return SharedLayoutComponent;
}());
export { SharedLayoutComponent };
//# sourceMappingURL=shared-layout.component.js.map