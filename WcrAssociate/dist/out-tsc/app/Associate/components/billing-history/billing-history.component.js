import { __decorate, __metadata } from "tslib";
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
var BillingHistoryComponent = /** @class */ (function () {
    function BillingHistoryComponent(route, router, profileService, ngZone) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.ngZone = ngZone;
        this.isProfile = false;
        this.isDashboard = false;
    }
    BillingHistoryComponent.prototype.ngOnInit = function () {
    };
    var _a, _b, _c;
    BillingHistoryComponent = __decorate([
        Component({
            selector: 'billing-history',
            templateUrl: './billing-history.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _a : Object, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object, ProfileService, typeof (_c = typeof NgZone !== "undefined" && NgZone) === "function" ? _c : Object])
    ], BillingHistoryComponent);
    return BillingHistoryComponent;
}());
export { BillingHistoryComponent };
//# sourceMappingURL=billing-history.component.js.map