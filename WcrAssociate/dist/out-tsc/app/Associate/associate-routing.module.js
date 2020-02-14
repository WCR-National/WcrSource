import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../app/Associate/components/Dashboard/dashboard.component';
import { ProfileComponent } from '../../app/Associate/components/Profile/profile.component';
import { ClientDetailsComponent } from '../../app/Associate/components/client-details/client-details.component';
import { NoAuthGuard } from '../services/auth';
var associateRoutes = [
    { path: '', component: DashboardComponent, canActivate: [NoAuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [NoAuthGuard] },
    { path: 'client-details', component: ClientDetailsComponent, canActivate: [NoAuthGuard] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(associateRoutes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=associate-routing.module.js.map