import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var ListErrorsComponent = /** @class */ (function () {
    function ListErrorsComponent() {
        this.formattedErrors = [];
    }
    Object.defineProperty(ListErrorsComponent.prototype, "errors", {
        set: function (errorList) {
            this.formattedErrors = Object.keys(errorList.errors || {})
                .map(function (key) { return key + " " + errorList.errors[key]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListErrorsComponent.prototype, "errorList", {
        get: function () { return this.formattedErrors; },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ListErrorsComponent.prototype, "errors", null);
    ListErrorsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-list-errors',
            templateUrl: './list-errors.component.html'
        })
    ], ListErrorsComponent);
    return ListErrorsComponent;
}());
export { ListErrorsComponent };
//# sourceMappingURL=list-errors.component.js.map