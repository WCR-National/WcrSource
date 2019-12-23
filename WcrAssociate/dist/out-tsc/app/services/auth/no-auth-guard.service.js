import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map, take } from 'rxjs/operators';
var NoAuthGuard = /** @class */ (function () {
    function NoAuthGuard(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    NoAuthGuard.prototype.canActivate = function (route, state) {
        return this.userService.isAuthenticated.pipe(take(1), map(function (isAuth) { return !isAuth; }));
    };
    NoAuthGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router,
            UserService])
    ], NoAuthGuard);
    return NoAuthGuard;
}());
export { NoAuthGuard };
//# sourceMappingURL=no-auth-guard.service.js.map