import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../../app/Associate/components/Dashboard/dashboard.component';
import { ProfileComponent } from '../../app/Associate/components/Profile/profile.component';
import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';
import { ApiService, JwtService } from '../services/auth';
import { MessageService } from '../services/search';
import { AssociateRoutingModule } from './associate-routing.module';
import { AssociateLayoutComponent } from './associate-layout';
import { SidebarComponent } from './associate-sidebar';
import { AssociateHeaderComponent } from './associate-header';
import { DashboardService } from '../services/associate/dashboard.service';
//import { CustomValidator } from './validators';
//import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
//import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
//import { ShowAuthedDirective } from './show-authed.directive';
var AssociateModule = /** @class */ (function () {
    function AssociateModule() {
    }
    AssociateModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                HttpClientModule,
                AssociateRoutingModule
            ],
            declarations: [
                AssociateLayoutComponent,
                SidebarComponent,
                AssociateHeaderComponent,
                DashboardComponent,
                ProfileComponent,
                ClientDetailsComponent,
            ],
            providers: [
                ApiService,
                JwtService,
                DashboardService,
                MessageService
            ]
        })
    ], AssociateModule);
    return AssociateModule;
}());
export { AssociateModule };
//@NgModule({
//    imports: [
//        CommonModule,
//        AssociateRoutingModule
//    ],
//    declarations: [],
//    providers: [
//        HttpClientModule,
//        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
//        AuthGuard,
//        NoAuthGuard,
//        MessageService
//    ]
//})
//export class CustomersModule { }
//# sourceMappingURL=associate.module.js.map