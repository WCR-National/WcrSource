import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';

@Component({
    selector: 'associate-layout-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    isProfile: boolean = false;
    isDashboard: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit() {
        if (location.origin.includes("profile")) {
            this.isProfile = true;
            this.isDashboard = false;
        }
        else {
            this.isProfile = false;
            this.isDashboard = true;
        }
    }

    logout() {
        this.userService
            .associateLogout()
            .subscribe(
                data => {
                    if (data == "0") {
                        this.userService.purgeAuth();
                        this.router.navigateByUrl('/associates' , );       

                    }
                },
                err => {
                    alert('Something wrong');
                }
        );
    }
}    