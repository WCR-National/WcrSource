import * as tslib_1 from "tslib";
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
    AuthGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router,
            UserService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth-guard.service.js.map