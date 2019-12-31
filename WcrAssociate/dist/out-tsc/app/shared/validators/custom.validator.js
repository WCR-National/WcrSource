var CustomValidator = /** @class */ (function () {
    function CustomValidator() {
    }
    //static validUsername(fc: FormControl) {
    //    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
    //        return {
    //            validUsername: true
    //        };
    //    } else {
    //        return null;
    //    }
    //}
    //static emailDomain(domainName: string) {
    //    return (control: AbstractControl): { [key: string]: any } | null => {
    //        const email: string = control.value;
    //        const domain = email.substring(email.lastIndexOf('@') + 1);
    //        if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
    //            return null;
    //        } else {
    //            return { 'emailDomain': true };
    //        }
    //    };
    //}
    CustomValidator.isEmailExist = function (userService) {
        debugger;
        return function (control) {
            //clearTimeout(this.debouncer);
            userService.validateEmail(control.value).subscribe(function (data) {
                debugger;
                if (data >= 1) {
                    control.parent.get('passwordGroup').enable();
                    control.parent.get('passwordGroup').get('password').enable();
                    control.parent.get('passwordGroup').get('confirmPassword').enable();
                    control.parent.get('associate').enable();
                    control.parent.get('consumer').enable();
                    control.parent.get('terms').enable();
                    return null;
                }
                else {
                    return { 'emalInUse': true };
                }
            }, function (err) {
                return { 'emalInUse': true };
            });
            return null;
        };
    };
    CustomValidator.matchPasswords = function (group) {
        var passwordControl = group.get('password');
        var confirmPasswordControl = group.get('confirmPassword');
        if (group.parent !== undefined) {
            if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine) {
                group.parent.get('associate').disable();
                group.parent.get('consumer').disable();
                return null;
            }
            else {
                group.parent.get('associate').enable();
                group.parent.get('consumer').enable();
                return { 'passwordMismatch': true };
            }
        }
        else {
            return null;
        }
    };
    CustomValidator.regexValidator = function (regex, error) {
        return function (control) {
            if (!control.value) {
                return null;
            }
            var valid = regex.test(control.value);
            return valid ? null : error;
        };
    };
    return CustomValidator;
}());
export { CustomValidator };
//# sourceMappingURL=custom.validator.js.map