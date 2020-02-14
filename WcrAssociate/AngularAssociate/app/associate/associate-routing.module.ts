import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from '../../app/Associate/components/Dashboard/dashboard.component';
import { ProfileComponent } from '../../app/Associate/components/Profile/profile.component';
import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';
//import { LoginComponent } from '.././app/components/login/login.component';
//import { RegisterComponent } from '.././app/components/register/register.component';


import { AuthGuard } from '../../app/_guards/auth.guard';
import { NoAuthGuard, HomeAuthResolver } from '../services/auth';
import { AssociateModule } from './associate.module';
import { CommonModule } from '@angular/common';

const associateRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [NoAuthGuard]},
    { path: 'client-details', component: ClientDetailsComponent, canActivate: [NoAuthGuard] },
];

@NgModule({
    imports: [   RouterModule.forChild(associateRoutes) ],
    exports: [RouterModule]
})
export class AssociateRoutingModule { }


//const routes: Routes = [
//    {
//        path: '',
//        component: CustomerComponent,
//        children: [
//            { path: ':id/detail', component: CustomerDetailComponent },
//            { path: '', component: CustomerListComponent }
//        ]
//    }
//];

//@NgModule({
//    imports: [RouterModule.forChild(routes)],
//    exports: [RouterModule]
//})
//export class CustomerRoutingModule { }