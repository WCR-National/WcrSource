import { Component, OnInit, Optional, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, encrypt_decrypt } from '../../../services/auth';
import { Errors } from '../../../entities/errors.model';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { environment } from 'AngularAssociate/environments/environment';
import { Observable, of } from 'rxjs';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PaymentService } from 'AngularAssociate/app/services/associate/payment.service';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


import * as $ from 'jquery';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'associate-confiramtion-modal-page',
    templateUrl: './confirmation-modal.component.html'
})

export class ConfirmationModalComponent implements OnInit {

    isSubmitting: boolean = false;
    isCreditCardFormVisible: boolean = false;


    @Output() dismissConfirmationEvent: EventEmitter<any> = new EventEmitter();
    @Output() CancelConfirmationEvent: EventEmitter<any> = new EventEmitter();


    constructor(private route: ActivatedRoute, private router: Router, private paymentService: PaymentService, private xmlToJson: XMLToJSON,
        private fb: FormBuilder, @Optional() private activeModal: NgbActiveModal, private toaster: Toaster) {

    }

    ngOnInit() {



    }

    public dismissConfirmation(): void
    {
        if (this.activeModal)
        {
            this.activeModal.dismiss();
            this.dismissConfirmationEvent.emit('cancelDeclined');
        }
    }


    public CancelConfirmation(): void
    {
        if (this.activeModal)
        {
            this.activeModal.dismiss();
            this.CancelConfirmationEvent.emit('cancelConfirmed');
        }
    }

}