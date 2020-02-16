import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { UserService } from '../services/auth';
import { map, take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        if (localStorage.getItem('jwtToken') != null) {
            var subject = new Subject<boolean>();
            subject.next(false);
            this.router.navigate(['associate']);
            return subject.asObservable();
        }
        return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

    }
}
