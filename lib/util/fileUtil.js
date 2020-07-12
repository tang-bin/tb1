"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUtil = void 0;
const fs = require("fs");
class FileUtil {
    exists(path) {
        try {
            fs.accessSync(path, fs.constants.R_OK);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.fileUtil = new FileUtil();
//# sourceMappingURL=fileUtil.js.map