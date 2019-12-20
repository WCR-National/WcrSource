import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';


import { HomeService } from '../../services/home/home.service';
import { User } from '../../entities/user';
import { AlertService, AuthenticationService } from '../../services/authentication';
import { UserService } from '../../services/authentication/user.service';
import { HomeComponent } from '../../components/home/home.component';


@Component({ selector: 'app-header', templateUrl: 'header.component.html'})
export class HeaderComponent implements OnInit {
    ngOnInit() { }
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    IsLoggedIn: Boolean = false;

    @Input() isOnLogin: Boolean = true;
    @Input() isOnRegister: Boolean = true;
    @Input() displayBlock = 'block';
    @Input() displayNone = 'none';



    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        //if (this.currentUser != undefined) {
        //    this.IsLoggedIn = true;
        //}
        //else {
        //    this.IsLoggedIn = false;
        //}
    }

    OnLoginEvent() {
        debugger;
        alert('found');
        if (this.isOnLogin) {
            this.displayBlock = 'block';
            this.isOnLogin = false;
        }
        else {
            this.displayNone = 'none';
            this.isOnLogin = true;
        }
    }

    OnRegisterEvent() {
        debugger;
        alert('found');
        if (this.isOnRegister) {
            this.displayBlock = 'block';
            this.isOnRegister = false;
        }
        else {
            this.displayNone = 'none';
            this.isOnRegister = true;
        }
    }

    increment() {
        alert('found');
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
}
