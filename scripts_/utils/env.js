"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalOptions = void 0;
/** 用户拓展配置列表 */
var GlobalEnv = /** @class */ (function () {
    function GlobalEnv() {
    }
    GlobalEnv.prototype.init = function (o) {
        this.env = o.env;
        this.apps = o.apps;
        this.uniqueName = o.uniqueName;
    };
    return GlobalEnv;
}());
exports.globalOptions = new GlobalEnv();
