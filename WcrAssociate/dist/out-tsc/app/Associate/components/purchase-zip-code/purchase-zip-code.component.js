import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
var PurchaseZipCodeComponent = /** @class */ (function () {
    function PurchaseZipCodeComponent(route, router, profileService, ngZone) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.ngZone = ngZone;
    }
    PurchaseZipCodeComponent.prototype.ngOnInit = function () {
    };
    PurchaseZipCodeComponent = tslib_1.__decorate([
        Component({
            selector: 'purchase-zip-code',
            templateUrl: './purchase-zip-code.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ProfileService, NgZone])
    ], PurchaseZipCodeComponent);
    return PurchaseZipCodeComponent;
}());
export { PurchaseZipCodeComponent };
//# sourceMappingURL=purchase-zip-code.component.js.map