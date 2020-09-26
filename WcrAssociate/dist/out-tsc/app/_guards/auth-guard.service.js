import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../services/auth';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('jwtToken') == null) {
            var subject = new Subject();
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            subject.next(false);
            return subject.asObservable();
        }
        return this.userService.isAuthenticated.pipe(take(1));
    };
    var _a;
    AuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" ? _a : Object, UserService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth-guard.service.js.map