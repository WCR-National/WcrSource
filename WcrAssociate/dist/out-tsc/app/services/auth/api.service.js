import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { PlatformLocation } from '@angular/common';
import { catchError } from 'rxjs/operators';
var ApiService = /** @class */ (function () {
    function ApiService(http, platformLocation) {
        this.http = http;
        this.platformLocation = platformLocation;
        this.apiEndPoint = '';
        console.log(platformLocation.location.href);
        if (environment.apiEndPoint == platformLocation.location.href) {
            this.apiEndPoint = environment.apiEndPoint;
        }
        else {
            this.apiEndPoint = platformLocation.location.href;
        }
    }
    ApiService.prototype.formatErrors = function (error) {
        return throwError(error.error);
    };
    ApiService.prototype.get = function (path, params) {
        if (params === void 0) { params = new HttpParams(); }
        return this.http.get("" + this.apiEndPoint + path, { params: params })
            .pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.put = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.put("" + this.apiEndPoint + path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.post = function (path, body) {
        if (body === void 0) { body = {}; }
        return this.http.post("" + this.apiEndPoint + path, JSON.stringify(body)).pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.delete = function (path) {
        return this.http.delete("" + this.apiEndPoint + path).pipe(catchError(this.formatErrors));
    };
    ApiService.prototype.abc = function () { };
    ApiService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            PlatformLocation])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map