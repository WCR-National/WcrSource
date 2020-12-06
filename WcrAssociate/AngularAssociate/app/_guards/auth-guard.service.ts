import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { take } from 'rxjs/operators';
import { UserService } from '../services/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticatedSubject;
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        if (localStorage.getItem('jwtToken') == null)
        {
            var subject = new Subject<boolean>();
            //this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            this.router.navigate(['/']);

            subject.next(false);
            return subject.asObservable();
        }

        return this.userService.isAuthenticated.pipe(take(1));
    }
}
