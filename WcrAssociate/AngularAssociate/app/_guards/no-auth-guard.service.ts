import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, Subject, ReplaySubject, of as observableOf, of, BehaviorSubject } from 'rxjs';

import { UserService } from '../services/auth';
import { map, take, catchError } from 'rxjs/operators';
import { User } from '../entities/user';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class NoAuthGuard implements CanActivate {

    AuthenticatedAssociateStatus: boolean;
    AuthenticatedConsumerStatus: boolean;
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    private userData: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private platformLocation: PlatformLocation,
        private ngZone: NgZone
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

        // var subject = new BehaviorSubject<boolean>();
        //this.userService.currentUser.pipe(
        //     map((val) => {

        //this.userService.isAuthenticatedAssociate.subscribe(function (data) {
        //    this.AuthenticatedAssociateStatus = data;
        //    if (data) {
        //        this.isAuthenticatedSubject.next(this.AuthenticatedAssociateStatus);
        //        this.router.navigate(['/associates']);
        //        return this.isAuthenticated.pipe(take(1));
        //    }
        //    else {

        //        this.userService.isAuthenticatedConsumer.subscribe(function (data) {
        //            this.AuthenticatedConsumerStatus = data;
        //            if (data) {
        //                this.isAuthenticatedSubject.next(this.AuthenticatedConsumerStatus);
        //                this.router.navigate(['/consumer-dashboard']);
        //                return this.isAuthenticated.pipe(take(1));
        //            }
        //            else {
        //                return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        //            }
        //        });
        //    }
        //});

        //return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));



        this.userService.isAuthenticatedAssociate.subscribe((val => (this.AuthenticatedAssociateStatus) = val))
        this.userService.isAuthenticatedConsumer.subscribe((val => (this.AuthenticatedConsumerStatus) = val))
        this.userService.currentUser.subscribe(val => (this.userData) = val);
        if (this.AuthenticatedAssociateStatus) {
            this.isAuthenticatedSubject.next(this.AuthenticatedAssociateStatus);
            this.router.navigate(['/associates']);
            return this.isAuthenticated.pipe(take(1));
        }
        else if (this.AuthenticatedConsumerStatus) {
            this.isAuthenticatedSubject.next(this.AuthenticatedConsumerStatus);
            this.router.navigate(['/consumer-dashboard']);
            return this.isAuthenticated.pipe(take(1));
        }
        else {
            return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        }


        //debugger;
        //if (this.userService.isAuthenticatedAssociate == of(true)) {
        //    this.userService.isAuthenticatedAssociate.subscribe(val => this.AuthenticatedStatus = val);
        //    this.isAuthenticatedSubject.next(this.AuthenticatedStatus);
        //    //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
        //    this.router.navigate(['/associates']);
        //    return this.isAuthenticated.pipe(take(1), map(isAuth => !isAuth))

        //}

        //if (this.userService.isAuthenticatedConsumer == of(true)) {
        //    this.userService.isAuthenticatedConsumer.subscribe(val => this.AuthenticatedStatus = val);
        //    this.isAuthenticatedSubject.next(this.AuthenticatedStatus);
        //    this.router.navigate(['/consumer-dashboard']);

        //    return this.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        //}
        //else {
        //    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        //}

        //    }),
        //    catchError(error => of(true))
        //);
        //return subject.asObservable().first();



        //if (localStorage.getItem('jwtToken') != null) {
        //    var subject = new Subject<boolean>();
        //    subject.next(false);
        //    if (this.userService.isAuthenticatedAssociate == of(true))
        //    {
        //        this.isAuthenticatedSubject.next(this.AuthenticatedStatus);
        //        let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
        //        this.router.navigate(['/associates']);
        //        return this.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        //    }
        //    if (this.userService.isAuthenticatedConsumer == of(true))
        //    {
        //        this.isAuthenticatedSubject.next(this.AuthenticatedStatus);
        //        this.router.navigate(['/consumer-dashboard']);
        //        return this.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
        //    }

        //    this.userService.isAuthenticatedConsumer.subscribe(val => this.AuthenticatedStatus = val);
        //    return subject.asObservable();
        //}
        //this.userService.isAuthenticatedAssociate.subscribe(val => this.AuthenticatedStatus = val);
        //this.isAuthenticatedSubject.next(this.AuthenticatedStatus);
        //this.userService.isAuthenticatedConsumer.subscribe(val => this.AuthenticatedStatus = val);
        //this.isAuthenticatedSubject.next(this.AuthenticatedStatus);
        //return this.isAuthenticatedSubject.pipe(take(1), map(isAuth => !isAuth));

    }
}
