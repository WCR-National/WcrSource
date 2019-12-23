import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
//import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
//import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterModule
            ],
            declarations: [
                //ArticleListComponent,
                //ArticleMetaComponent,
                //ArticlePreviewComponent,
                //FavoriteButtonComponent,
                //FollowButtonComponent,
                ListErrorsComponent,
                ShowAuthedDirective
            ],
            exports: [
                //ArticleListComponent,
                //ArticleMetaComponent,
                //ArticlePreviewComponent,
                CommonModule,
                //FavoriteButtonComponent,
                //FollowButtonComponent,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                ListErrorsComponent,
                RouterModule,
                ShowAuthedDirective
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map