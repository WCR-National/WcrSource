import * as tslib_1 from "tslib";
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
    BillingHistoryComponent = tslib_1.__decorate([
        Component({
            selector: 'billing-history',
            templateUrl: './billing-history.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ProfileService, NgZone])
    ], BillingHistoryComponent);
    return BillingHistoryComponent;
}());
export { BillingHistoryComponent };
//# sourceMappingURL=billing-history.component.js.map