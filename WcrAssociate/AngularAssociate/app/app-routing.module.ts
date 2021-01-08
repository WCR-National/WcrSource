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
import { AuthGuard } from './_guards/auth-guard.service';

import { LandingRegistrationComponent } from './components/landing-registration/landing-registration.component';
import { ConsumerDashabordComponent } from './components/consumer-dashboard/consumer-dashboard.component';
import { SupportComponent } from './components/support/support.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { SalesAdvertisementsComponent } from './components/sales-advertisements/sales-advertisements.component';
import { ServiceProfileComponent } from './components/service-profile/service-profile.component';
import { PropertySalesAdvertisementsComponent } from './components/property-sales-advertisement/property-sales-advertisement.component';


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
                path: '', component: ConsumerDashabordComponent, canActivate: [AuthGuard]
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
            {
                path: 'landing-registration-activate/:id/:email/:password',
                component: LandingRegistrationComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'consumer-dashboard',
                component: ConsumerDashabordComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'bookmark',
                component: BookmarkComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'support',
                component: SupportComponent,
                canActivate: [AuthGuard]
            },
            {
                //"/sales-advertisements?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                path: 'sales-advertisements', ///:category/:id/:zipcode/:name/:jtype/:catName
                component: SalesAdvertisementsComponent
            },
            {
                //"/sales-advertisements?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                path: 'service-profile', //:category/:id/:zipcode/:name/:jtype/:catName
                component: ServiceProfileComponent,
            },
            {
                //"/sales-advertisements?ca=0&id=" + ($(doc).find("id").text()) + "&zipcode=" + $(doc1).find("Zipcode").text() + "&name=" + ($(doc).find("name").text()) + "&jtype=Sales&catName=RealEstate";
                path: 'property-sale-advertisement', //:category/:id/:zipcode/:name/:jtype/:catName
                component: PropertySalesAdvertisementsComponent,
            }
            //{ path: '**', component: HomeComponent }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
