import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
var routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [
            { path: ':id/detail', component: CustomerDetailComponent },
            { path: '', component: CustomerListComponent }
        ]
    }
];
var CustomerRoutingModule = /** @class */ (function () {
    function CustomerRoutingModule() {
    }
    CustomerRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], CustomerRoutingModule);
    return CustomerRoutingModule;
}());
export { CustomerRoutingModule };
//# sourceMappingURL=customer-routing.module.js.map