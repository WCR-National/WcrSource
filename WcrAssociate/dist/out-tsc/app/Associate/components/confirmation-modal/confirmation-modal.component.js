import * as tslib_1 from "tslib";
import { Component, Optional, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { Toaster } from "ngx-toast-notifications";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var ConfirmationModalComponent = /** @class */ (function () {
    function ConfirmationModalComponent(route, router, paymentService, xmlToJson, fb, activeModal, toaster) {
        this.route = route;
        this.router = router;
        this.paymentService = paymentService;
        this.xmlToJson = xmlToJson;
        this.fb = fb;
        this.activeModal = activeModal;
        this.toaster = toaster;
        this.isSubmitting = false;
        this.isCreditCardFormVisible = false;
        this.dismissParentCall = new EventEmitter();
        this.updateParentCall = new EventEmitter();
    }
    ConfirmationModalComponent.prototype.ngOnInit = function () {
    };
    ConfirmationModalComponent.prototype.dismissConfirmation = function () {
        if (this.activeModal) {
            this.activeModal.dismiss();
            this.dismissParentCall.emit('cancelDeclined');
        }
    };
    ConfirmationModalComponent.prototype.CancelConfirmation = function () {
        if (this.activeModal) {
            this.activeModal.dismiss();
            this.updateParentCall.emit('cancelConfirmed');
        }
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ConfirmationModalComponent.prototype, "dismissParentCall", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ConfirmationModalComponent.prototype, "updateParentCall", void 0);
    ConfirmationModalComponent = tslib_1.__decorate([
        Component({
            selector: 'associate-confiramtion-modal-page',
            templateUrl: './confirmation-modal.component.html'
        }),
        tslib_1.__param(5, Optional()),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, PaymentService, XMLToJSON,
            FormBuilder, NgbActiveModal, Toaster])
    ], ConfirmationModalComponent);
    return ConfirmationModalComponent;
}());
export { ConfirmationModalComponent };
//# sourceMappingURL=confirmation-modal.component.js.map