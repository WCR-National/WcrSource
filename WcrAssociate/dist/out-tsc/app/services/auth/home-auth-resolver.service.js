import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';
var HomeAuthResolver = /** @class */ (function () {
    function HomeAuthResolver(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    HomeAuthResolver.prototype.resolve = function (route, state) {
        return this.userService.isAuthenticated.pipe(take(1));
    };
    HomeAuthResolver = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router,
            UserService])
    ], HomeAuthResolver);
    return HomeAuthResolver;
}());
export { HomeAuthResolver };
//# sourceMappingURL=home-auth-resolver.service.js.map