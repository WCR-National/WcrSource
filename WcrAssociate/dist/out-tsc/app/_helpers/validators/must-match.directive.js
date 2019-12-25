import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { MustMatch } from './must-match.validator';
var MustMatchDirective = /** @class */ (function () {
    function MustMatchDirective() {
        this.mustMatch = [];
    }
    MustMatchDirective_1 = MustMatchDirective;
    MustMatchDirective.prototype.validate = function (formGroup) {
        return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
    };
    var MustMatchDirective_1;
    tslib_1.__decorate([
        Input('mustMatch'),
        tslib_1.__metadata("design:type", Array)
    ], MustMatchDirective.prototype, "mustMatch", void 0);
    MustMatchDirective = MustMatchDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[mustMatch]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchDirective_1, multi: true }]
        })
    ], MustMatchDirective);
    return MustMatchDirective;
}());
export { MustMatchDirective };
//# sourceMappingURL=must-match.directive.js.map