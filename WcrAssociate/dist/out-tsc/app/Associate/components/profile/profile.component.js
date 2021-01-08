import * as tslib_1 from "tslib";
import { Component, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'AngularAssociate/app/services/search';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, router, profileService, xmlToJson, fb, modalService, cd, _messageService) {
        this.route = route;
        this.router = router;
        this.profileService = profileService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.modalService = modalService;
        this.cd = cd;
        this._messageService = _messageService;
        this.isFormVisible = true;
        this.isSubmitting = false;
        this.showErrorsPassword = false;
        this.isProfileFormVisible = false;
        this.profileImagePath = "";
        this.isProfileImageFormVisisble = false;
        this.isSubmittingImage = false;
        this.showInformation = false;
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
                'letterOnly': 'Allowed alphabeticals letters only.'
            },
            'lastName': {
                'required': 'Last Name is required',
                'letterOnly': 'Allowed alphabeticals letters only.'
            },
            'licenseId': {
                'required': 'License id is required',
                'alphaNumeric': 'Allowed alphanumeric only.'
            },
            'licenseState': {
                'required': 'License state is required',
                'letterOnly': 'Allowed alphabeticals letters only.'
            },
            'phoneNo': {
                'required': 'Phone number is required',
                'tenDigits': 'Allowed 10 digits for mobile no.',
                'elevenDigits': 'Start with 1, Allowed 11 digits'
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
        this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
        this.editFile = false;
        this.removeUpload = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUserDetails();
        this.setValidationOnForm();
    };
    ProfileComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    ProfileComponent.prototype.showHideProfileImage = function () {
        this.isProfileFormVisible = true;
    };
    ProfileComponent.prototype.getDismissReason = function (reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
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
                    var pic = '';
                    if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                        var image = $(docs).find('Photo').text();
                        pic = '../AssociatePhoto/' + image + '';
                    }
                    else {
                        pic = '../AssociatePhoto/0.png';
                    }
                    $("#imagePreview").css('background-image', 'url(' + pic + ')');
                    thisStatus.profileImagePath = pic;
                    //thisStatus.profileImage = pic;
                    debugger;
                    if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                        thisStatus.isFormVisible = true;
                        thisStatus.profileForm.get('email').setValue($(docs).find("Email").text());
                        thisStatus.profileForm.get('password').setValue($(docs).find("Password").text());
                        thisStatus._messageService.filter('disable');
                        thisStatus.showInformation = true;
                    }
                    else {
                        thisStatus._messageService.filter('enable');
                        thisStatus.showInformation = false;
                    }
                    thisStatus.isFormVisible = false;
                    thisStatus.FirstName = $(docs).find("FullName").text();
                    thisStatus.LastName = $(docs).find("LastName").text();
                    thisStatus.UserName = $(docs).find("UserName").text();
                    thisStatus.PhoneNumber = $(docs).find("MobileNo").text();
                    thisStatus.email = $(docs).find("Email").text();
                    thisStatus.Password = $(docs).find("Password").text();
                    thisStatus.LicenseNumber = $(docs).find("LicenseId").text();
                    thisStatus.IssuingState = $(docs).find("LicenseState").text();
                    debugger;
                    thisStatus.profileForm.get('firstName').setValue(thisStatus.FirstName);
                    thisStatus.profileForm.get('lastName').setValue(thisStatus.LastName);
                    thisStatus.profileForm.get('email').setValue(thisStatus.email);
                    thisStatus.profileForm.get('password').setValue(thisStatus.Password);
                    thisStatus.profileForm.get('phoneNo').setValue(thisStatus.PhoneNumber);
                    thisStatus.profileForm.get('licenseId').setValue(thisStatus.LicenseNumber);
                    thisStatus.profileForm.get('licenseState').setValue(thisStatus.IssuingState);
                });
            }
        });
    };
    ProfileComponent.prototype.setValidationOnForm = function () {
        this.profileForm = this.fb.group({
            email: [''],
            firstName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            lastName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            licenseState: ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            phoneNo: ['', [Validators.required, phoneValidator(/\d{11}/, { elevenDigits: true })]],
            licenseId: ['', [Validators.required, alphaNumeric(/[a-zA-Z0-9]+$/, { alphaNumeric: true }, this)]],
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
        var credentials = this.profileForm.value;
        this.abbrState(credentials.licenseState, 'to');
        this.isSubmitting = true;
        this.profileService
            .updateProfileinfo(credentials.firstName, credentials.lastName, credentials.phoneNo, credentials.email, credentials.password, credentials.licenseId, credentials.licenseState)
            .subscribe(function (data) {
            if (data.d == "1") {
                _this.getUserDetails();
                //hide the form and show the text only
                //set the sidebar values
                _this.isFormVisible = false;
                _this.isSubmitting = false;
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
    ProfileComponent.prototype.editForm = function () {
        this.isFormVisible = true;
    };
    ProfileComponent.prototype.cancelForm = function () {
        debugger;
        this.isFormVisible = false;
    };
    ProfileComponent.prototype.showErrors = function () {
        this.showErrorsPassword = true;
    };
    ProfileComponent.prototype.hideErrors = function () {
        this.showErrorsPassword = false;
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
    ProfileComponent.prototype.uploadFile = function (event) {
        var _this = this;
        this.isProfileImageFormVisisble = true;
        var reader = new FileReader(); // HTML5 FileReader API
        var file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            // When file uploads set it to file formcontrol
            reader.onload = function () {
                _this.imageUrl = reader.result;
                $("#imagePreview").css('background-image', 'url(' + _this.imageUrl + ')');
            };
            // ChangeDetectorRef since file is loading outside the zone
            this.cd.markForCheck();
        }
    };
    ProfileComponent.prototype.UploadToServer = function () {
        debugger;
        this.isSubmittingImage = true;
        var thisStatus = this;
        var fileUpload = $("#profileImageId").get(0);
        var files = fileUpload.files;
        //image resize code here
        var image = new FormData();
        for (var i = 0; i < files.length; i++) {
            image.append(files[i].name, files[i]);
        }
        $.ajax({
            url: "Associate/ws/UpdatePic.ashx",
            type: "POST",
            contentType: false,
            processData: false,
            data: image,
            success: function (result) {
                thisStatus.isProfileImageFormVisisble = false;
                thisStatus.isSubmittingImage = false;
            },
            error: function (err) {
                alert(err.statusText);
                thisStatus.isSubmittingImage = false;
            }
        });
        //this.profileService
        //    .uploadimage(image);
        //.subscribe(
        //    data => {
        //        //this.profileImage = URL.createObjectURL(files[0]);
        //        //$("#imagePreview").css('background-image', 'url(' + this.profileImage + ')');
        //    });
    };
    // Function to remove uploaded file
    ProfileComponent.prototype.removeUploadedFile = function () {
        $("#imagePreview").css('background-image', 'url(' + this.profileImagePath + ')');
        this.isProfileImageFormVisisble = false;
        //isProfileImageFormVisisble
        //profileImagePath
    };
    tslib_1.__decorate([
        ViewChild('fileInput'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ProfileComponent.prototype, "el", void 0);
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-profile-page',
            templateUrl: './profile.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, ProfileService,
            XMLToJSON, FormBuilder, NgbModal, ChangeDetectorRef,
            MessageService])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
function patternValidator(regex, error) {
    return function (control) {
        debugger;
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
            else {
                return { tenDigits: true };
            }
        }
        else {
            return null;
        }
    };
}
function alphaNumeric(regex, error, status) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        status.smallLettersToCapitalLetters(control.value);
        // test the value of the control against the regexp supplied
        var valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
//# sourceMappingURL=profile.component.js.map