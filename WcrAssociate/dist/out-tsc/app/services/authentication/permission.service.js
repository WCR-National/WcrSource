//import { Injectable } from '@angular/core';
//import { Subject ,  Observable } from 'rxjs';
//import { Permission } from '../../entities/permissions/permission';
//@Injectable()
//export class PermissionService {
//    private perm: Permission;
//    private actionAnnouncedSource = new Subject<Permission>();
//    actionAnnounced = this.actionAnnouncedSource.asObservable();
//    constructor() {
//        this.perm = new Permission(false, false, false, false, false);
//    }
//    setPerm(v: boolean = false, e: boolean = false, c: boolean = false, d: boolean = false, va: boolean = false, p: string = '', t: string = '') {
//        this.perm = new Permission(v, e, c, d, va);
//        this.perm.pageId = p;
//        this.perm.title = t;
//        this.actionAnnouncedSource.next(this.perm);
//    }
//    canView(): boolean {
//        return this.perm.view;
//    }
//    canEdit(): boolean {
//        return this.perm.edit;
//    }
//    canChangeStatus(): boolean {
//        return this.perm.change;
//    }
//    canDelete(): boolean {
//        return this.perm.delete;
//    }
//    canViewAll(): boolean {
//        return this.perm.viewAll;
//    }
//    getId() {
//        return this.perm.pageId;
//    }
//    getTitle(){
//        return this.perm.title;
//    }
//}
//# sourceMappingURL=permission.service.js.map