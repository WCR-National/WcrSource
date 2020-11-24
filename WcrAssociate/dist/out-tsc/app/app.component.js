import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from './services/auth';
import * as $ from 'jquery';
var AppComponent = /** @class */ (function () {
    //@HostBinding('className') componentClass: string;
    function AppComponent(userService) {
        this.userService = userService;
        //this.componentClass = 'mm-page mm-slideout';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.userService.populate();
        /*--------------------------------------------------*/
        /*  Mobile Menu - mmenu.js
        /*--------------------------------------------------*/
        var thisStatus = this;
        setTimeout(function () {
            mmenuInit();
            $(window).resize(function () { mmenuInit(); });
        }, 1200);
        /*  User Menu */
        //$('.user-menu').on('click', function () {
        //    $(this).toggleClass('active');
        //});
        //$(window).resize(function () { mmenuInit(); });
    };
    AppComponent.prototype.onClick = function () {
        //myTest();
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