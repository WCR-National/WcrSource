import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.formatErrors = function (error) {
        return throwError(error.error);
    };
    ApiService.prototype.get = function (path, params) {
        if (params === void 0) { params = new HttpParams(); }
        return this.http.get("" + environment.apiEndPoint + path, { params: params })
            .pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.put = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.put("" + environment.apiEndPoint + path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.post = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.post("" + environment.apiEndPoint + path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.delete = function (path) {
        return this.http.delete("" + environment.apiEndPoint + path).pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.abc = function () { };
    ApiService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map