import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var encrypt_decrypt = /** @class */ (function () {
    function encrypt_decrypt() {
        this.Base64 = "";
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    encrypt_decrypt = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], encrypt_decrypt);
    return encrypt_decrypt;
}());
export { encrypt_decrypt };
//# sourceMappingURL=encrypt_decrypt.js.map