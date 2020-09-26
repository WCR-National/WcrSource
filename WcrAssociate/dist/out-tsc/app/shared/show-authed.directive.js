import { __decorate, __metadata } from "tslib";
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../../app/services/auth';
var ShowAuthedDirective = /** @class */ (function () {
    function ShowAuthedDirective(templateRef, userService, viewContainer) {
        this.templateRef = templateRef;
        this.userService = userService;
        this.viewContainer = viewContainer;
    }
    ShowAuthedDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.isAuthenticated.subscribe(function (isAuthenticated) {
            if (isAuthenticated && _this.condition || !isAuthenticated && !_this.condition) {
                _this.viewContainer.createEmbeddedView(_this.templateRef);
            }
            else {
                _this.viewContainer.clear();
            }
        });
    };
    Object.defineProperty(ShowAuthedDirective.prototype, "appShowAuthed", {
        set: function (condition) {
            this.condition = condition;
        },
        enumerable: true,
        configurable: true
    });
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ShowAuthedDirective.prototype, "appShowAuthed", null);
    ShowAuthedDirective = __decorate([
        Directive({ selector: '[appShowAuthed]' }),
        __metadata("design:paramtypes", [typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object, UserService, typeof (_b = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" ? _b : Object])
    ], ShowAuthedDirective);
    return ShowAuthedDirective;
}());
export { ShowAuthedDirective };
//# sourceMappingURL=show-authed.directive.js.map