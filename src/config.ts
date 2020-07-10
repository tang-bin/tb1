import path = require("path");
import yaml = require("js-yaml");
import fs = require("fs");
import { util } from "./util/util";
import { fileUtil } from "./util/fileUtil";

class Config {

    public appRoot: string = "";
    public contentRoot: string = "";
    public staticRoot: string = ""
    public themeRoot: string = "";
    public themeName: string = "";
    public httpPort: Number = 80;
    public httpsPort: Number = 443;
    public keyPath: string = "";
    public crtPath: string = "";

    constructor() {
        this.appRoot = path.resolve(__dirname, "..");
        this.keyPath = path.resolve(this.appRoot, "sslcert/server.key");
        this.crtPath = path.resolve(this.appRoot, "sslcert/server.cert");
    }
    public load(): void {
        let configFilePath: string = path.resolve(this.appRoot, "config.yaml")
            , d: any = fileUtil.exists(configFilePath) ? yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8')) : {}
            , l = (p: string) => util.readFromObject(d, p);

        this.contentRoot = this.trimPath(l("global.contentRoot"), "content");
        this.staticRoot = this.trimPath(l("global.staticRoot"), "static");
        this.themeRoot = this.trimPath(l("theme.root"), "theme");
        this.httpPort = l("global.port") || 80;
        this.httpsPort = l("global.sslPort") || 443;
    }

    private trimPath(p: string, defaultPath: string): string {
        p = (p || "").trim();
        if (!p) p = defaultPath;
        return path.resolve(this.appRoot, p);
    }
}

export const config: Config = new Config();