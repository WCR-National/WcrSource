import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TermsComponent } from '.././app/components/terms/terms.component';
//import { LoginComponent } from './components/login/login.component';  
//import { PasswordValidator, ParentErrorStateMatcher } from '../app/_helpers/validators';
import { AuthComponent } from './components/auth/auth.component';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { User } from '../app/entities/user';
import { ShowAuthedDirective } from './shared/show-authed.directive';
import { AuthGuard } from './_guards/auth-guard.service';
import { NoAuthGuard } from './_guards/no-auth-guard.service';
import { LandingRegistrationComponent } from './components/landing-registration/landing-registration.component';
import { FooterComponent, HeaderComponent, SharedModule } from '../app/shared';
import { ApiService, JwtService, ProfilesService, UserService, encrypt_decrypt } from './services/auth';
import { SearchService, MessageService } from './services/search';
//import { AssociateLayoutComponent } from './shared/associate-layout';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
//import { SidebarComponent } from './shared/associate-sidebar';
//import { AssociateHeaderComponent } from './shared/associate-header';
import { AssociateModule } from './associate/associate.module';
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
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { PropertySalesAdvertisementsComponent } from './components/property-sales-advertisement/property-sales-advertisement.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                HomeComponent,
                SharedLayoutComponent,
                FooterComponent,
                HeaderComponent,
                AuthComponent,
                TermsComponent,
                ShowAuthedDirective,
                LandingRegistrationComponent,
                SupportComponent,
                BookmarkComponent,
                ProfileComponent,
                ConsumerDashabordComponent,
                SalesAdvertisementsComponent,
                ServiceProfileComponent,
                AuthModalComponent,
                PropertySalesAdvertisementsComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                AssociateModule,
                SharedModule,
                AppRoutingModule,
                NgbModule,
                NgSelectModule,
            ],
            entryComponents: [
                AuthModalComponent
            ],
            providers: [
                AuthGuard,
                HttpClientModule,
                { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
                ApiService,
                NoAuthGuard,
                JwtService,
                ProfilesService,
                UserService,
                SearchService,
                SalesAdvertisementsService,
                User,
                encrypt_decrypt,
                MessageService,
                XMLToJSON
            ],
            bootstrap: [AppComponent]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map