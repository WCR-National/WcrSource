import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var BookmarkComponent = /** @class */ (function () {
    function BookmarkComponent(route) {
        this.route = route;
    }
    BookmarkComponent.prototype.ngOnInit = function () {
    };
    BookmarkComponent = tslib_1.__decorate([
        Component({
            selector: 'consumer-bookmark',
            templateUrl: './bookmark.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], BookmarkComponent);
    return BookmarkComponent;
}());
export { BookmarkComponent };
//# sourceMappingURL=bookmark.component.js.map