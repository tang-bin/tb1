"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUtil = void 0;
const fs = require("fs");
class FileUtil {
    exists(path) {
        return this.isFile(path) || this.isFolder(path);
    }
    isFile(path) {
        try {
            const isFile = fs.lstatSync(path).isFile();
            return isFile;
        }
        catch (err) {
            return false;
        }
    }
    isFolder(path) {
        try {
            const isFile = fs.lstatSync(path).isDirectory();
            return isFile;
        }
        catch (err) {
            return false;
        }
    }
}
exports.fileUtil = new FileUtil();
//# sourceMappingURL=fileUtil.js.map