import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(environment.apiEndPoint + "/users");
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(environment.apiEndPoint + "/users/" + id);
    };
    UserService.prototype.register = function (user) {
        return this.http.post(environment.apiEndPoint + "/users/register", user);
    };
    //update(user: User) {
    //    return this.http.put(`${environment.apiEndPoint}/users/${user.id}`, user);
    //}
    UserService.prototype.delete = function (id) {
        return this.http.delete(environment.apiEndPoint + "/users/" + id);
    };
    var _a;
    UserService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [typeof (_a = typeof HttpClient !== "undefined" && HttpClient) === "function" ? _a : Object])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map