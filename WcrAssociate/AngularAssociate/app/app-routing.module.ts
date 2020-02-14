import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '.././app/components/home/home.component';
//import { LoginComponent } from '.././app/components/login/login.component';
//import { RegisterComponent } from '.././app/components/register/register.component';


import { AuthGuard } from '../app/_guards/auth.guard';

import { AuthComponent } from '.././app/components/auth/auth.component';
import { TermsComponent } from '.././app/components/terms/terms.component';

import { NoAuthGuard, HomeAuthResolver } from './services/auth';
import { HeaderComponent } from './shared/layout';
import { SharedLayoutComponent } from './shared/shared-layout/shared-layout.component';
import { AssociateLayoutComponent } from './shared/associate-layout/associate-layout.component';


const routes: Routes = [
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
            { path: 'associate', loadChildren: 'app/associate/associate.module#AssociateModule' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
