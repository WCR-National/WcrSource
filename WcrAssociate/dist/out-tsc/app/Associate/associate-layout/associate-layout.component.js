import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'AngularAssociate/app/services/search';
import * as $ from 'jquery';
var AssociateLayoutComponent = /** @class */ (function () {
    function AssociateLayoutComponent(route, router, _messageService, userService) {
        this.route = route;
        this.router = router;
        this._messageService = _messageService;
        this.userService = userService;
    }
    AssociateLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currentUser.subscribe(function (userData) {
            _this.currentUser = userData;
        });
        //const psSidebarBody = new PerfectScrollbar('#dpSidebarBody', {
        //    suppressScrollX: true
        //});
        $('.nav-sidebar .with-sub').on('click', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');
            $(this).parent().siblings().removeClass('show');
            //psSidebarBody.update();
        });
        $('.burger-menu:first-child').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('toggle-sidebar');
        });
        $('.header-search .form-control').on('focusin', function (e) {
            $(this).parent().addClass('active');
        });
        $('.header-search .form-control').on('focusout', function (e) {
            $(this).parent().removeClass('active');
        });
    };
    AssociateLayoutComponent.prototype.onClickGetAds = function () {
        this._messageService.filter('Register click');
    };
    AssociateLayoutComponent.prototype.onClickLogout = function () {
        var _this = this;
        this.userService
            .attemptLogout()
            .subscribe(function (data) {
            if (data == "0") {
                _this.router.navigateByUrl('/home');
            }
            else {
                alert("OOPS Something goes wrong !");
            }
        }, function (err) {
            alert("OOPS Something goes wrong !");
        });
    };
    AssociateLayoutComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-layout',
            templateUrl: './associate-layout.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, MessageService,
            UserService])
    ], AssociateLayoutComponent);
    return AssociateLayoutComponent;
}());
export { AssociateLayoutComponent };
//# sourceMappingURL=associate-layout.component.js.map