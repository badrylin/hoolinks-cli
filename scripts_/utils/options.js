"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalOptions = void 0;
/** 用户拓展配置列表 */
var GlobalOption = /** @class */ (function () {
    function GlobalOption() {
    }
    GlobalOption.prototype.init = function (o) {
        this.env = o.env;
        this.apps = o.apps;
        this.uniqueName = o.uniqueName;
    };
    return GlobalOption;
}());
exports.globalOptions = new GlobalOption();
