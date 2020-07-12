"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentFile = void 0;
const path = require("path");
const config_1 = require("../config");
const fileUtil_1 = require("../util/fileUtil");
const routerUtil_1 = require("../util/routerUtil");
const data_1 = require("../data");
class ContentFile {
    constructor(url = "", param = {}) {
        this._filePath = "";
        this.url = url.split("/").filter(s => s).join("/");
        this.param = param;
        this._filePath = this.getFilePath();
    }
    get exists() {
        return Boolean(this._filePath);
    }
    get filePath() {
        return this._filePath;
    }
    response(res) {
        if (this.exists) {
            if (data_1.data.isPage(this._filePath)) {
                res.send("find the page, need special handling");
            }
            else
                res.sendFile(this._filePath);
        }
        else
            routerUtil_1.routerUtil.resNotFound(res);
    }
    getFilePath() {
        let dir = path.dirname(this.url), fileName = path.basename(this.url), ext = path.extname(this.url);
        const p1 = path.resolve(config_1.config.contentRoot, dir, fileName);
        if (ext) {
            if (fileUtil_1.fileUtil.exists(p1))
                return p1;
        }
        else {
            const p2 = p1 + ".html", p3 = p1 + "/index.html";
            if (fileUtil_1.fileUtil.exists(p2))
                return p2;
            else if (fileUtil_1.fileUtil.exists(p3))
                return p3;
        }
        return "";
    }
}
exports.ContentFile = ContentFile;
//# sourceMappingURL=ContentFile.js.map