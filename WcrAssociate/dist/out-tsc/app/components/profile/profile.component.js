import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from '../../services/auth';
import * as $ from 'jquery';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { Toaster } from 'ngx-toast-notifications';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, router, profileService, xmlToJson, fb, toaster, cdr, paymentService) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.toaster = toaster;
        this.cdr = cdr;
        this.paymentService = paymentService;
        this.defaultDisableSubmitButton = true;
        this.defaultDisableUpdateButton = true;
        this.isSubmitting = false;
        this.isProfileFormVisible = true;
        this.isAddOrUpdateButton = true;
        this.FirstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.Address = '';
        this.unitApt = '';
        this.city = '';
        this.stateID = '';
        this.ZipCode = '';
        this.MobileNo = '';
        this.userName = '';
        this.startValueState = null;
        this.selectedState = null;
        this.g_selectedState = null;
        this.stateData = null;
        this.validationMessages = {
            'FirstName': {
                'required': 'First Name is required',
                'letterOnly': "Allowed alphabeticals letters with space or with dash like <br> Jean Claude or Jean-Claude or Jean or O'Toole."
            },
            'lastName': {
                'letterOnly': "Allowed alphabeticals letters with space or with dash like <br> Jean Claude or Jean-Claude or Jean or O'Toole."
            },
            'Address': {
                'alphaNumeric': 'Allowed alphanumeric only.',
                'alphaNumericWithSpace': 'Allowed alphanumeric and spaces only.',
            },
            'city': {
                'letterOnly': 'Alphabetical letters only.'
            },
            'stateID': {
                'required': 'State is required',
                'letterOnly': 'Alphabetical letters only.'
            },
            'ZipCode': {
                'zipCode': 'Please enter 5 digit zip code.',
                'numericOnly': 'Allowed digits only like nnnnn or nnnnn-nnnn'
            },
            'unitApt': {
                'alphaNumeric': 'Allowed alphanumeric only.',
                'alphaNumericWithHash': 'Allowed alphanumeric and hashes only.',
            },
            'MobileNo': {
                'required': 'Mobile no is required',
                'tenDigits': 'Allowed 10 or 7 digits for mobile No like: XXXXXXXXXX or XXXXXXX.',
            },
            'password': {
                'required': 'Password is required',
                'minlength': 'Min of 8 char in length',
                'maxlength': 'Max of 20 char in length',
                'number': 'At least one number.',
                'lowerLetter': 'At least one lowercase.',
                'upperLetter': 'At least one uppercase.',
                'hasSpecialCharacters': 'At least one special character.'
            },
            'email': {
                'required': 'Email is required',
                'email': 'Email is not in correct format.',
            },
        };
        this.formErrors = {
            'FirstName': '',
            'lastName': '',
            'email': '',
            'password': '',
            'Address': '',
            'unitApt': '',
            'city': '',
            'stateID': '',
            'ZipCode': '',
            'MobileNo': '',
            'userName': ''
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        this.startValueState = { value: '', label: '' };
        this.selectedState = '';
        this.getProfileDataDetails();
        var thisStatus = this;
        setTimeout(function () {
            thisStatus.profileForm.valueChanges.subscribe(function () {
                if (thisStatus.profileForm.valid) {
                    //thisStatus.cardForm.setErrors({ 'invalid': true });
                    thisStatus.defaultDisableUpdateButton = false;
                }
                else {
                    thisStatus.defaultDisableUpdateButton = true;
                }
            });
        }, 4000);
        this.cdr.detectChanges();
    };
    ProfileComponent.prototype.initializeForm = function () {
        this.profileForm = this.fb.group({
            userName: ['n'],
            FirstName: ['', [Validators.required, firstLastValidator(/^[a-zA-Z]+(?:['-\s][a-zA-Z]+)?$/, { letterOnly: true })]],
            lastName: ['', [firstLastValidator(/^[a-zA-Z]+(?:['-\s][a-zA-Z]+)?$/, { letterOnly: true })]],
            Address: ['', [StateValidator(/^[a-zA-Z0-9\-\s]+$/, { alphaNumericWithSpace: true })]],
            city: ['', [StateValidator(/^[a-zA-Z][a-zA-Z\s]*$/, { letterOnly: true })]],
            stateID: [''],
            unitApt: ['', [StateValidator(/^[a-zA-Z0-9\-\#]+$/, { alphaNumericWithHash: true })]],
            ZipCode: ['', [StateValidator(/^\d+(-\d+)?$/, { numericOnly: true })]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
                    patternValidator(/\d/, { number: true }),
                    patternValidator(/[A-Z]/, { upperLetter: true }),
                    patternValidator(/[a-z]/, { lowerLetter: true }),
                    patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
                ]],
            email: ['', [Validators.required]],
            MobileNo: ['', [Validators.required, phoneValidator(/\d{11}/, { elevenDigits: true })]],
        });
    };
    ProfileComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.profileForm; }
        Object.keys(group.controls).forEach(function (key) {
            var abstractControl = group.get(key);
            _this.formErrors[key] = '';
            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                _this.formErrors[key] = "";
                var messages = _this.validationMessages[key];
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                _this.formErrors[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }
            if (abstractControl instanceof FormGroup) {
                _this.logValidationErrors(abstractControl);
            }
        });
    };
    ProfileComponent.prototype.getProfileDataDetails = function () {
        var _this = this;
        var thisStatus = this;
        this.profileService
            .getProfileInfo()
            .subscribe(function (data) {
            var thisStatus = _this;
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("ConsumerDetail");
                $.each(docs, function (i, docs) {
                    thisStatus.city = $(docs).find("City").text();
                    thisStatus.stateID = $(docs).find("StateId").text();
                    thisStatus.ZipCode = $(docs).find("ZipCode").text();
                    thisStatus.Address = $(docs).find("Address").text();
                    thisStatus.unitApt = $(docs).find("Unit_Apt").text();
                    thisStatus.FirstName = $(docs).find("Name").text();
                    thisStatus.lastName = $(docs).find("LastName").text();
                    thisStatus.email = $(docs).find("EmailId").text();
                    thisStatus.password = $(docs).find("Password").text();
                    thisStatus.MobileNo = $(docs).find("Mob").text();
                });
                if (data.FirstName != "" && data.lastName !== "" && data != null && data != "-1" && data != -1) {
                    //this.profileId = data._crdID;
                    //this.userName = data._zip
                    thisStatus.profileForm.get('email').setValue(thisStatus.email);
                    thisStatus.profileForm.get('ZipCode').setValue(thisStatus.ZipCode);
                    thisStatus.profileForm.get('MobileNo').setValue(thisStatus.MobileNo);
                    thisStatus.profileForm.get('FirstName').setValue(thisStatus.FirstName);
                    thisStatus.profileForm.get('city').setValue(thisStatus.city);
                    //thisStatus.profileForm.get('stateID').setValue(thisStatus.stateID);
                    //thisStatus.profileForm.get('userName').setValue(thisStatus.userName);
                    thisStatus.profileForm.get('lastName').setValue(thisStatus.lastName);
                    thisStatus.profileForm.get('password').setValue(thisStatus.password);
                    thisStatus.profileForm.get('Address').setValue(thisStatus.Address);
                    thisStatus.profileForm.get('unitApt').setValue(thisStatus.unitApt);
                    _this.bindState();
                    setTimeout(function () {
                        thisStatus.startValueState = { value: data.stateID, label: data.stateID };
                    }, 2000);
                    _this.isAddOrUpdateButton = false;
                    _this.isProfileFormVisible = false;
                    _this.defaultDisableUpdateButton = true;
                }
                else {
                    thisStatus.profileForm.get('email').setValue(thisStatus.email);
                    thisStatus.profileForm.get('password').setValue(thisStatus.password);
                    thisStatus.profileForm.get('userName').setValue("n");
                    _this.bindState();
                    _this.isAddOrUpdateButton = true;
                    _this.isProfileFormVisible = true;
                }
            }
        });
    };
    ProfileComponent.prototype.changeState = function () {
        //let city_value = this.cardForm.get('city').value;
        //let state_value: any = this.cardForm.get('state').value;
        //this.bindStateWiseZipCode(state_value.value, city_value);
    };
    ProfileComponent.prototype.bindState = function () {
        var _this = this;
        var countryId = "US"; //this.cardForm.get('country').value;
        this.paymentService
            .bindState(countryId)
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("States1");
                var arrState = [];
                //this.startValueState = '';
                var thisStatus = _this;
                //arrState.push({ "value": "-1", "label": "Select State" })
                var val = "";
                var label = "";
                $.each(docs, function (i, docs) {
                    if (i == 0) {
                        val = $(docs).find("stateid").text();
                        label = $(docs).find("stateid").text();
                        //thisStatus.startValueState = { "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() };
                    }
                    arrState.push({ "value": $(docs).find("stateid").text(), "label": $(docs).find("stateid").text() });
                });
                _this.stateData = arrState;
                //if (this.state != "" && this.state !== undefined) {
                //    this.startValueState = [this.state];//{ value: "1", label: "January" };
                //    if (this.city != "" && this.city !== undefined) {
                //        this.bindStateWiseZipCode(this.state, this.city);
                //    }
                //}
                //else {
                //    this.startValueState = { 'value': val, 'label': label };
                //}
            }
        });
    };
    ProfileComponent.prototype.submitProfileForm = function () {
        var _this = this;
        debugger;
        if (this.profileForm.valid) {
            var consumerData = this.profileForm.value;
            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.profileService
                .UpdateConsumer(consumerData)
                .subscribe(function (data) {
                if (data.d >= 1) {
                    _this.showToast('success', "Profile data saved.");
                    _this.isProfileFormVisible = false;
                }
                if (data.d == "0") {
                    _this.showToast('danger', "Email or mobile no already exists! Please try another one.");
                    _this.isProfileFormVisible = true;
                }
                if (data.d == "-1") {
                    _this.showToast('danger', "OOPS Error ! Please try again.");
                    _this.isProfileFormVisible = true;
                }
            });
        }
        else {
            this.formErrorMessage = "Please make sure, you entered correct data in all fields.";
            this.logValidationErrors(this.profileForm);
            this.isSubmitting = false;
            return;
        }
    };
    ProfileComponent.prototype.updateProfileForm = function () {
        var _this = this;
        debugger;
        if (this.profileForm.valid) {
            var consumerData = this.profileForm.value;
            //this.abbrState(credentials.state, 'to');
            this.isSubmitting = true;
            this.profileService
                .UpdateConsumer(consumerData)
                .subscribe(function (data) {
                if (data.d >= 1) {
                    _this.showToast('success', "Profile Data Updated.");
                    _this.isProfileFormVisible = false;
                }
                if (data.d == "0") {
                    _this.showToast('danger', "This email or mobile no already exists! Please try another one.");
                    _this.isProfileFormVisible = true;
                }
                if (data.d == "-1") {
                    _this.showToast('danger', "OOPS Error ! Please try again.");
                    _this.isProfileFormVisible = true;
                }
            });
        }
        else {
            this.formErrorMessage = "Please make sure, you entered correct data.";
            this.logValidationErrors(this.profileForm);
            this.isSubmitting = false;
            return;
        }
    };
    ProfileComponent.prototype.editForm = function () {
        this.isProfileFormVisible = true;
    };
    ProfileComponent.prototype.cancelForm = function () {
        var _this = this;
        debugger;
        //this.profileForm.reset();
        Object.keys(this.profileForm.controls).forEach(function (key) {
            _this.profileForm.get(key).markAsUntouched();
            _this.profileForm.get(key).markAsPristine();
        });
        var group = this.profileForm;
        this.clearValidationErrors(group);
        this.isProfileFormVisible = false;
    };
    ProfileComponent.prototype.clearValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.profileForm; }
        debugger;
        Object.keys(group.controls).forEach(function (key) {
            var abstractControl = group.get(key);
            _this.formErrors[key] = '';
            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                _this.formErrors[key] = "";
                var messages = _this.validationMessages[key];
                if (abstractControl.errors != null) {
                    for (var errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                _this.formErrors[key] += ' ';
                            }
                        }
                    }
                }
            }
            if (abstractControl instanceof FormGroup) {
                _this.clearValidationErrors(abstractControl);
            }
        });
    };
    ProfileComponent.prototype.showToast = function (toastrType, text) {
        var type = toastrType;
        this.toaster.open({
            text: text,
            caption: type + ' notification',
            type: type,
            duration: 8000
        });
    };
    ProfileComponent.prototype.smallLettersToCapitalLetters = function (value) {
        value.toUpperCase();
    };
    ProfileComponent.prototype.abbrState = function (input, to) {
        var states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
        if (to == 'abbr') {
            input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            for (var i = 0; i < states.length; i++) {
                if (states[i][0] == input) {
                    return (states[i][1]);
                }
            }
        }
        else if (to == 'name') {
            input = input.toUpperCase();
            for (var i = 0; i < states.length; i++) {
                if (states[i][1] == input) {
                    return (states[i][0]);
                }
            }
        }
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'consumer-profile',
            templateUrl: './profile.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ProfilesService, XMLToJSON,
            FormBuilder, Toaster, ChangeDetectorRef, PaymentService])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
function patternValidator(regex, error) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        var valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
function firstLastValidator(regex, error) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        var valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
function StateValidator(regex, error) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        var valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
function phoneValidator(regex, error) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        if (control.value[0] == "1") {
            if (/\d{11}/.test(control.value)) {
                // if control is empty return no error
                return null;
            }
            else {
                return { elevenDigits: true };
            }
        }
        else if (control.value[0] != "1") {
            if (/\d{10}/.test(control.value)) {
                // if control is empty return no error
                return null;
            }
            else if (/\d{7}/.test(control.value)) {
                return null;
            }
            else {
                return { tenDigits: true };
            }
        }
        else {
            return null;
        }
    };
}
//# sourceMappingURL=profile.component.js.map