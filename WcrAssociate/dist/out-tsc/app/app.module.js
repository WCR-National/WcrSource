import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
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
import { FooterComponent, HeaderComponent, SharedModule } from '../app/shared';
import { ApiService, JwtService, ProfilesService, UserService, encrypt_decrypt } from './services/auth';
import { SearchService, MessageService } from './services/search';
//import { AssociateLayoutComponent } from './shared/associate-layout';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
//import { SidebarComponent } from './shared/associate-sidebar';
//import { AssociateHeaderComponent } from './shared/associate-header';
import { AssociateModule } from './associate/associate.module';
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
                ShowAuthedDirective
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatMenuModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatIconModule,
                MatRadioModule,
                MatCardModule,
                MatSidenavModule,
                MatFormFieldModule,
                MatInputModule,
                MatTooltipModule,
                MatToolbarModule,
                MatSelectModule,
                SharedModule,
                AssociateModule,
                AppRoutingModule
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
                User,
                encrypt_decrypt,
                MessageService,
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map