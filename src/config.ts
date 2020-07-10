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
    public port: Number = 3000;

    constructor() {
        this.appRoot = path.resolve(__dirname, "..");
    }
    public load(): void {
        let configFilePath: string = path.resolve(this.appRoot, "config.yaml")
            , d: any = fileUtil.exists(configFilePath) ? yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8')) : {}
            , l = (p: string) => util.readFromObject(d, p);

        this.contentRoot = this.trimPath(l("global.contentRoot"), "content");
        this.staticRoot = this.trimPath(l("global.staticRoot"), "static");
        this.themeRoot = this.trimPath(l("theme.root"), "theme");
        this.port = l("global.port") || 3000;
    }

    private trimPath(p: string, defaultPath: string): string {
        p = (p || "").trim();
        if (!p) p = defaultPath;
        return path.resolve(this.appRoot, p);
    }
}

export const config: Config = new Config();