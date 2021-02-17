import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../app/services/authentication/authentication.service';
import { UserService } from '../services/auth';
import { User } from '../entities/user';


export function appInitializer(userService: UserService) {

    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        user: User;
        if (localStorage.getItem('jwtToken'))
        {
            var user: any = JSON.parse(localStorage.getItem('jwtToken'));
            if (user.type == "1") { //associate
                var credentials: any = {};
                credentials.email = user.email;

                this.userService.associateLoginSessionActivate("", credentials, user.id)
                    .then((data: any) => {
                        debugger;
                        if (data.d == "1") {
                            user.token = this.token();
                            user.email = credentials.email;
                            user.id = user.id;
                            user.type = "1";
                            userService.setAuth(this.user);
                        }
                        else {
                            this.userService.purgeAuth();
                        }
                    });
            }
            else if (user.type == "2") {
                debugger;

                var credentials: any = {};
                credentials.email = user.email;
                this.userService.consumerLoginSessionActivate("", credentials, user.id)
                    .then((data: any) => {
                        if (data.d == "1") {
                            user.token = this.token();
                            user.email = credentials.email;
                            user.id = user.id;
                            user.type = "2";
                            userService.setAuth(this.user);
                        }
                        else {
                            this.userService.purgeAuth();
                        }
                    });
            }
        }
        else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
            //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
            //this.ngZone.run(() => this.router.navigate([url]));
        }
    });
}