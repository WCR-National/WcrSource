//import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
//import { UserService } from '../users/user.service';
//import { BreadcrumbService } from '../generic/breadcrumb.service';
//@Injectable()
//export class PageService {
//  constructor(
//    private usersvc: UserService,
//    private router: Router,
//    private breadcrumbsvc: BreadcrumbService) {
//  }
//  goToLink(endPoint: string, params: any): void {
//    //let regx = new RegExp(/\{(.*?)\}/g);
//    for (let p in params) {
//      endPoint.replace("{" + p + "}", params[p]);
//    }
//    if ('mainId' in params) {
//      endPoint = endPoint + params['mainId'];
//    }
//    this.router.navigate([endPoint]);
//  }
//  canGoToPage(code: string): boolean {
//    return true;
//  }
//}
//# sourceMappingURL=page.service.js.map