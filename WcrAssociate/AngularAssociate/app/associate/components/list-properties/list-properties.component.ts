import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';
import { ProfileService } from 'AngularAssociate/app/services/associate/Profile.service';
import * as $ from 'jquery';


@Component({
    selector: 'list-properties',
    templateUrl: './list-properties.component.html'
})
export class ListPropertiesComponent implements OnInit {


    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService, private ngZone: NgZone) { }

    ngOnInit() {
    }

}    