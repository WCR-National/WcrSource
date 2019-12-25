import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var JwtService = /** @class */ (function () {
    function JwtService() {
    }
    JwtService.prototype.getToken = function () {
        return window.localStorage['jwtToken'];
    };
    JwtService.prototype.saveToken = function (token) {
        window.localStorage['jwtToken'] = token;
    };
    JwtService.prototype.destroyToken = function () {
        window.localStorage.removeItem('jwtToken');
    };
    JwtService = tslib_1.__decorate([
        Injectable()
    ], JwtService);
    return JwtService;
}());
export { JwtService };
//# sourceMappingURL=jwt.service.js.map