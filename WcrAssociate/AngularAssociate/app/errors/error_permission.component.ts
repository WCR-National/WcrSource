import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../services/authentication/auth.service';
import { UserService } from '../services/users/user.service';
import { DOM } from '../lib/dom-init';

@Component({
  selector: 'error-permission-area',
  templateUrl: './error_permission.component.html'
})

export class ErrorPermissionComponent {

  constructor(
    private location: Location,
    private authsvc: AuthService,
    private router: Router,
    private usersvc: UserService,
    private dom: DOM) { }

  doLogout() {
    this.authsvc.logout();
    this.router.navigate(['login']);
    this.dom.applyClass('body', 'dark-body');
  }

  goBack() {
    // We need to reload the permissions
    window.location.href = this.usersvc.goBack('/dashboard');
  }

}
