import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { ProfileService } from '../../associate-service/Profile.service';
import * as $ from 'jquery';


@Component({
    selector: 'billing-history',
    templateUrl: './billing-history.component.html'
})
export class BillingHistoryComponent implements OnInit {

    isProfile: boolean = false;
    isDashboard: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService, private ngZone: NgZone) { }

    ngOnInit() {

    }
}    