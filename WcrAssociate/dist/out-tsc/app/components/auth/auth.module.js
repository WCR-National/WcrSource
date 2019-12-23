import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = tslib_1.__decorate([
        NgModule({
            imports: [
                SharedModule,
                AuthRoutingModule
            ],
            declarations: [
                AuthComponent
            ],
            providers: [
                NoAuthGuard
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
export { AuthModule };
//# sourceMappingURL=auth.module.js.map