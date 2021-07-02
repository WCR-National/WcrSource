import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject, of as observableOf } from 'rxjs';
import { map, distinctUntilChanged, delay, take } from 'rxjs/operators';
import { UserService } from '../services/auth';
import { PlatformLocation } from '@angular/common';
import { User } from '../entities/user';

@Injectable()
export class AuthGuard implements CanActivate  {

    AuthenticatedAssociateStatus: boolean;
    AuthenticatedConsumerStatus: boolean;
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    userData: User;


    returnUrl: string;
    constructor(
        private router: Router,
        private userService: UserService,
        private platformLocation: PlatformLocation,

    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        debugger;
        return this.isAuthenticatedUser(route, state);
    }

    canLoad (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.isAuthenticatedUser(route, state);
    }

    isAuthenticatedUser(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        

        // Check if the user is authenticated
        //this.userService.isAuthenticatedAssociate.subscribe(function (data) {
        //    this.AuthenticatedAssociateStatus = data;
        //});
        //this.userService.isAuthenticatedAssociate.subscribe(function (data) {
        //    this.AuthenticatedConsumerStatus = data;
        //});

        debugger;
        this.userService.isAuthenticatedAssociate.subscribe((val => (this.AuthenticatedAssociateStatus) = val))
        this.userService.isAuthenticatedConsumer.subscribe((val => (this.AuthenticatedConsumerStatus) = val))
        this.userService.currentUser.subscribe(val => (this.userData) = val);
        if (this.AuthenticatedAssociateStatus) {
            this.isAuthenticatedSubject.next(this.AuthenticatedAssociateStatus);
            var pathName = '';
            var localUrlPath = ((this.platformLocation as any).location.pathname).split('/');
            if (localUrlPath != null && localUrlPath.length == 2) {
                pathName = localUrlPath[1];
            }
            if (pathName == "consumer-dashboard") {
                this.router.navigate(['associates']);
            }
            return this.isAuthenticated.pipe(take(1));
        }
        else if (this.AuthenticatedConsumerStatus) {

            this.isAuthenticatedSubject.next(this.AuthenticatedConsumerStatus);
            var pathName = '';
            var localUrlPath = ((this.platformLocation as any).location.pathname).split('/');
            if (localUrlPath != null && localUrlPath.length == 2) {
                pathName = localUrlPath[1];
            }
            if (pathName == "associates") {
                this.router.navigate(['/consumer-dashboard']);
            }
            return this.isAuthenticated.pipe(take(1));
        }
        else {
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return this.userService.isAuthenticated.pipe(take(1));
        }

        //var isAuthenticated = false;

        //// Check if the user is authenticated
        //this.userService.isAuthenticated.take(1).subscribe(function (data) {
        //    isAuthenticated = data;
        //});

        //// If the user is not authenticated, redirect to Login page
        //if (!isAuthenticated) {
        //    this.router.navigateByUrl('/login');
        //}

        //return this.userService.isAuthenticated.take(1);

        //if (localStorage.getItem('jwtToken') == null) {
        //    var subject = new Subject<boolean>();
        //    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        //    //this.router.navigate(['/']);

        //    subject.next(false);
        //    return subject.asObservable();
        //}
        //else if (localStorage.getItem('jwtToken') != null) {

        //    var user: any = JSON.parse(localStorage.getItem('jwtToken'));
        //    if (user.type == "2") {
        //        var pathName = '';
        //        var localUrlPath = ((this.platformLocation as any).location.pathname).split('/');
        //        if (localUrlPath != null && localUrlPath.length == 2) {
        //            pathName = localUrlPath[1];
        //        }
        //        if (pathName == "associates") {
        //            this.router.navigate(['/consumer-dashboard']);
        //        }
        //    }
        //}
        //return this.userService.isAuthenticated.pipe(take(1));
    }
}
