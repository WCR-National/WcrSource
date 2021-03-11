import * as tslib_1 from "tslib";
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../../app/services/auth';
var ShowAuthedAssociateDirective = /** @class */ (function () {
    function ShowAuthedAssociateDirective(templateRef, userService, viewContainer) {
        this.templateRef = templateRef;
        this.userService = userService;
        this.viewContainer = viewContainer;
    }
    ShowAuthedAssociateDirective.prototype.ngOnInit = function () {
        //this.userService.isAuthenticatedAssociate.subscribe(
        //    (isAuthenticated) => {
        //        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
        //            this.viewContainer.createEmbeddedView(this.templateRef);
        //        } else {
        //            this.viewContainer.clear();
        //        }
        //    }
        //);
    };
    Object.defineProperty(ShowAuthedAssociateDirective.prototype, "appShowAuthedAssociate", {
        set: function (condition) {
            this.condition = condition;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ShowAuthedAssociateDirective.prototype, "appShowAuthedAssociate", null);
    ShowAuthedAssociateDirective = tslib_1.__decorate([
        Directive({ selector: '[appShowAuthedAssociate]' }),
        tslib_1.__metadata("design:paramtypes", [TemplateRef,
            UserService,
            ViewContainerRef])
    ], ShowAuthedAssociateDirective);
    return ShowAuthedAssociateDirective;
}());
export { ShowAuthedAssociateDirective };
//# sourceMappingURL=show-authed-associate.directive.js.map