import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from '../../services/auth';
var EmailValidator = /** @class */ (function () {
    function EmailValidator(authProvider) {
        this.authProvider = authProvider;
    }
    EmailValidator.prototype.checkEmail = function (control) {
        var _this = this;
        clearTimeout(this.debouncer);
        return new Promise(function (resolve) {
            _this.debouncer = setTimeout(function () {
                _this.authProvider.validateEmail(control.value).subscribe(function (res) {
                    if (res.ok) {
                        resolve(null);
                    }
                }, function (err) {
                    resolve({ 'emailInUse': true });
                });
            }, 1000);
        });
    };
    EmailValidator = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], EmailValidator);
    return EmailValidator;
}());
export { EmailValidator };
//# sourceMappingURL=email.validator.js.map