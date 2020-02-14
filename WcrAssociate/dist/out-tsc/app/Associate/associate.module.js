import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../app/Associate/components/Dashboard/dashboard.component';
import { ProfileComponent } from '../../app/Associate/components/Profile/profile.component';
import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';
import { HttpTokenInterceptor } from '../interceptors';
import { AuthGuard, NoAuthGuard } from '../services/auth';
import { MessageService } from '../services/search';
//import { CustomValidator } from './validators';
//import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
//import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
//import { ShowAuthedDirective } from './show-authed.directive';
var AssociateModule = /** @class */ (function () {
    function AssociateModule() {
    }
    AssociateModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                DashboardComponent,
                ProfileComponent,
                ClientDetailsComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterModule
            ],
            exports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterModule
            ],
            providers: [
                HttpClientModule,
                { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
                AuthGuard,
                NoAuthGuard,
                MessageService
            ]
        })
    ], AssociateModule);
    return AssociateModule;
}());
export { AssociateModule };
//# sourceMappingURL=associate.module.js.map