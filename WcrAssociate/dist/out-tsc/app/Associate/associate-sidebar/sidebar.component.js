import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
        this.isProfile = false;
        this.isDashboard = false;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        if (location.origin.includes("profile")) {
            this.isProfile = true;
            this.isDashboard = false;
        }
        else {
            this.isProfile = false;
            this.isDashboard = true;
        }
    };
    SidebarComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-layout-sidebar',
            templateUrl: './sidebar.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map