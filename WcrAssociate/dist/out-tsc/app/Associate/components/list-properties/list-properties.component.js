import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
var ListPropertiesComponent = /** @class */ (function () {
    function ListPropertiesComponent(route, router, profileService, ngZone) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.ngZone = ngZone;
    }
    ListPropertiesComponent.prototype.ngOnInit = function () {
    };
    ListPropertiesComponent = tslib_1.__decorate([
        Component({
            selector: 'list-properties',
            templateUrl: './list-properties.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ProfileService, NgZone])
    ], ListPropertiesComponent);
    return ListPropertiesComponent;
}());
export { ListPropertiesComponent };
//# sourceMappingURL=list-properties.component.js.map