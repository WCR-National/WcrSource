import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '.././app/components/home/home.component';
//import { LoginComponent } from '.././app/components/login/login.component';
//import { RegisterComponent } from '.././app/components/register/register.component';
import { AuthComponent } from '.././app/components/auth/auth.component';
import { TermsComponent } from '.././app/components/terms/terms.component';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
import { NoAuthGuard } from './_guards/no-auth-guard.service';
import { LandingRegistrationComponent } from './components/landing-registration/landing-registration.component';
var routes = [
    {
        path: '',
        component: SharedLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'login',
                component: AuthComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'register',
                component: AuthComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'activate/:id/:email/:password',
                component: AuthComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'resetPassword',
                component: AuthComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'terms',
                component: TermsComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'landing-registration',
                component: LandingRegistrationComponent,
                canActivate: [NoAuthGuard]
            },
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map