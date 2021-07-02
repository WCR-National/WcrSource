import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-terms-modal',
    templateUrl: './terms-modal.component.html'
})
export class TermsModalComponent implements OnInit {

    @Output() dismissParentCall: EventEmitter<any> = new EventEmitter();
    constructor(private route: ActivatedRoute, @Optional() private activeModal: NgbActiveModal) { }

    ngOnInit() {

    }

    public dismiss(): void {
        if (this.activeModal) {
            this.activeModal.dismiss();
            this.dismissParentCall.emit('cancel');
        }
    }
}