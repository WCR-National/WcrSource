import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { UserService } from './services/auth';
var AppComponent = /** @class */ (function () {
    function AppComponent(userService) {
        this.userService = userService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.userService.populate();
    };
    AppComponent = __decorate([
        Component({
            selector: 'wcr-Associate-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [UserService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map