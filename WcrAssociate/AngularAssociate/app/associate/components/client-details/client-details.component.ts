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
import { ClientDetailsService } from 'AngularAssociate/app/services/associate/client-details.service';



@Component({
    selector: 'associate-client-details-page',
    templateUrl: './client-details.component.html'
})
export class ClientDetailsComponent implements OnInit {

    interestedCustomers: string = '';
    selectedCategories: string = '';
    myPropertyListings: string = '';
    constructor(private route: ActivatedRoute, private router: Router, private dashboardService: ClientDetailsService, private xmlToJson: XMLToJSON) {

    }

    ngOnInit() {
        this.getServicesCount();

        this.getSalesCount();

        this.getTotalSalesAndServicesCount();


        this.getClientDetailsSalesData();

        this.getClientDetailsServicesData();

        //this.deleteCustomerRecords();
    }

    getServicesCount() {

    }

    getSalesCount() {

    }
    
    getTotalSalesAndServicesCount() {

    }


    getClientDetailsSalesData() {

    }

    getClientDetailsServicesData() {

    }

    deleteCustomerRecords() {

    }


}