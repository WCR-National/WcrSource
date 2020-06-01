import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { CustomerSupportService } from 'AngularAssociate/app/services/associate/customer-support.service';
import { debug } from 'util';



@Component({
    selector: 'associate-customer-support-page',
    templateUrl: './customer-support.component.html',
    styleUrls: ['./customer-support.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerSupportComponent implements OnInit {

    helpDeskForm: FormGroup;
    formError: string;
    message: string;
    isSubmitting: boolean = false;
    isFormVisible: boolean = true;
    responseMessage: string = "";
    isMessageTobeshown: boolean = false;
    ifMessageEmpty: boolean = true;
    //@ViewChild('fileInput') el: ElementRef;

    validationMessages = {
        'message': {
            'required': 'First Name is required',
            'hasHtmlTags': 'Invalid, Data entered.'
        }
    }

    formErrors = {
        'message': ''
    };

    constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerSupportService,
        private xmlToJson: XMLToJSON, private fb: FormBuilder, private modalService: NgbModal, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.setValidationOnForm();

        this.helpDeskForm.get('message').valueChanges.subscribe((data) => {
            debugger;
            if (data == "") {
                this.ifMessageEmpty = true;
            }
            else {
                this.ifMessageEmpty = false;
            }
        });
    }

    setValidationOnForm() {

        this.helpDeskForm = this.fb.group({
            message: ['', [Validators.required, patternValidator(/(<([^>]+)>)/gi, { hasHtmlTags: true })]],
        });

    }

    logValidationErrors(group: FormGroup = this.helpDeskForm): void {

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
                            debugger;
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

    submmitHelpDeskForm() {
        debugger;
        this.isSubmitting = true;

        if (this.helpDeskForm.valid) {
            const credentials = this.helpDeskForm.value;
            this.isSubmitting = true;
            this.customerService
                .submitMessageCustomerSupport(credentials.message)
                .subscribe(
                    data => {
                        if (data.d.length > 0) {
                            this.responseMessage = "Your support issue has been succesfully sent!!!. <br/>A support representative will contact you within 24 - 48 business hours.";
                            this.isFormVisible = false;
                            this.isSubmitting = false;
                            this.isMessageTobeshown = true;
                               
                        }
                        else {
                            this.isMessageTobeshown = true;
                            this.responseMessage = "Something goes wrong. Please Try again.";
                            this.isSubmitting = false;

                        }
                        //on return stat
                    });

        }
        else {
            this.isMessageTobeshown = true;
            this.isSubmitting = false;
        }

    }

    showHideForm() {
        this.isFormVisible = true;
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
        const valid = isHTML(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return !valid ? null : error;
    };
}

function isHTML(str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}
