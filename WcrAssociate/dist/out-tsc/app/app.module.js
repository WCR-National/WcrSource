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
import { FooterComponent, HeaderComponent, SharedModule } from '../app/shared';
import { ApiService, AuthGuard, JwtService, ProfilesService, UserService, HomeAuthResolver, NoAuthGuard, encrypt_decrypt } from './services/auth';
import { SearchService } from './services/search';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                HomeComponent,
                //LoginComponent,
                //RegisterComponent,
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
                AppRoutingModule,
                SharedModule
            ],
            providers: [
                HttpClientModule,
                { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
                ApiService,
                AuthGuard,
                JwtService,
                ProfilesService,
                UserService,
                SearchService,
                HomeAuthResolver,
                NoAuthGuard,
                User,
                encrypt_decrypt
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map