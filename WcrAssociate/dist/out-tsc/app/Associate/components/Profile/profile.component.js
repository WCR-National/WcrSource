import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/auth';
import { HttpClient } from '@angular/common/http';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, router, userService, fb, http) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.http = http;
    }
    ProfileComponent.prototype.ngOnInit = function () { };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-profile-page',
            templateUrl: './profile.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, UserService, FormBuilder, HttpClient])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map