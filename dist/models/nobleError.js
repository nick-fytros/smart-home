"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NobleError = (function (_super) {
    __extends(NobleError, _super);
    function NobleError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'Noble Error';
        return _this;
    }
    return NobleError;
}(Error));
exports.default = NobleError;
