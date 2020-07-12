"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUtil = void 0;
const path = require("path");
const config_1 = require("../config");
const fileUtil_1 = require("./fileUtil");
class RouterUtil {
    resNotFound(res) {
        res.status(404);
        const filePath = path.resolve(config_1.config.contentRoot, "404.html");
        if (fileUtil_1.fileUtil.exists(filePath))
            res.sendFile(filePath);
        else
            res.send("404 not found");
    }
    resError(res) {
        res.status(503);
        const filePath = path.resolve(config_1.config.contentRoot, "error.html");
        if (fileUtil_1.fileUtil.exists(filePath))
            res.sendFile(filePath);
        else
            res.send("503 internal error");
    }
}
exports.routerUtil = new RouterUtil();
//# sourceMappingURL=routerUtil.js.map