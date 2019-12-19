import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { UserService } from '../services/users/user.service';
import { DOM } from '../lib/dom-init';
var ErrorPermissionComponent = /** @class */ (function () {
    function ErrorPermissionComponent(location, authsvc, router, usersvc, dom) {
        this.location = location;
        this.authsvc = authsvc;
        this.router = router;
        this.usersvc = usersvc;
        this.dom = dom;
    }
    ErrorPermissionComponent.prototype.doLogout = function () {
        this.authsvc.logout();
        this.router.navigate(['login']);
        this.dom.applyClass('body', 'dark-body');
    };
    ErrorPermissionComponent.prototype.goBack = function () {
        // We need to reload the permissions
        window.location.href = this.usersvc.goBack('/dashboard');
    };
    var _a, _b, _c;
    ErrorPermissionComponent = tslib_1.__decorate([
        Component({
            selector: 'error-permission-area',
            templateUrl: './error_permission.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Location, typeof (_a = typeof AuthService !== "undefined" && AuthService) === "function" ? _a : Object, Router, typeof (_b = typeof UserService !== "undefined" && UserService) === "function" ? _b : Object, typeof (_c = typeof DOM !== "undefined" && DOM) === "function" ? _c : Object])
    ], ErrorPermissionComponent);
    return ErrorPermissionComponent;
}());
export { ErrorPermissionComponent };
//# sourceMappingURL=error_permission.component.js.map