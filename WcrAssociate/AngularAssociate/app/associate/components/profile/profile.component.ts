import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'associate-profile-page',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    email: string;
    Password: string;
    LicenseNumber: string;
    IssuingState: string;
    profileImage: string;
    isFormVisible: boolean = true;
    profileForm: FormGroup;
    formError: string;
    isSubmitting: boolean = false;
    showErrorsPassword: boolean = false;

    validationMessages = {
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
            'required': 'Last Name is required',
            'alphaNumeric': 'Allowed alphanumeric only.'
        },
        'licenseState': {
            'required': 'Last Name is required',
            'letterOnly': 'Allowed alphabeticals letters only.'
        },
        'phoneNo': {
            'required': 'Last Name is required',
            'tenDigits': 'Allowed 10 digits for mobile no.',
            'elevenDigits': 'Allowed 11 digits, if first letter is starts with 1'
        }
    }
    formErrors = {
        'firstName': '',
        'lastName': '',
        'password': '',
        'phoneNo': '',
        'licenseId': '',
        'licenseState': ''
    };
    closeResult: string;

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService,
        private xmlToJson: XMLToJSON, private fb: FormBuilder, private modalService: NgbModal) { }

    ngOnInit() {
        this.getUserDetails();
        this.setValidationOnForm();

    }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    getUserDetails() {
        let thisStatus: any = this;
        this.profileService
            .getUserDetails()
            .subscribe(
                data => {
                    if (data.d.length > 0) {
                        var xmlDoc = $.parseXML(data.d);
                        var xml = $(xmlDoc);
                        var docs = xml.find("ViewAssociateBasicDetail");
                        $.each(docs, function (i, docs) {

                            var pic = '';
                            if ($(docs).find("Photo").text() != null || $(docs).find("Photo").text() == "") {
                                let image: string = $(docs).find('Photo').text();
                                pic = '../AssociatePhoto/' + image + '';
                            }
                            else {
                                pic = '../AssociatePhoto/0.png';
                            }
                            $("#imagePreview").css('background-image', 'url(' + pic + ')');

                            //thisStatus.profileImage = pic;

                            debugger;
                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                                thisStatus.isFormVisible = true;
                                thisStatus.profileForm.get('email').setValue($(docs).find("Email").text());
                                thisStatus.profileForm.get('password').setValue($(docs).find("Password").text());
                                return;
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
    }

    setValidationOnForm() {

        this.profileForm = this.fb.group({
            email: [''],
            firstName: ['', Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })],
            lastName: ['', Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })],
            licenseState: ['', Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })],
            phoneNo: ['', Validators.required, phoneValidator(/\d{10}/, { elevenDigits: true })],
            licenseId: ['', Validators.required, alphaNumeric(/[a-zA-Z0-9]+$/, { alphaNumeric: true }, this)],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
            patternValidator(/\d/, { number: true }),
            patternValidator(/[A-Z]/, { upperLetter: true }),
            patternValidator(/[a-z]/, { lowerLetter: true }),
            patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
            ]]
        });
    }

    logValidationErrors(group: FormGroup = this.profileForm): void {

        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            this.formErrors[key] = '';

            if (abstractControl && !abstractControl.valid
                && (abstractControl.touched || abstractControl.dirty)) {
                this.formErrors[key] = "";
                const messages = this.validationMessages[key];
                if (abstractControl.errors != null) {
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages[errorKey] !== undefined) {
                                this.formErrors[key] += messages[errorKey] + ' ';
                            }
                        }
                    }
                }
            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);
            }
        });
    }

    submitProfileForm() {
        const credentials = this.profileForm.value;

        this.abbrState(credentials.licenseState , 'to');
        this.isSubmitting = true;
        this.profileService
            .updateProfileinfo(credentials.firstName, credentials.lastName, credentials.phoneNo, credentials.email, credentials.password, credentials.licenseId, credentials.licenseState)
            .subscribe(
                data => {
                    if (data.d == "1") {
                        this.getUserDetails();
                        //hide the form and show the text only
                        //set the sidebar values
                        this.isFormVisible = false;
                        this.isSubmitting = false;

                    }
                    if (data.d == "0") {
                        this.formError = "Unsuccessfull!!! <br>This Email Id or User name or Mobile No Already Exists! Please Try another one.";
                    }
                    if (data.d == "-1") {
                        this.formError = "Unsuccessfull!!! <br>This Email Id or User name or Mobile No Already Exists! Please Try another one.";
                        //$('#fail_message').modal('show');
                    }
                    //on return stat
                });
    }

    submitImage() {
        var fileUpload: any = $("#profileImageId").get(0);
        var files = fileUpload.files;
        //image resize code here
        var image: any = new FormData();
        for (var i = 0; i < files.length; i++) {
            image.append(files[i].name, files[i]);
        }

        this.profileService
            .uploadimage(image)
            .subscribe(
                data => {
                    this.profileImage = URL.createObjectURL(files[0]);
                    $("#imagePreview").css('background-image', 'url(' + this.profileImage + ')');

                    this.formError = "Your profile has been updated Successfully.";
                });

    }

    cancelForm() {
        this.isFormVisible = false;
    }

    showErrors() {
        this.showErrorsPassword = true;
    }

    hideErrors() {
        this.showErrorsPassword = false;

    }

    smallLettersToCapitalLetters(value) {
        value.toUpperCase();
    }

    abbrState(input, to) {

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
            for (let i = 0; i < states.length; i++) {
                if (states[i][0] == input) {
                    return (states[i][1]);
                }
            }
        } else if (to == 'name') {
            input = input.toUpperCase();
            for (let i = 0; i < states.length; i++) {
                if (states[i][1] == input) {
                    return (states[i][0]);
                }
            }
        }
    }

    editForm() {
        this.isFormVisible = true;
    }

}

function patternValidator(regex: RegExp, error: ValidationErrors) {
    return (control: AbstractControl): { [key: string]: any } => {
        debugger;
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        const valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}

function StateValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        const valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}



function phoneValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
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

function alphaNumeric(regex: RegExp, error: ValidationErrors, status): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        status.smallLettersToCapitalLetters(control.value);
        // test the value of the control against the regexp supplied
        const valid = regex.test(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}


