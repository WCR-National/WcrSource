import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';

@Component({
    selector: 'associate-layout-header',
    templateUrl: './header.component.html'
})   
export class AssociateHeaderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}