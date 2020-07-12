"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express = require("express");
const formatUtil_1 = require("../util/formatUtil");
const sysLog_1 = require("../util/sysLog");
class Router {
    constructor() {
        this.type = "";
        this.router = express.Router();
        this.router.use((req, res, next) => {
            sysLog_1.sysLog.log(this.type, ' : ', formatUtil_1.formatUtil.time(Date.now()));
            next();
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map