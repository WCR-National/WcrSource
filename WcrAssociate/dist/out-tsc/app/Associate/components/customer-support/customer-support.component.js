import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerSupportService } from 'AngularAssociate/app/services/associate/customer-support.service';
var CustomerSupportComponent = /** @class */ (function () {
    function CustomerSupportComponent(route, router, customerService, xmlToJson, fb, modalService, cd) {
        this.route = route;
        this.router = router;
        this.customerService = customerService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.modalService = modalService;
        this.cd = cd;
        this.isSubmitting = false;
        this.isFormVisible = true;
        this.responseMessage = "";
        this.isMessageTobeshown = false;
        this.ifMessageEmpty = true;
        //@ViewChild('fileInput') el: ElementRef;
        this.validationMessages = {
            'message': {
                'required': 'First Name is required',
                'hasHtmlTags': 'Invalid, Data entered.'
            }
        };
        this.formErrors = {
            'message': ''
        };
    }
    CustomerSupportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setValidationOnForm();
        this.helpDeskForm.get('message').valueChanges.subscribe(function (data) {
            if (data == "") {
                _this.ifMessageEmpty = true;
            }
            else {
                _this.ifMessageEmpty = false;
            }
        });
    };
    CustomerSupportComponent.prototype.setValidationOnForm = function () {
        this.helpDeskForm = this.fb.group({
            message: ['', [Validators.required, patternValidator(/(<([^>]+)>)/gi, { hasHtmlTags: true })]],
        });
    };
    CustomerSupportComponent.prototype.logValidationErrors = function (group) {
        var _this = this;
        if (group === void 0) { group = this.helpDeskForm; }
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
    CustomerSupportComponent.prototype.submmitHelpDeskForm = function () {
        var _this = this;
        this.isSubmitting = true;
        if (this.helpDeskForm.valid) {
            var credentials = this.helpDeskForm.value;
            this.isSubmitting = true;
            this.customerService
                .submitMessageCustomerSupport(credentials.message)
                .subscribe(function (data) {
                if (data.d.length > 0) {
                    _this.responseMessage = "Your support issue has been succesfully sent!!!. <br/>A support representative will contact you within 24 - 48 business hours.";
                    _this.isFormVisible = false;
                    _this.isSubmitting = false;
                    _this.isMessageTobeshown = true;
                }
                else {
                    _this.isMessageTobeshown = true;
                    _this.responseMessage = "Something goes wrong. Please Try again.";
                    _this.isSubmitting = false;
                }
                //on return stat
            });
        }
        else {
            this.isMessageTobeshown = true;
            this.isSubmitting = false;
        }
    };
    CustomerSupportComponent.prototype.showHideForm = function () {
        this.isFormVisible = true;
    };
    var _a, _b, _c, _d, _e;
    CustomerSupportComponent = __decorate([
        Component({
            selector: 'associate-customer-support-page',
            templateUrl: './customer-support.component.html',
            styleUrls: ['./customer-support.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _a : Object, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object, CustomerSupportService,
            XMLToJSON, typeof (_c = typeof FormBuilder !== "undefined" && FormBuilder) === "function" ? _c : Object, typeof (_d = typeof NgbModal !== "undefined" && NgbModal) === "function" ? _d : Object, typeof (_e = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _e : Object])
    ], CustomerSupportComponent);
    return CustomerSupportComponent;
}());
export { CustomerSupportComponent };
function patternValidator(regex, error) {
    return function (control) {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }
        // test the value of the control against the regexp supplied
        var valid = isHTML(control.value);
        // if true, return no error (no error), else return error passed in the second parameter
        return !valid ? null : error;
    };
}
function isHTML(str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(function (node) { return node.nodeType === 1; });
}
//# sourceMappingURL=customer-support.component.js.map