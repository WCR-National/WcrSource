import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '.././app/components/home/home.component';
import { AuthComponent } from '.././app/components/auth/auth.component';
import { TermsComponent } from '.././app/components/terms/terms.component';
import { NoAuthGuard } from './services/auth';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
import { AssociateLayoutComponent } from './shared/associate-layout/associate-layout.component';
var routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },
    //// otherwise redirect to home
    //{ path: '**', redirectTo: '' }
    {
        path: '',
        component: SharedLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
                //,
                //resolve: {
                //    isAuthenticated: HomeAuthResolver
                //}
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
            }
        ]
    },
    {
        path: '',
        component: AssociateLayoutComponent,
        children: [
            { path: 'associate', loadChildren: './associate/associate.module#AssociateModule' }
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