import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TermsComponent } from '.././app/components/terms/terms.component';
import { AuthComponent } from './components/auth/auth.component';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { User } from '../app/entities/user';
import { ShowAuthedDirective } from './shared/show-authed.directive';

import { AuthGuard } from './_guards/auth-guard.service';
import { NoAuthGuard } from './_guards/no-auth-guard.service';
import { LandingRegistrationComponent } from './components/landing-registration/landing-registration.component';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { PaymentService } from './associate/associate-service/payment.service';


import { FooterComponent,  HeaderComponent } from './layout';

import {
    ApiService,
    JwtService,
    ProfilesService,
    UserService,
    encrypt_decrypt

} from './services/auth';
import { SearchService, MessageService } from './services/search';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
import { XMLToJSON } from './_helpers/xml-to-json';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportComponent } from './components/support/support.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConsumerDashabordComponent } from './components/consumer-dashboard/consumer-dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SalesAdvertisementsComponent } from './components/sales-advertisements/sales-advertisements.component';
import { SalesAdvertisementsService } from './services/sales-advertisements/sales-advertisements.service';
import { ServiceProfileComponent } from './components/service-profile/service-profile.component';
import { PropertySalesAdvertisementsComponent } from './components/property-sales-advertisement/property-sales-advertisement.component';
import { AgmCoreModule } from '@agm/core';
import { ShowAuthedAssociateDirective } from './associate/show-authed-associate.directive';
import { DashboardService } from './associate/associate-service/dashboard.service';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
        AuthComponent,
        TermsComponent,
        LandingRegistrationComponent,
        SupportComponent,
        BookmarkComponent,
        ProfileComponent,
        ConsumerDashabordComponent,
        SalesAdvertisementsComponent,
        ServiceProfileComponent,
        AuthModalComponent,
        TermsModalComponent,
        PropertySalesAdvertisementsComponent,
        ShowAuthedDirective,
        ShowAuthedAssociateDirective,
        SharedLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule,
        NgSelectModule,
        ToastNotificationsModule,
        //AgmCoreModule.forRoot({
        //    // please get your own API key here:
        //    // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
        //    apiKey: 'AIzaSyD8qzg6u0Yh20dcMnAyZ4A8dExFXfzQb_c'
        //})
    ],
    entryComponents: [
        AuthModalComponent,
        TermsModalComponent
    ],
    providers: [
        HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ApiService,
        JwtService,
        UserService,
        AuthGuard,
        NoAuthGuard ,
        DashboardService,
        ProfilesService,       
        SearchService,
        SalesAdvertisementsService,
        User,
        encrypt_decrypt,
        MessageService,
        XMLToJSON,
        PaymentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
