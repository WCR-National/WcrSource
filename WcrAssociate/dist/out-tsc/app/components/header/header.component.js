import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication';
import { UserService } from '../../services/authentication/user.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authenticationService, userService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.users = [];
        this.IsLoggedIn = false;
        this.isOnLogin = true;
        this.isOnRegister = true;
        this.isOnLandingPage = false;
        this.displayBlock = 'block';
        this.displayNone = 'none';
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        //if (this.currentUser != undefined) {
        //    this.IsLoggedIn = true;
        //}
        //else {
        //    this.IsLoggedIn = false;
        //}
    }
    HeaderComponent.prototype.ngOnInit = function () { };
    HeaderComponent.prototype.OnLoginEvent = function () {
        alert('found');
        if (this.isOnLogin) {
            this.displayBlock = 'block';
            this.isOnLogin = false;
            this.isOnRegister = true;
            this.isOnLandingPage = true;
        }
        else {
            this.displayNone = 'none';
            this.isOnLogin = true;
            this.isOnRegister = true;
            this.isOnLandingPage = false;
        }
    };
    HeaderComponent.prototype.OnRegisterEvent = function () {
        alert('found');
        if (this.isOnRegister) {
            this.displayBlock = 'block';
            this.isOnRegister = false;
            this.isOnLogin = true;
            this.isOnLandingPage = true;
        }
        else {
            this.displayNone = 'none';
            this.isOnRegister = true;
            this.isOnLogin = true;
            this.isOnLandingPage = false;
        }
    };
    HeaderComponent.prototype.increment = function () {
        alert('found');
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], HeaderComponent.prototype, "isOnLogin", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], HeaderComponent.prototype, "isOnRegister", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HeaderComponent.prototype, "isOnLandingPage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HeaderComponent.prototype, "displayBlock", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HeaderComponent.prototype, "displayNone", void 0);
    HeaderComponent = tslib_1.__decorate([
        Component({ selector: 'app-header', templateUrl: 'header.component.html' }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map