import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
var routes = [
    {
        path: '', component: CategoryComponent, pathMatch: 'prefix',
    }
    //{
    //    path: 'app', component: AppComponent
    //}, {
    //    path: 'category', component: CategoryComponent
    //},
    //{
    //    path: '', redirectTo: '/app', pathMatch: 'full'
    //}
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