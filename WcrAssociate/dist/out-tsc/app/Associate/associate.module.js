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
import { ClientDetailsService } from '../services/associate/client-details.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { PaymentService } from '../services/associate/payment.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CustomerSupportService } from '../services/associate/customer-support.service';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import { BillingHistoryComponent } from './components/billing-history/billing-history.component';
import { PurchaseZipCodeComponent } from './components/purchase-zip-code/purchase-zip-code.component';
import { PurchaseZipCodeService } from '../services/associate/purchase-zipcode.service';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { LightboxModule } from 'ngx-lightbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListPropertiesService } from '../services/associate/list-properties.service';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
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
                PaymentComponent,
                CustomerSupportComponent,
                ListPropertiesComponent,
                BillingHistoryComponent,
                PurchaseZipCodeComponent,
                PaymentModalComponent,
                ConfirmationModalComponent
            ],
            imports: [
                CommonModule,
                BrowserModule,
                BrowserAnimationsModule,
                ToastNotificationsModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                AssociateRoutingModule,
                NgbModule,
                NgSelectModule,
                NgOptionHighlightModule,
                CKEditorModule,
                LightboxModule
            ],
            entryComponents: [PaymentModalComponent, ConfirmationModalComponent],
            providers: [
                ApiService,
                JwtService,
                DashboardService,
                ProfileService,
                ClientDetailsService,
                PaymentService,
                CustomerSupportService,
                MessageService,
                PurchaseZipCodeService,
                ListPropertiesService
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