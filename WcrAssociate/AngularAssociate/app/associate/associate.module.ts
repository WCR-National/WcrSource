import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { DashboardComponent } from '../../app/Associate/components/dashboard/dashboard.component';
//import { ProfileComponent } from '../../app/Associate/components/profile/profile.component';
//import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';

import { ApiService, JwtService } from '../services/auth';
import { MessageService } from '../services/search';
import { AssociateRoutingModule } from './associate-routing.module';
import { AssociateLayoutComponent } from './associate-layout';
import { SidebarComponent } from './associate-sidebar';
import { AssociateHeaderComponent } from './associate-header';
import { DashboardService } from './associate-service/dashboard.service';
import { ProfileService } from './associate-service/Profile.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { ClientDetailsService } from './associate-service/client-details.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';


import { PaymentService } from './associate-service/payment.service';
import { Select2Module } from 'ng2-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CustomerSupportService } from './associate-service/customer-support.service';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import { BillingHistoryComponent } from './components/billing-history/billing-history.component';
import { PurchaseZipCodeComponent } from './components/purchase-zip-code/purchase-zip-code.component';
import { PurchaseZipCodeService } from './associate-service/purchase-zipcode.service';
import { ToastNotificationsModule } from 'ngx-toast-notifications';

import { LightboxModule } from 'ngx-lightbox';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListPropertiesService } from './associate-service/list-properties.service';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { AuthGuard } from '../_guards/auth-guard.service';
import { HttpTokenInterceptor } from '../interceptors';

@NgModule({
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
        AssociateRoutingModule,
        ToastNotificationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgSelectModule,
        NgOptionHighlightModule,
        CKEditorModule,
        LightboxModule
        
    ],
    entryComponents: [PaymentModalComponent, ConfirmationModalComponent],
    providers: [
        { provide: AuthGuard, useClass: AuthGuard },
        HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ApiService,
        JwtService,
        DashboardService,
        ProfileService,
        ClientDetailsService,
        PaymentService,
        CustomerSupportService,
        MessageService,
        PurchaseZipCodeService,
        ListPropertiesService,

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