import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var SupportComponent = /** @class */ (function () {
    function SupportComponent(route) {
        this.route = route;
    }
    SupportComponent.prototype.ngOnInit = function () {
    };
    SupportComponent = tslib_1.__decorate([
        Component({
            selector: 'consumer-support',
            templateUrl: './support.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], SupportComponent);
    return SupportComponent;
}());
export { SupportComponent };
//# sourceMappingURL=support.component.js.map