import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../app/services/authentication/authentication.service';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], JwtInterceptor);
    return JwtInterceptor;
}());
export { JwtInterceptor };
//# sourceMappingURL=jwt.interceptor.js.map