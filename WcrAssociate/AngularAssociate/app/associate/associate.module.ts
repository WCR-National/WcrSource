import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from '../../app/Associate/components/Dashboard/dashboard.component';
import { ProfileComponent } from '../../app/Associate/components/Profile/profile.component';
import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';
import { HttpTokenInterceptor } from '../interceptors';
import { ApiService, AuthGuard, NoAuthGuard } from '../services/auth';
import { MessageService } from '../services/search';
import { AssociateRoutingModule } from './associate-routing.module';

//import { CustomValidator } from './validators';

//import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
//import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
//import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        ClientDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AssociateRoutingModule
    ],
    providers: [
        HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        AuthGuard,
        NoAuthGuard,
        MessageService
    ]
})
export class AssociateModule { }


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