import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route) {
        this.route = route;
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'consumer-profile',
            templateUrl: './profile.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map