import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messageHidden = { "value": "", "type": "" };
        this._listners = new Subject();
    }
    MessageService.prototype.listen = function () {
        return this._listners.asObservable();
    };
    MessageService.prototype.filter = function (filterBy) {
        this._listners.next(filterBy);
    };
    MessageService = tslib_1.__decorate([
        Injectable()
    ], MessageService);
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=message.service.js.map