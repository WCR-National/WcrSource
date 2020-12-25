//import { Injectable } from '@angular/core';
//import {
//  CanActivate,
//  CanActivateChild,
//  Router,
//  ActivatedRouteSnapshot,
//  RouterStateSnapshot
//} from '@angular/router';
//import { UserService } from '../users/user.service';
//import { environment } from '../../../environments/environment';
//import { AuthService } from './auth.service';
//import { PageLevelService } from '../generic/page_level.service';
//import { EntityService } from '../generic/entity.service';
//import { EntityType } from '../../entities/entity/entity_type';
////import { DOM } from '../../lib/dom-init';
//@Injectable()
//export class AuthGuard implements CanActivate, CanActivateChild {
//  //private dom: DOM = new DOM();
//  constructor(
//    private usersvc: UserService,
//    private router: Router,
//    private entitysvc : EntityService,
//    private authsvc: AuthService,
//    private pagelevelsvc: PageLevelService) { }
//  canActivate() {
//    // if (!this.usersvc.pingHome()) {
//    //   this.router.navigate(['/maintenance']);
//    //   return false;
//    // }
//    if (!this.authsvc.authenticated()) {
//      this.router.navigate(['/login']);
//      return false;
//    }
//    let usr = this.usersvc.getContextInfoSync();
//    if (usr == null) {
//      this.router.navigate(['/login']);
//      return false;
//    }
//    if (!usr.isRegistered) {
//      this.authsvc.getProfile();
//      this.router.navigate(['/notvalidlogin']);
//      return false;
//    }
//    let t = sessionStorage.getItem("termsIgnored");
//    if (window.location.pathname != '/' && window.location.pathname.indexOf('accepttermsandconditions') == -1 && usr.termsAndConditions.length > 0 && !t) {
//      window.location.href = window.location.origin + '/accepttermsandconditions';
//      return false;
//    }
//    return true;
//  }
//  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//    this.usersvc.setUrl(state.url);
//    if (environment.type === 'DEV' || this.usersvc.isSysAdmin()) console.log(state.url)
//    return this.checkPermissions(route, state);
//  }
//  private checkPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//    let allow;
//    if (state.url.indexOf("?") != -1 &&
//      state.url.indexOf("tourmyapp") != -1 &&
//      state.url.indexOf("tourmyapp_force") != -1 &&
//      state.url.indexOf("tourmyapp_username") != -1) {
//      allow = this.usersvc.hasPermission(state.url.substring(0, state.url.indexOf("?")));
//    } else {
//      allow = this.usersvc.hasPermission(state.url);
//    }
//    // ADD THE REQUIRED DATA - this.route.snapshot.data
//    //WARNING:TODO - this is for leaseholders
//    if (!allow && new RegExp('^\/?block\/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\/dashboard\/?$').test(state.url)) {
//      this.router.navigate([state.url.replace('dashboard', 'unitslist')]);
//    } else if (!allow && new RegExp('^\/?estate\/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\/dashboard\/?$').test(state.url)) {
//      this.router.navigate([state.url.replace('dashboard', 'info')]);
//    } else if (!allow && new RegExp('^\/?dashboard\/?$').test(state.url)) {
//      let r = this.usersvc.getCurrentRole()
//      if (r.blockId) {
//        this.router.navigate(['/block/', r.blockId]);
//      } else if (r.estateId) {
//        this.router.navigate(['/estate/', r.estateId]);
//      } else if (r.companyId) {
//        this.entitysvc.buildLinkForEntity(r.companyId, EntityType.Company,'/blocklist');
//      } else {
//        this.router.navigate(['/blocklist']);
//      }
//    } else if (!allow && new RegExp('^\/?related\/').test(state.url)) {
//      return true;
//    } else if (!allow) {
//      this.router.navigate(['/nopermission']);
//    }
//    this.pagelevelsvc.setPageLevel(state.url);
//    return allow;
//  }
//}
//# sourceMappingURL=auth-guard.service.js.map