import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
var CustomersModule = /** @class */ (function () {
    function CustomersModule() {
    }
    CustomersModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                CustomerRoutingModule
            ],
            declarations: [CustomerComponent, CustomerListComponent, CustomerDetailComponent]
        })
    ], CustomersModule);
    return CustomersModule;
}());
export { CustomersModule };
//# sourceMappingURL=customer.module.js.map