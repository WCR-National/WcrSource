import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { JwtService } from '../services/auth';
var HttpTokenInterceptor = /** @class */ (function () {
    function HttpTokenInterceptor(jwtService) {
        this.jwtService = jwtService;
    }
    HttpTokenInterceptor.prototype.intercept = function (req, next) {
        var headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        var token = this.jwtService.getToken();
        if (token) {
            headersConfig['Authorization'] = "Token " + token;
        }
        var request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    };
    HttpTokenInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [JwtService])
    ], HttpTokenInterceptor);
    return HttpTokenInterceptor;
}());
export { HttpTokenInterceptor };
//# sourceMappingURL=http.token.interceptor.js.map