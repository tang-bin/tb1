"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const util_1 = require("./util/util");
const fileUtil_1 = require("./util/fileUtil");
const Argv_1 = require("./util/Argv");
class Config {
    constructor() {
        this.appRoot = "";
        this.contentRoot = "";
        this.staticRoot = "";
        this.enableHttps = false;
        this.httpPort = 3000;
        this.httpsPort = 8080;
        this.keyPath = "";
        this.crtPath = "";
        this.cwd = "";
        this.appRoot = path.resolve(__dirname, "..");
        this.cwd = process.cwd();
        this.argv = new Argv_1.Argv(process.argv);
    }
    load() {
        let configFilePath = path.resolve(this.appRoot, "config.yaml"), c = fileUtil_1.fileUtil.exists(configFilePath) ? yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8')) : {}, d = (p) => util_1.util.readFromObject(c, p);
        this.contentRoot = this.trimPath(d("server.content"), "content");
        this.staticRoot = this.trimPath(d("server.static"), "static");
        this.httpPort = this.trimNum(d("server.port"), 3000);
        this.httpsPort = this.trimNum(d("server.httpsPort"), 8080);
        this.keyPath = this.trimPath(d("server.sslKey"), "");
        this.crtPath = this.trimPath(d("server.sslCert"), "");
        this.enableHttps = d("server.https") || false;
    }
    trimPath(p, defaultPath) {
        p = (p || "").trim();
        if (!p)
            p = defaultPath;
        return path.resolve(this.appRoot, p);
    }
    trimNum(n, defaultNum) {
        if (n || n === 0)
            return n;
        else
            return defaultNum;
    }
}
exports.config = new Config();
//# sourceMappingURL=config.js.map