import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../services/auth';
import { map, take } from 'rxjs/operators';
var NoAuthGuard = /** @class */ (function () {
    function NoAuthGuard(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    NoAuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('jwtToken') != null) {
            var subject = new Subject();
            subject.next(false);
            this.router.navigate(['associates']);
            return subject.asObservable();
        }
        return this.userService.isAuthenticated.pipe(take(1), map(function (isAuth) { return !isAuth; }));
    };
    var _a;
    NoAuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" ? _a : Object, UserService])
    ], NoAuthGuard);
    return NoAuthGuard;
}());
export { NoAuthGuard };
//# sourceMappingURL=no-auth-guard.service.js.map