import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, router, profileService, xmlToJson, fb) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.isFormVisible = true;
        this.validationMessages = {
            'password': {
                'required': 'Password is required',
                'minlength': 'Min of 8 char in length',
                'maxlength': 'Max of 20 char in length',
                'number': 'At least one number.',
                'lowerLetter': 'At least one lowercase.',
                'upperLetter': 'At least one uppercase.',
                'hasSpecialCharacters': 'At least one special character.'
            },
            'firstName': {
                'required': 'First Name is required',
            },
            'lastName': {
                'required': 'Last Name is required',
            },
            'licenseId': {
                'required': 'Last Name is required',
            },
            'licenseState': {
                'required': 'Last Name is required',
            }
        };
        this.formErrors = {
            'firstName': '',
            'lastName': '',
            'password': '',
            'phoneNo': '',
            'licenseId': '',
            'licenseState': ''
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.setValidationOnForm();
    };
    ProfileComponent.prototype.getUserDetails = function () {
        var thisStatus = this;
        this.profileService
            .getUserDetails()
            .subscribe(function (data) {
            if (data.d.length > 0) {
                var xmlDoc = $.parseXML(data.d);
                var xml = $(xmlDoc);
                var docs = xml.find("ViewAssociateBasicDetail");
                $.each(docs, function (i, docs) {
                    if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                        thisStatus.isFormVisible = false;
                    }
                    thisStatus.FirstName = $(docs).find("FullName").text();
                    thisStatus.LastName = $(docs).find("LastName").text();
                    thisStatus.UserName = $(docs).find("UserName").text();
                    thisStatus.PhoneNumber = $(docs).find("MobileNo").text();
                    thisStatus.email = $(docs).find("Email").text();
                    thisStatus.Password = $(docs).find("Password").text();
                    thisStatus.LicenseNumber = $(docs).find("LicenseId").text();
                    thisStatus.IssuingState = $(docs).find("LicenseState").text();
                    var pic = '';
                    if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                        pic = "<img   alt='User Image' src='../AssociatePhoto/" + $(docs).find("Photo").text() + "'/> ";
                    }
                    else {
                        pic = "<img  alt='User Image' src='../AssociatePhoto/0.png'/>";
                    }
                    thisStatus.profileImage = pic;
                    //$("#pprofilePic").html(sd.join(''));
                    //$("#txtfName").val($(docs).find("FullName").text());
                    //$("#txtLName").val($(docs).find("LastName").text());
                    //$("#txtEmailAddress").val($(docs).find("Email").text());
                    //$("#txtPassword").val($(docs).find("Password").text());
                    //$("#txtContactNumber").val($(docs).find("MobileNo").text());
                    //$("#txtLicenceState").val($(docs).find("LicenseState").text());
                    //$("#txtLicenceID").val($(docs).find("LicenseId").text());
                });
            }
        });
    };
    ProfileComponent.prototype.setValidationOnForm = function () {
        this.profileForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            licenseState: ['', Validators.required],
            phoneNo: ['', Validators.required],
            licenseId: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
                    patternValidator(/\d/, { number: true }),
                    patternValidator(/[A-Z]/, { upperLetter: true }),
                    patternValidator(/[a-z]/, { lowerLetter: true }),
                    patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
                ]]
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
    ProfileComponent.prototype.submitProfileForm = function () {
        var _this = this;
        this.profileService
            .getUserDetails()
            .subscribe(function (data) {
            if (data.d == "1") {
                _this.isFormVisible = false;
                _this.getUserDetails();
                //hide the form and show the text only
                //set the sidebar values
            }
            if (data.d == "0") {
                _this.formError = "Unsuccessfull!!! <br>This Email Id or User name or Mobile No Already Exists! Please Try another one.";
            }
            if (data.d == "-1") {
                _this.formError = "Unsuccessfull!!! <br>This Email Id or User name or Mobile No Already Exists! Please Try another one.";
                //$('#fail_message').modal('show');
            }
            //on return stat
        });
    };
    ProfileComponent.prototype.submitImage = function () {
        var _this = this;
        var fileUpload = $("#profileImageId").get(0);
        var files = fileUpload.files;
        //image resize code here
        var image = new FormData();
        for (var i = 0; i < files.length; i++) {
            image.append(files[i].name, files[i]);
        }
        this.profileService
            .uploadimage(image)
            .subscribe(function (data) {
            _this.profileImage = URL.createObjectURL(files[0]);
            _this.formError = "Your profile has been updated Successfully.";
        });
    };
    ProfileComponent.prototype.cancelForm = function () {
        this.isFormVisible = false;
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-profile-page',
            templateUrl: './profile.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ProfileService,
            XMLToJSON, FormBuilder])
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
//# sourceMappingURL=profile.component.js.map