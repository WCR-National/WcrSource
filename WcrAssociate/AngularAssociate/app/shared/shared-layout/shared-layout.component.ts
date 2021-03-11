import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { MessageService } from 'AngularAssociate/app/services/search';
import { filter } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
    selector: 'app-shared-layout',
    templateUrl: './shared-layout.component.html',
    styleUrls: ['./shared-layout.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class SharedLayoutComponent implements OnInit {


    constructor(private route: ActivatedRoute, private router: Router, private _messageService: MessageService,
        private userService: UserService
    ) { }

    currentUser: User;
    routerSubscription: any;
    location: any;

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        );
       
    }

    onClickGetAds() {
        this._messageService.filter('Register click');
    }

    onClickLogout() {
        this.userService
            .attemptLogout()
            .subscribe(
                data => {
                    if (data == "0") {
                        this.router.navigateByUrl('/home');
                    }
                    else {
                        alert("OOPS Something goes wrong !");
                    }
                },
                err => {
                    alert("OOPS Something goes wrong !");
                }
            );

    }


}
