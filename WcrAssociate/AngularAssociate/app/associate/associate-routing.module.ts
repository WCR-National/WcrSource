import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateLayoutComponent } from './associate-layout';
import { AuthGuard } from '../_guards/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { PurchaseZipCodeComponent } from './components/purchase-zip-code/purchase-zip-code.component';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import { BillingHistoryComponent } from './components/billing-history/billing-history.component';

const associateRoutes: Routes = [
    {
        path: 'associates',
        component: AssociateLayoutComponent,
        children: [
            {
                path: '', component: DashboardComponent, canActivate: [AuthGuard]
            },
            {
                path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
            },
            {
                path: 'client-details', component: ClientDetailsComponent, canActivate: [AuthGuard]
            },
            {
                path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]
            },
            {
                path: 'billing-history', component: BillingHistoryComponent, canActivate: [AuthGuard]
            },
            {
                path: 'list-properties', component: ListPropertiesComponent, canActivate: [AuthGuard]
            },
            {
                path: 'purchase-zip-code', component: PurchaseZipCodeComponent, canActivate: [AuthGuard]
            },
            {
                path: 'customer-support', component: CustomerSupportComponent, canActivate: [AuthGuard]
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(associateRoutes)],
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