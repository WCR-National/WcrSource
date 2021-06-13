import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { take } from 'rxjs/operators';
import { UserService } from '../services/auth';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticatedSubject;
    constructor(
        private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private platformLocation: PlatformLocation,
        private ngZone: NgZone
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        debugger;

        if (localStorage.getItem('jwtToken') == null)
        {
            var subject = new Subject<boolean>();
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            //this.router.navigate(['/']);

            subject.next(false);
            return subject.asObservable();
        }
        else if (localStorage.getItem('jwtToken') != null)
        {

            var user: any = JSON.parse(localStorage.getItem('jwtToken'));
            if (user.type == "2")
            {
                var pathName = '';
                var localUrlPath = ((this.platformLocation as any).location.pathname).split('/');
                if (localUrlPath != null && localUrlPath.length == 2)
                {
                    pathName = localUrlPath[1];
                }
                if (pathName == "associates")
                {
                     this.router.navigate(['/consumer-dashboard']);
                }
            }
        }
        return this.userService.isAuthenticated.pipe(take(1));
    }
}
