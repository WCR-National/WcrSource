import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { DashboardComponent } from '../../app/Associate/components/dashboard/dashboard.component';
//import { ProfileComponent } from '../../app/Associate/components/profile/profile.component';
//import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';
import { ApiService, JwtService } from '../services/auth';
import { MessageService } from '../services/search';
import { AssociateRoutingModule } from './associate-routing.module';
import { AssociateLayoutComponent } from './associate-layout';
import { SidebarComponent } from './associate-sidebar';
import { AssociateHeaderComponent } from './associate-header';
import { DashboardService } from '../services/associate/dashboard.service';
import { ProfileService } from '../services/associate/Profile.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';
import { ClientDetailsService } from '../services/associate/client-details.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentService } from '../services/associate/payment.service';
import { Select2Module } from 'ng2-select2';
var AssociateModule = /** @class */ (function () {
    function AssociateModule() {
    }
    AssociateModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AssociateLayoutComponent,
                SidebarComponent,
                AssociateHeaderComponent,
                DashboardComponent,
                ProfileComponent,
                ClientDetailsComponent,
                PaymentComponent
            ],
            imports: [
                CommonModule,
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                AssociateRoutingModule,
                NgbModule,
                Select2Module,
                MatSelectModule
            ],
            providers: [
                ApiService,
                JwtService,
                DashboardService,
                ProfileService,
                ClientDetailsService,
                PaymentService,
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