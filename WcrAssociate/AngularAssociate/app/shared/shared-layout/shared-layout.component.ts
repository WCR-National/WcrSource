import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';

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
