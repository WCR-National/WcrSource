import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';

import { UserService } from '../../services/auth';
import { User } from '../../entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from 'AngularAssociate/app/components/home/home.component';
import { MessageService } from 'AngularAssociate/app/services/search';

import { debug } from 'util';
import * as $ from 'jquery';

@Component({
    selector: 'associate-layout',
    templateUrl: './associate-layout.component.html',
    styleUrls: ['./associate-layout.component.css'],
    encapsulation: ViewEncapsulation.None


})
export class AssociateLayoutComponent implements OnInit {


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


        //const psSidebarBody = new PerfectScrollbar('#dpSidebarBody', {
        //    suppressScrollX: true
        //});

        $('.nav-sidebar .with-sub').on('click', function (e) {
            e.preventDefault()

            $(this).parent().toggleClass('show');
            $(this).parent().siblings().removeClass('show');

            //psSidebarBody.update();
        });

        $('.burger-menu:first-child').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('toggle-sidebar');
        });

        $('.header-search .form-control').on('focusin', function (e) {
            $(this).parent().addClass('active');
        });

        $('.header-search .form-control').on('focusout', function (e) {
            $(this).parent().removeClass('active');
        });

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
