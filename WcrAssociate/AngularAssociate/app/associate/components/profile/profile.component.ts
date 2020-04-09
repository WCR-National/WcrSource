import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { MessageService } from 'AngularAssociate/app/services/search';



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
    isProfileFormVisible: boolean = false;
    profileImagePath:string = "";
    isProfileImageFormVisisble = false;
    isHideInformation = true;

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
    @ViewChild('fileInput') el: ElementRef;
    imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    editFile: boolean = false;
    removeUpload: boolean = false;
    closeResult: string;

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService,
        private xmlToJson: XMLToJSON, private fb: FormBuilder, private modalService: NgbModal, private cd: ChangeDetectorRef,
        private _messageService: MessageService,) { }

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

    showHideProfileImage() {
        this.isProfileFormVisible = true;
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
                            thisStatus.profileImagePath = pic;

                            //thisStatus.profileImage = pic;

                            debugger;
                            if ($(docs).find("FullName").text() == '' || $(docs).find("MobileNo").text() == '' || $(docs).find("Photo").text() == '') {
                                thisStatus.isFormVisible = true;
                                thisStatus.profileForm.get('email').setValue($(docs).find("Email").text());
                                thisStatus.profileForm.get('password').setValue($(docs).find("Password").text());
                                thisStatus._messageService.filter('disable');
                                thisStatus.isHideInformation = true;
                            }
                            else {
                                thisStatus._messageService.filter('enable');
                                thisStatus.isHideInformation = false;

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
    }

    setValidationOnForm() {

        this.profileForm = this.fb.group({
            email: [''],
            firstName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            lastName: ['', [Validators.required, patternValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            licenseState: ['', [Validators.required, StateValidator(/^[a-zA-Z]+$/, { letterOnly: true })]],
            phoneNo: ['', [Validators.required, phoneValidator(/\d{10}/, { elevenDigits: true })]],
            licenseId: ['', [Validators.required, alphaNumeric(/[a-zA-Z0-9]+$/, { alphaNumeric: true }, this)]],
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

    editForm() {
        this.isFormVisible = true;
    }

    cancelForm() {
        debugger;
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


    uploadFile(event) {
        this.isProfileImageFormVisisble = true;
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);

            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.imageUrl = reader.result;
                $("#imagePreview").css('background-image', 'url(' + this.imageUrl + ')');

            }
            // ChangeDetectorRef since file is loading outside the zone
            this.cd.markForCheck();
        }
    }

    UploadToServer() {
        var fileUpload: any = $("#profileImageId").get(0);
        var files = fileUpload.files;
        //image resize code here
        var image: any = new FormData();
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
                this.isProfileImageFormVisisble = false;
            },
            error: function (err) {
                alert(err.statusText);
            }
        });

        //this.profileService
        //    .uploadimage(image);
            //.subscribe(
            //    data => {
            //        //this.profileImage = URL.createObjectURL(files[0]);
            //        //$("#imagePreview").css('background-image', 'url(' + this.profileImage + ')');

            //    });

    }
    // Function to remove uploaded file
    removeUploadedFile() {
        $("#imagePreview").css('background-image', 'url(' + this.profileImagePath + ')');

        this.isProfileImageFormVisisble = false;
        //isProfileImageFormVisisble
        //profileImagePath
    }
}

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
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


