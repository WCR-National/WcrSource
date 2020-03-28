import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '.././app/components/home/home.component';
//import { LoginComponent } from '.././app/components/login/login.component';
//import { RegisterComponent } from '.././app/components/register/register.component';



import { AuthComponent } from '.././app/components/auth/auth.component';
import { TermsComponent } from '.././app/components/terms/terms.component';

import { HeaderComponent } from './shared/layout';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
import { NoAuthGuard } from './_guards/no-auth-guard.service';
import { LandingRegistrationComponent } from './components/landing-registration/landing-registration.component';


const routes: Routes = [
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


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
