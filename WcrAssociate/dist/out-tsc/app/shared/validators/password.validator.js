var ParentErrorStateMatcher = /** @class */ (function () {
    function ParentErrorStateMatcher() {
    }
    ParentErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = !!(form && form.submitted);
        var controlTouched = !!(control && (control.dirty || control.touched));
        var controlInvalid = !!(control && control.invalid);
        var parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
        return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
    };
    return ParentErrorStateMatcher;
}());
export { ParentErrorStateMatcher };
var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
    PasswordValidator.areEqual = function (formGroup) {
        var value;
        var valid = true;
        for (var key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                var control = formGroup.controls[key];
                if (value === undefined) {
                    value = control.value;
                }
                else {
                    if (value !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    };
    return PasswordValidator;
}());
export { PasswordValidator };
//# sourceMappingURL=password.validator.js.map