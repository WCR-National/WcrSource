import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
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



@Component({
    selector: 'associate-profile-page',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    FirstName:   string;
    LastName:       string;
    PhoneNumber:     string;
    email:          string;
    Password:       string;
    LicenseNumber:   string;
    IssuingState:   string;
    profileImage: string;
    isFormVisible: boolean = true;
    profileForm: FormGroup;
    formError: string;

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
    }
    formErrors = {
        'firstName': '',
        'lastName': '',
        'password': '',
        'phoneNo': '',
        'licenseId': '',
        'licenseState': ''
    };

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService,
        private xmlToJson: XMLToJSON, private fb: FormBuilder) { }

    ngOnInit() {

        this.setValidationOnForm();
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
    }

    setValidationOnForm() {

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
        this.profileService
            .getUserDetails()
            .subscribe(
                data => {
                    if (data.d == "1") {
                        this.isFormVisible = false;
                        this.getUserDetails();
                        //hide the form and show the text only
                        //set the sidebar values
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
                    this.formError = "Your profile has been updated Successfully.";
                });
        
    }

    cancelForm() {
        this.isFormVisible = false;
    }
}

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
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
