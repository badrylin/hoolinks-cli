"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: linzeqin
 * @Date: 2022-01-17 15:05:43
 * @description: 主要解决antd按需加载和样式问题
 */
const es_module_lexer_1 = require("es-module-lexer");
function camel2Dash(_str) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, function camel2DashReplace($1) {
        return '-' + $1.toLowerCase();
    });
}
function importLoader(source, map) {
    return __awaiter(this, void 0, void 0, function* () {
        const callback = this.async();
        yield es_module_lexer_1.init;
        let code = source;
        const [imports] = es_module_lexer_1.parse(source);
        imports.forEach((importSpecifier) => {
            var _a;
            if (importSpecifier.n === 'antd') {
                const entry = source.substring(importSpecifier.ss, importSpecifier.se);
                const newImport = (_a = /(?<={).*(?=})/.exec(entry.replace(/(\r\n)|(\n)|(\s)/g, ''))[0]) === null || _a === void 0 ? void 0 : _a.split(',').map((name) => {
                    return name && `import ${name} from "antd/lib/${camel2Dash(name)}";import "antd/lib/${camel2Dash(name)}/style";`;
                });
                code = source.replace(entry, newImport.join(''));
            }
        });
        callback(null, code, map, source);
    });
}
exports.default = importLoader;
//# sourceMappingURL=importLoader.js.map