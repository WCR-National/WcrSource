import { Component, OnInit, Optional, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLToJSON } from 'AngularAssociate/app/_helpers/xml-to-json';
import { PaymentService } from '../../associate-service/payment.service';
import { Toaster } from "ngx-toast-notifications";
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

    @Input() dataToTakeAsInputForZipCode: any;

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