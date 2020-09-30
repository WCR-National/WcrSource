import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from './services/auth';
var AppComponent = /** @class */ (function () {
    function AppComponent(userService) {
        this.userService = userService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.userService.populate();
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'wcr-Associate-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map